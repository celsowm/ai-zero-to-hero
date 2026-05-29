# scripts/train_tokenizer.py

from __future__ import annotations

import argparse
from pathlib import Path

from pytorch_gpt2.config import load_data_config
from pytorch_gpt2.data.text_source import build_text_source
from pytorch_gpt2.data.tokenizer import train_bpe_tokenizer


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()

    parser.add_argument("--language", required=True)
    parser.add_argument("--data-config", required=True)
    parser.add_argument("--out", required=True)
    parser.add_argument("--vocab-size", type=int, default=32000)
    parser.add_argument("--min-pair-frequency", type=int, default=2)
    parser.add_argument("--max-documents", type=int, default=None)
    parser.add_argument("--max-bytes", type=int, default=None)

    return parser.parse_args()


def main() -> None:
    args = parse_args()

    data_config = load_data_config(args.data_config)
    text_source = build_text_source(data_config)

    tokenizer = train_bpe_tokenizer(
        text_source.iter_texts(),
        vocab_size=args.vocab_size,
        min_pair_frequency=args.min_pair_frequency,
        max_documents=args.max_documents,
        max_bytes=args.max_bytes,
        language=args.language,
    )

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)

    tokenizer.save(out_path)

    print(f"saved tokenizer: {out_path}")
    print(f"vocab_size: {tokenizer.vocab_size}")


if __name__ == "__main__":
    main()


# bash
# python scripts/train_tokenizer.py \
#   --language pt-BR \
#   --data-config configs/data/project_gutenberg_clean_pt.yaml \
#   --out tokenizers/pt-BR_latest.json \
#   --vocab-size 32000
