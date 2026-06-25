from __future__ import annotations

import os
from collections import OrderedDict
from pathlib import Path
from typing import Any

import torch
from datasets import Dataset, DatasetDict, load_dataset
from peft import LoraConfig, PeftModel, TaskType
from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed
from trl.experimental.orpo import ORPOConfig, ORPOTrainer


# ======================================================================================
# CONFIG
# ======================================================================================

MODEL_ID = "Qwen/Qwen3.5-0.8B"
DATASET_ID = "celsowm/valdoria-orpo-qwen35-dataset"

SEED = 42


def get_base_dir() -> Path:
    try:
        return Path(__file__).resolve().parent
    except NameError:
        return Path.cwd().resolve()


BASE_DIR = get_base_dir()
OUTPUT_ROOT = Path(os.environ.get("ORPO_OUTPUT_ROOT", BASE_DIR / "runs")).resolve()

RUN_DIR = OUTPUT_ROOT / "orpo-valdoria-qwen35-08b-lora-run"
ADAPTER_DIR = OUTPUT_ROOT / "orpo-valdoria-qwen35-08b-lora-adapter"
MERGED_DIR = OUTPUT_ROOT / "orpo-valdoria-qwen35-08b-lora-merged"

MERGE_AT_END = True


# ======================================================================================
# DATASET
# ======================================================================================

def is_valid_message_list(value: Any) -> bool:
    if not isinstance(value, list) or not value:
        return False

    for msg in value:
        if not isinstance(msg, dict):
            return False

        role = msg.get("role")
        content = msg.get("content")

        if role not in {"system", "user", "assistant"}:
            return False

        if not isinstance(content, str) or not content.strip():
            return False

    return True


def is_valid_orpo_example(example: dict[str, Any]) -> bool:
    prompt = example.get("prompt")
    chosen = example.get("chosen")
    rejected = example.get("rejected")

    if not is_valid_message_list(prompt):
        return False

    if not is_valid_message_list(chosen):
        return False

    if not is_valid_message_list(rejected):
        return False

    if chosen[-1].get("role") != "assistant":
        return False

    if rejected[-1].get("role") != "assistant":
        return False

    chosen_text = chosen[-1].get("content", "").strip()
    rejected_text = rejected[-1].get("content", "").strip()

    if not chosen_text:
        return False

    if not rejected_text:
        return False

    if chosen_text == rejected_text:
        return False

    metadata = example.get("metadata") or {}
    status = metadata.get("status")

    if status is not None and status != "kept":
        return False

    return True


def drop_extra_columns(dataset: Dataset) -> Dataset:
    keep = {"prompt", "chosen", "rejected"}
    remove = [col for col in dataset.column_names if col not in keep]

    if remove:
        print("Removing extra columns:", remove)
        dataset = dataset.remove_columns(remove)

    return dataset


def load_orpo_dataset() -> tuple[Dataset, Dataset]:
    print("=" * 100)
    print("Loading ORPO dataset:", DATASET_ID)

    dataset = load_dataset(
        DATASET_ID,
        download_mode="force_redownload",
    )

    print("Dataset loaded:")
    print(dataset)

    if not isinstance(dataset, DatasetDict):
        raise TypeError(f"Expected DatasetDict, got: {type(dataset)}")

    if "train" not in dataset:
        raise ValueError(f"Dataset must have a train split. Found: {list(dataset.keys())}")

    train_dataset = dataset["train"]

    if "validation" in dataset:
        eval_dataset = dataset["validation"]
    elif "eval" in dataset:
        eval_dataset = dataset["eval"]
    elif "test" in dataset:
        eval_dataset = dataset["test"]
    else:
        split = train_dataset.shuffle(seed=SEED).train_test_split(
            test_size=0.1,
            seed=SEED,
        )
        train_dataset = split["train"]
        eval_dataset = split["test"]

    print("Train columns before:", train_dataset.column_names)
    print("Eval columns  before:", eval_dataset.column_names)

    required = {"prompt", "chosen", "rejected"}
    missing = required - set(train_dataset.column_names)

    if missing:
        raise ValueError(
            f"Invalid ORPO dataset. Missing columns: {sorted(missing)}. "
            f"Found columns: {train_dataset.column_names}"
        )

    before_train = len(train_dataset)
    before_eval = len(eval_dataset)

    train_dataset = train_dataset.filter(is_valid_orpo_example)
    eval_dataset = eval_dataset.filter(is_valid_orpo_example)

    print("Train before/after filter:", before_train, len(train_dataset))
    print("Eval  before/after filter:", before_eval, len(eval_dataset))

    if len(train_dataset) == 0:
        raise ValueError("Train split is empty after filtering.")

    if len(eval_dataset) == 0:
        raise ValueError("Eval split is empty after filtering.")

    train_dataset = drop_extra_columns(train_dataset)
    eval_dataset = drop_extra_columns(eval_dataset)

    print("Train columns after:", train_dataset.column_names)
    print("Eval columns  after:", eval_dataset.column_names)

    print("First valid example:")
    print(train_dataset[0])

    return train_dataset, eval_dataset


# ======================================================================================
# MODEL / TOKENIZER
# ======================================================================================

def pick_dtype() -> torch.dtype:
    if not torch.cuda.is_available():
        return torch.float32

    if torch.cuda.is_bf16_supported():
        return torch.bfloat16

    return torch.float16


def load_tokenizer() -> AutoTokenizer:
    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_ID,
        trust_remote_code=True,
    )

    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    tokenizer.padding_side = "left"

    return tokenizer


def load_base_model(dtype: torch.dtype) -> AutoModelForCausalLM:
    kwargs = {
        "trust_remote_code": True,
        "low_cpu_mem_usage": True,
    }

    try:
        model = AutoModelForCausalLM.from_pretrained(
            MODEL_ID,
            dtype=dtype,
            **kwargs,
        )
    except TypeError:
        model = AutoModelForCausalLM.from_pretrained(
            MODEL_ID,
            torch_dtype=dtype,
            **kwargs,
        )

    return model


def align_model_tokens(model: AutoModelForCausalLM, tokenizer: AutoTokenizer) -> None:
    model.config.pad_token_id = tokenizer.pad_token_id
    model.config.eos_token_id = tokenizer.eos_token_id

    if tokenizer.bos_token_id is not None:
        model.config.bos_token_id = tokenizer.bos_token_id

    if hasattr(model, "generation_config"):
        model.generation_config.pad_token_id = tokenizer.pad_token_id
        model.generation_config.eos_token_id = tokenizer.eos_token_id

        if tokenizer.bos_token_id is not None:
            model.generation_config.bos_token_id = tokenizer.bos_token_id


def enable_gradient_checkpointing(model: AutoModelForCausalLM) -> None:
    model.config.use_cache = False

    if hasattr(model, "enable_input_require_grads"):
        model.enable_input_require_grads()

    try:
        model.gradient_checkpointing_enable(
            gradient_checkpointing_kwargs={"use_reentrant": False}
        )
    except TypeError:
        model.gradient_checkpointing_enable()


# ======================================================================================
# LORA
# ======================================================================================

def detect_lora_target_modules(model: torch.nn.Module) -> list[str]:
    found: OrderedDict[str, None] = OrderedDict()

    blocked_leaf_names = {
        "lm_head",
    }

    blocked_path_parts = {
        "embed_tokens",
    }

    for name, module in model.named_modules():
        if not isinstance(module, torch.nn.Linear):
            continue

        leaf = name.rsplit(".", 1)[-1]

        if leaf in blocked_leaf_names:
            continue

        if any(part in name for part in blocked_path_parts):
            continue

        found[leaf] = None

    preferred_order = [
        "q_proj",
        "k_proj",
        "v_proj",
        "o_proj",

        "in_proj_qkv",
        "in_proj_z",
        "in_proj_b",
        "in_proj_a",
        "out_proj",

        "gate_proj",
        "up_proj",
        "down_proj",
    ]

    targets: list[str] = []

    for name in preferred_order:
        if name in found:
            targets.append(name)

    for name in found.keys():
        if name not in targets:
            targets.append(name)

    if not targets:
        raise RuntimeError("Could not detect Linear modules for LoRA.")

    print("=" * 100)
    print("Detected LoRA target modules:")

    for target in targets:
        print(" -", target)

    return targets


def build_lora_config(model: torch.nn.Module) -> LoraConfig:
    return LoraConfig(
        r=32,
        lora_alpha=64,
        lora_dropout=0.05,
        bias="none",
        task_type=TaskType.CAUSAL_LM,
        target_modules=detect_lora_target_modules(model),
    )


def print_trainable_parameters(model: torch.nn.Module) -> None:
    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total = sum(p.numel() for p in model.parameters())

    print("=" * 100)
    print("Trainable parameters:", f"{trainable:,}", f"({100 * trainable / total:.4f}%)")
    print("Total parameters:", f"{total:,}")


# ======================================================================================
# MERGE
# ======================================================================================

def merge_and_unload_safely(model: PeftModel) -> torch.nn.Module:
    try:
        return model.merge_and_unload(
            safe_merge=True,
            progressbar=True,
        )
    except TypeError:
        try:
            return model.merge_and_unload(
                safe_merge=True,
            )
        except TypeError:
            return model.merge_and_unload()


def merge_adapter(tokenizer: AutoTokenizer, dtype: torch.dtype) -> None:
    print("=" * 100)
    print("Merging LoRA adapter into base model")
    print("Base:", MODEL_ID)
    print("Adapter:", ADAPTER_DIR)
    print("Merged:", MERGED_DIR)

    base_model = load_base_model(dtype)
    align_model_tokens(base_model, tokenizer)
    base_model.config.use_cache = True

    model = PeftModel.from_pretrained(
        base_model,
        str(ADAPTER_DIR),
        is_trainable=False,
    )

    merged_model = merge_and_unload_safely(model)

    MERGED_DIR.mkdir(parents=True, exist_ok=True)

    merged_model.save_pretrained(
        str(MERGED_DIR),
        safe_serialization=True,
    )

    tokenizer.save_pretrained(str(MERGED_DIR))

    print("Merged model saved to:", MERGED_DIR)


# ======================================================================================
# TRAIN
# ======================================================================================

def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    set_seed(SEED)

    if torch.cuda.is_available():
        torch.backends.cuda.matmul.allow_tf32 = True

    train_dataset, eval_dataset = load_orpo_dataset()

    dtype = pick_dtype()

    print("=" * 100)
    print("BASE_DIR:", BASE_DIR)
    print("OUTPUT_ROOT:", OUTPUT_ROOT)
    print("Loading tokenizer:", MODEL_ID)

    tokenizer = load_tokenizer()

    print("Loading base model:", MODEL_ID)
    print("dtype:", dtype)

    model = load_base_model(dtype)
    align_model_tokens(model, tokenizer)
    enable_gradient_checkpointing(model)

    peft_config = build_lora_config(model)

    args = ORPOConfig(
        output_dir=str(RUN_DIR),

        learning_rate=2e-5,
        num_train_epochs=3,
        max_steps=-1,

        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
        gradient_accumulation_steps=4,
        auto_find_batch_size=True,

        beta=0.1,

        max_length=1024,

        warmup_ratio=0.03,
        weight_decay=0.0,
        lr_scheduler_type="cosine",
        optim="adamw_bnb_8bit",

        bf16=torch.cuda.is_available() and torch.cuda.is_bf16_supported(),
        fp16=torch.cuda.is_available() and not torch.cuda.is_bf16_supported(),
        tf32=torch.cuda.is_available(),

        gradient_checkpointing=True,
        gradient_checkpointing_kwargs={"use_reentrant": False},

        do_train=True,
        do_eval=True,

        eval_strategy="steps",
        eval_steps=25,
        logging_steps=25,

        save_strategy="steps",
        save_steps=25,
        save_total_limit=2,

        load_best_model_at_end=True,
        metric_for_best_model="eval_loss",
        greater_is_better=False,

        report_to="none",

        remove_unused_columns=False,

        seed=SEED,
        data_seed=SEED,
    )

    trainer = ORPOTrainer(
        model=model,
        args=args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        processing_class=tokenizer,
        peft_config=peft_config,
    )

    print_trainable_parameters(trainer.model)

    print("=" * 100)
    print("Train/validation:", len(train_dataset), len(eval_dataset))
    print("Run dir:", RUN_DIR)
    print("Final adapter:", ADAPTER_DIR)
    print("Final merged:", MERGED_DIR)
    print("=" * 100)

    result = trainer.train()

    print("=" * 100)
    print("Final metrics:")
    print(result.metrics)

    print("=" * 100)
    print("Saving LoRA adapter to:", ADAPTER_DIR)

    trainer.save_model(str(ADAPTER_DIR))
    tokenizer.save_pretrained(str(ADAPTER_DIR))

    print("LoRA adapter saved to:", ADAPTER_DIR)

    if MERGE_AT_END:
        merge_adapter(tokenizer=tokenizer, dtype=dtype)

    print("=" * 100)
    print("Done.")


if __name__ == "__main__":
    main()
