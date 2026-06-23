from __future__ import annotations

import inspect
import os
from pathlib import Path

import torch
from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed

try:
    from trl import ORPOConfig, ORPOTrainer
except ImportError:
    from trl.experimental.orpo import ORPOConfig, ORPOTrainer


MODEL_ID = "Qwen/Qwen3.5-0.8B"
DATASET_ID = "celsowm/valdoria-orpo-qwen35-dataset"

BASE_DIR = Path(__file__).resolve().parent
OUTPUT_ROOT = Path(os.environ.get("ORPO_OUTPUT_ROOT", BASE_DIR / "runs")).resolve()
OUTPUT_DIR = OUTPUT_ROOT / "orpo-valdoria-qwen35-08b"

SEED = 42


def make_orpo_config(**kwargs) -> ORPOConfig:
    """
    Cria ORPOConfig de forma compatível com versões diferentes do TRL.

    Algumas versões experimentais do ORPOConfig não aceitam os mesmos campos
    do DPOConfig, por exemplo truncation_mode. Este helper filtra os campos
    que a versão instalada não conhece.
    """
    signature = inspect.signature(ORPOConfig)
    accepted = set(signature.parameters.keys())

    filtered = {}
    ignored = {}

    for key, value in kwargs.items():
        if key in accepted:
            filtered[key] = value
        else:
            ignored[key] = value

    if ignored:
        print("Argumentos ignorados pelo ORPOConfig desta versão:")
        for key in ignored:
            print(" -", key)

    return ORPOConfig(**filtered)


def make_orpo_trainer(
    *,
    model,
    args,
    train_dataset,
    eval_dataset,
    tokenizer,
):
    """
    Cria ORPOTrainer de forma compatível com versões diferentes do TRL.

    Algumas versões usam processing_class=tokenizer.
    Outras usam tokenizer=tokenizer.
    """
    signature = inspect.signature(ORPOTrainer)
    accepted = set(signature.parameters.keys())

    trainer_kwargs = {
        "model": model,
        "args": args,
        "train_dataset": train_dataset,
        "eval_dataset": eval_dataset,
    }

    if "processing_class" in accepted:
        trainer_kwargs["processing_class"] = tokenizer
    elif "tokenizer" in accepted:
        trainer_kwargs["tokenizer"] = tokenizer
    else:
        print("Aviso: ORPOTrainer não expõe processing_class nem tokenizer no __init__.")

    return ORPOTrainer(**trainer_kwargs)


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    set_seed(SEED)

    if torch.cuda.is_available():
        torch.backends.cuda.matmul.allow_tf32 = True

    print("Carregando dataset de preferência:", DATASET_ID)
    dataset = load_dataset(DATASET_ID)

    train_dataset = dataset["train"]

    if "validation" in dataset:
        eval_dataset = dataset["validation"]
    elif "test" in dataset:
        eval_dataset = dataset["test"]
    else:
        splits = train_dataset.shuffle(seed=SEED).train_test_split(
            test_size=0.1,
            seed=SEED,
        )
        train_dataset = splits["train"]
        eval_dataset = splits["test"]

    print("Carregando modelo base:", MODEL_ID)
    print("BASE_DIR:", BASE_DIR)
    print("OUTPUT_DIR:", OUTPUT_DIR)

    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_ID,
        trust_remote_code=True,
    )

    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    tokenizer.padding_side = "left"

    dtype = torch.float32
    if torch.cuda.is_available():
        if torch.cuda.is_bf16_supported():
            dtype = torch.bfloat16
        else:
            dtype = torch.float16

    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        dtype=dtype,
        trust_remote_code=True,
    )

    model.config.use_cache = False
    model.gradient_checkpointing_enable()

    args = make_orpo_config(
        output_dir=str(OUTPUT_DIR),

        # ORPO parte do modelo base, não de um checkpoint SFT.
        # Se ficar fraco, teste 2e-6.
        # Se decorar/ficar rígido demais, teste 5e-7.
        learning_rate=1e-6,
        num_train_epochs=3,
        max_steps=-1,
        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
        auto_find_batch_size=True,
        gradient_accumulation_steps=4,
        warmup_steps=0.03,
        weight_decay=0.01,
        lr_scheduler_type="cosine",
        optim="adamw_bnb_8bit",
        beta=0.1,
        max_length=1024,
        bf16=torch.cuda.is_available() and torch.cuda.is_bf16_supported(),
        fp16=torch.cuda.is_available() and not torch.cuda.is_bf16_supported(),
        tf32=torch.cuda.is_available(),
        gradient_checkpointing=True,
        use_cache=False,
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

    trainer = make_orpo_trainer(
        model=model,
        args=args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        tokenizer=tokenizer,
    )

    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total = sum(p.numel() for p in model.parameters())

    print("Parâmetros treináveis:", f"{trainable:,}", f"({100 * trainable / total:.2f}%)")
    print("Treino/validação:", len(train_dataset), len(eval_dataset))
    print("Saída:", OUTPUT_DIR)

    result = trainer.train()
    print("Métricas:", result.metrics)
    trainer.save_model(str(OUTPUT_DIR))
    tokenizer.save_pretrained(str(OUTPUT_DIR))
    print("Modelo ORPO salvo em:", OUTPUT_DIR)


if __name__ == "__main__":
    main()
