from __future__ import annotations

import os
from pathlib import Path

import torch
from datasets import load_dataset
from peft import LoraConfig, TaskType
from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed
from trl import SFTConfig, SFTTrainer


MODEL_ID = "Qwen/Qwen3.5-0.8B"
DATASET_ID = "celsowm/valdoria-sft-qwen35-dataset"

OUTPUT_ROOT = Path(os.environ.get("SFT_OUTPUT_ROOT", "runs"))
OUTPUT_DIR = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-lora-2"

SEED = 42


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    set_seed(SEED)
    torch.backends.cuda.matmul.allow_tf32 = True
    torch.backends.cudnn.allow_tf32 = True

    dataset = load_dataset(DATASET_ID)

    if "validation" in dataset:
        train_dataset = dataset["train"]
        eval_dataset = dataset["validation"]
    elif "test" in dataset:
        train_dataset = dataset["train"]
        eval_dataset = dataset["test"]
    else:
        splits = dataset["train"].shuffle(seed=SEED).train_test_split(
            test_size=0.1,
            seed=SEED,
        )
        train_dataset = splits["train"]
        eval_dataset = splits["test"]

    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_ID,
        trust_remote_code=True,
    )

    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    tokenizer.padding_side = "right"

    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
        trust_remote_code=True,
    )

    model.config.use_cache = False
    model.gradient_checkpointing_enable()

    # Ajuda quando usa gradient checkpointing + LoRA em alguns modelos.
    if hasattr(model, "enable_input_require_grads"):
        model.enable_input_require_grads()

    peft_config = LoraConfig(
        task_type=TaskType.CAUSAL_LM,
        r=16,
        lora_alpha=32,
        lora_dropout=0.05,
        bias="none",
        target_modules=[
            "q_proj",
            "k_proj",
            "v_proj",
            "o_proj",
            "gate_proj",
            "up_proj",
            "down_proj",
        ],
    )

    args = SFTConfig(
        output_dir=str(OUTPUT_DIR),

        num_train_epochs=3,
        max_steps=-1,

        # Menor para economizar VRAM.
        # Batch efetivo = 4 * 4 = 16, igual ao full fine-tuning.
        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
        gradient_accumulation_steps=4,
        auto_find_batch_size=True,

        # LoRA normalmente usa LR maior que full fine-tuning.
        learning_rate=2.0e-4,
        warmup_steps=10,
        weight_decay=0.01,
        lr_scheduler_type="cosine",

        optim="adamw_bnb_8bit",

        max_length=1024,

        bf16=torch.cuda.is_available() and torch.cuda.is_bf16_supported(),
        fp16=torch.cuda.is_available() and not torch.cuda.is_bf16_supported(),
        tf32=True,

        gradient_checkpointing=True,

        assistant_only_loss=True,
        loss_type="nll",

        do_train=True,
        do_eval=True,

        eval_strategy="steps",
        eval_steps=50,

        logging_steps=50,

        save_strategy="steps",
        save_steps=50,
        save_total_limit=2,

        load_best_model_at_end=True,
        metric_for_best_model="eval_loss",
        greater_is_better=False,

        report_to="none",
        remove_unused_columns=False,

        seed=SEED,
        data_seed=SEED,

        use_cache=False,
    )

    trainer = SFTTrainer(
        model=model,
        args=args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        processing_class=tokenizer,
        peft_config=peft_config,
    )

    trainable = sum(p.numel() for p in trainer.model.parameters() if p.requires_grad)
    total = sum(p.numel() for p in trainer.model.parameters())

    print("Parâmetros treináveis:", f"{trainable:,}", f"({100 * trainable / total:.4f}%)")
    print("Parâmetros totais:", f"{total:,}")
    print("Treino/validação:", len(train_dataset), len(eval_dataset))

    result = trainer.train()
    print("Métricas:", result.metrics)

    # Sem merge.
    # Isso salva apenas o adapter LoRA + config PEFT.
    trainer.save_model(str(OUTPUT_DIR))

    # Salva tokenizer junto para facilitar inferência depois.
    tokenizer.save_pretrained(str(OUTPUT_DIR))

    print("Adapter LoRA salvo em:", OUTPUT_DIR)
    print("Arquivos esperados: adapter_model.safetensors, adapter_config.json, tokenizer files")


if __name__ == "__main__":
    main()
