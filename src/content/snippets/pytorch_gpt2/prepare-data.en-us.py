# scripts/prepare_data.py

from __future__ import annotations

import argparse
from pathlib import Path

from pytorch_gpt2.config import load_data_config
from pytorch_gpt2.data.prepare import write_token_shards
from pytorch_gpt2.data.tokenizer import build_tokenizer


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()

    parser.add_argument("--language", required=True)
    parser.add_argument("--data-config", required=True)
    parser.add_argument("--out-dir", required=True)

    parser.add_argument("--tokenizer", choices=("byte", "bpe"), default="bpe")
    parser.add_argument("--tokenizer-path", required=True)

    parser.add_argument("--max-tokens", type=int, default=300_000_000)
    parser.add_argument("--shard-size-tokens", type=int, default=10_000_000)
    parser.add_argument("--val-fraction", type=float, default=0.01)

    return parser.parse_args()


def main() -> None:
    args = parse_args()

    data_config = load_data_config(args.data_config)

    tokenizer = build_tokenizer(
        args.tokenizer,
        tokenizer_path=args.tokenizer_path,
    )

    write_token_shards(
        data_config,
        args.out_dir,
        tokenizer=tokenizer,
        max_tokens=args.max_tokens,
        shard_size_tokens=args.shard_size_tokens,
        val_fraction=args.val_fraction,
    )

    print(f"wrote token shards to: {args.out_dir}")


if __name__ == "__main__":
    main()


# bash
# python scripts/prepare_data.py \
#   --language pt-BR \
#   --data-config configs/data/project_gutenberg_clean_pt.yaml \
#   --tokenizer bpe \
#   --tokenizer-path tokenizers/pt-BR_latest.json \
#   --out-dir data/tokenized/pt-BR_bpe_latest
