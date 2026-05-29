# scripts/train.py

from __future__ import annotations

import argparse
import json
from dataclasses import replace
from pathlib import Path

from pytorch_gpt2.config import load_model_config, load_train_config
from pytorch_gpt2.train.trainer import Trainer


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()

    parser.add_argument("--language", required=True)
    parser.add_argument(
        "--model-config",
        default="configs/model/gpt2-small-bpe.yaml",
    )
    parser.add_argument(
        "--train-config",
        default="configs/train/gpt2-small-bf16.yaml",
    )
    parser.add_argument("--data-dir", required=True)

    return parser.parse_args()


def model_config_with_data_vocab(model_config, data_dir: str | Path):
    metadata_path = Path(data_dir) / "metadata.json"

    if not metadata_path.exists():
        return model_config

    metadata = json.loads(metadata_path.read_text(encoding="utf-8"))

    data_vocab_size = metadata.get("vocab_size")

    if data_vocab_size is None:
        return model_config

    return replace(
        model_config,
        vocab_size=int(data_vocab_size),
    )


def main() -> None:
    args = parse_args()

    model_config = load_model_config(args.model_config)
    model_config = model_config_with_data_vocab(
        model_config,
        args.data_dir,
    )

    train_config = load_train_config(args.train_config)

    out_dir = Path(train_config.out_dir)

    if not str(out_dir).endswith(f"-{args.language}"):
        out_dir = Path(f"{out_dir}-{args.language}")

    train_config = replace(
        train_config,
        out_dir=str(out_dir),
    )

    trainer = Trainer(
        model_config=model_config,
        train_config=train_config,
        data_dir=args.data_dir,
    )

    trainer.fit()


if __name__ == "__main__":
    main()


# bash
# python scripts/train.py \
#   --language pt-BR \
#   --model-config configs/model/gpt2-small-bpe.yaml \
#   --train-config configs/train/gpt2-small-bf16.yaml \
#   --data-dir data/tokenized/pt-BR_bpe_latest
