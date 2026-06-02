"""Prepare text data by tokenizing it and writing binary token shards."""
from __future__ import annotations

import argparse
import os
from functools import partial
from pathlib import Path

from config import DataConfig, load_data_config
from data.prepare import write_token_shards
from data.tokenizer import build_tokenizer


def parse_args() -> argparse.Namespace:
    """Parse command-line arguments for data preparation.
    
    Returns:
        Parsed argparse namespace.
    """
    default_workers = max(1, ((os.cpu_count() or 2) - 1) // 2)
    parser = argparse.ArgumentParser()
    parser.add_argument("--language", required=True, help="Language tag, for example: pt, en")
    parser.add_argument("--data-config", default=None)
    parser.add_argument("--out-dir", default=None)
    parser.add_argument("--max-tokens", type=int, default=300_000_000)
    parser.add_argument("--shard-size-tokens", type=int, default=10_000_000)
    parser.add_argument("--val-fraction", type=float, default=0.01)
    parser.add_argument("--tokenizer", choices=("byte", "bpe"), default="bpe")
    parser.add_argument("--tokenizer-path", default=None)
    parser.add_argument(
        "--num-workers",
        type=int,
        default=default_workers,
        help=(
            "Number of parallel tokenization processes. Defaults to "
            "max(1, (cpu_count - 1) // 2). Use 1 to disable multiprocessing."
        ),
    )
    return parser.parse_args()


def _resolve_bpe_tokenizer_path(language: str) -> str:
    base = Path("tokenizers")
    candidates = [
        base / f"{language}.json",
        base / f"{language}_latest.json",
    ]
    for candidate in candidates:
        if candidate.exists():
            return str(candidate)
    wildcard = sorted(base.glob(f"{language}_*.json"), key=lambda p: p.stat().st_mtime, reverse=True)
    if wildcard:
        return str(wildcard[0])
    return str(candidates[0])


def main() -> None:
    """Build a text source and tokenizer, then write prepared token shards."""
    args = parse_args()
    if args.tokenizer == "bpe" and args.tokenizer_path is None:
        args.tokenizer_path = _resolve_bpe_tokenizer_path(args.language)
    if args.data_config is not None:
        config = load_data_config(args.data_config)
    else:
        config = DataConfig(
            source="hf",
            name="celsowm/project-gutenberg-clean",
            subset="default",
            split="train",
            text_column="text",
            language=args.language,
            streaming=True,
        )
    out_dir = args.out_dir or str(Path("data/tokenized") / f"{args.language}_bpe_latest")
    print(f"[prepare] language: {args.language}")
    print(f"[prepare] out_dir: {out_dir}")
    # ``partial`` is picklable, which lets us reuse it as a multiprocessing
    # worker initializer on Windows ("spawn") without needing a global lambda.
    tokenizer_factory = partial(
        build_tokenizer, args.tokenizer, tokenizer_path=args.tokenizer_path
    )
    write_token_shards(
        config,
        out_dir,
        tokenizer=tokenizer_factory(),
        max_tokens=args.max_tokens,
        shard_size_tokens=args.shard_size_tokens,
        val_fraction=args.val_fraction,
        num_workers=args.num_workers,
        tokenizer_factory=tokenizer_factory,
    )


if __name__ == "__main__":
    main()

# bash
# pip install -e gpt2-pytorch
# python scripts/run_prepare_data.py --language pt
