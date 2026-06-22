from __future__ import annotations

import os
from pathlib import Path

import torch
from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed
from trl import DPOConfig, DPOTrainer

# Modelo já treinado por SFT full
SFT_MODEL_DIR = "runs/sft-valdoria-qwen35-08b-full"
DATASET_ID = "celsowm/valdoria-dpo-qwen35-dataset"
OUTPUT_ROOT = Path(os.environ.get("DPO_OUTPUT_ROOT", "runs"))
OUTPUT_DIR = OUTPUT_ROOT / "dpo-valdoria-qwen35-08b-full"

SEED = 42


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    set_seed(SEED)

    if torch.cuda.is_available():
        torch.backends.cuda.matmul.allow_tf32 = True

    print("Carregando dataset DPO:", DATASET_ID)
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

    print("Carregando modelo SFT:", SFT_MODEL_DIR)

    tokenizer = AutoTokenizer.from_pretrained(
        str(SFT_MODEL_DIR),
        trust_remote_code=True,
    )

    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    # Importante no DPOTrainer atual.
    # A documentação do TRL pede padding_side="left" para DPO.
    tokenizer.padding_side = "left"

    dtype = torch.float32
    if torch.cuda.is_available():
        if torch.cuda.is_bf16_supported():
            dtype = torch.bfloat16
        else:
            dtype = torch.float16

    model = AutoModelForCausalLM.from_pretrained(
        str(SFT_MODEL_DIR),
        dtype=dtype,
        trust_remote_code=True,
    )

    model.config.use_cache = False
    model.gradient_checkpointing_enable()

    args = DPOConfig(
        output_dir=str(OUTPUT_DIR),

        # DPO geralmente pede LR bem menor que SFT.
        # TRL também usa default baixo para DPO, 1e-6.
        learning_rate=5e-7,
        num_train_epochs=2,
        max_steps=-1,

        # DPO usa chosen + rejected + referência, então consome bem mais VRAM que SFT.
        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
        auto_find_batch_size=True,
        gradient_accumulation_steps=4,

        warmup_ratio=0.03,
        weight_decay=0.01,
        lr_scheduler_type="cosine",
        optim="adamw_bnb_8bit",

        # DPO padrão.
        beta=0.1,
        loss_type="sigmoid",

        # Seu dataset parece caber em 1024.
        # Se estourar contexto, o trainer trunca.
        max_length=1024,
        truncation_mode="keep_start",

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

    trainer = DPOTrainer(
        model=model,

        # ref_model=None é intencional:
        # o DPOTrainer usa a política inicial como modelo de referência.
        # Ou seja: a referência é o seu SFT antes do DPO começar.
        ref_model=None,

        args=args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        processing_class=tokenizer,
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

    print("Modelo DPO salvo em:", OUTPUT_DIR)


if __name__ == "__main__":
    main()
