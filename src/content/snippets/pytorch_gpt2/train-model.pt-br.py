"""Train a GPT-2 style model from YAML configs and token shards."""
from __future__ import annotations

import argparse
import json
from dataclasses import replace
from pathlib import Path

from config import load_model_config, load_train_config
from train.trainer import Trainer


def parse_args() -> argparse.Namespace:
    """Parse command-line arguments for model training.
    
    Returns:
        Parsed argparse namespace.
    """
    parser = argparse.ArgumentParser()
    parser.add_argument("--language", required=True, help="Language tag, for example: pt, en")
    parser.add_argument("--model-config", default="configs/model/gpt2-small-bpe.yaml")
    parser.add_argument("--train-config", default="configs/train/gpt2-small-bf16.yaml")
    parser.add_argument("--data-dir", default=None)
    return parser.parse_args()


def _model_config_with_data_vocab(model_config, data_dir: str | Path):
    metadata_path = Path(data_dir) / "metadata.json"
    if not metadata_path.exists():
        return model_config

    metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
    data_vocab_size = metadata.get("vocab_size")
    if data_vocab_size is None:
        return model_config

    resolved_vocab_size = int(data_vocab_size)
    if resolved_vocab_size == model_config.vocab_size:
        return model_config

    print(
        f"[train] overriding model vocab_size from {model_config.vocab_size} "
        f"to {resolved_vocab_size} based on {metadata_path}"
    )
    return replace(model_config, vocab_size=resolved_vocab_size)


def main() -> None:
    """Load configs, construct a trainer, and run training."""
    args = parse_args()
    data_dir = args.data_dir or str(Path("data/tokenized") / f"{args.language}_bpe_latest")
    model_config = load_model_config(args.model_config)
    model_config = _model_config_with_data_vocab(model_config, data_dir)
    train_config = load_train_config(args.train_config)
    out_dir = Path(train_config.out_dir)
    if not str(out_dir).endswith(f"-{args.language}"):
        out_dir = Path(f"{out_dir}-{args.language}")
    train_config = replace(train_config, out_dir=str(out_dir))
    print(f"[train] language: {args.language}")
    print(f"[train] data_dir: {data_dir}")
    trainer = Trainer(model_config=model_config, train_config=train_config, data_dir=data_dir)
    trainer.fit()


if __name__ == "__main__":
    main()

# bash
# pip install -e gpt2-pytorch
# python scripts/run_train.py --language pt
