"""Train the local byte-level BPE tokenizer from configured text data."""
from __future__ import annotations

import argparse
import time
from dataclasses import replace
from pathlib import Path

from config import DataConfig, load_data_config
from data.text_source import build_text_source
from data.tokenizer import train_bpe_tokenizer


def parse_args() -> argparse.Namespace:
    """Parse command-line arguments for BPE tokenizer training.
    
    Returns:
        Parsed argparse namespace.
    """
    parser = argparse.ArgumentParser(description="Train a small byte-level BPE tokenizer from text data.")
    parser.add_argument("--language", required=True, help="Language tag, for example: pt, en")
    parser.add_argument("--data-config", default=None)
    parser.add_argument(
        "--prefer-local",
        action="store_true",
        help="Try local data/raw before Hugging Face when --data-config is omitted",
    )
    parser.add_argument("--out", default=None, help="Output tokenizer JSON path")
    parser.add_argument("--vocab-size", type=int, default=32000)
    parser.add_argument("--min-pair-frequency", type=int, default=2)
    parser.add_argument("--max-documents", type=int, default=200_000)
    parser.add_argument("--max-bytes", type=int, default=200_000_000)
    return parser.parse_args()


def _auto_local_config(language: str) -> DataConfig:
    return DataConfig(
        source="local",
        path="data/raw",
        split="train",
        text_column="text",
        language=language,
        streaming=False,
    )


def _auto_hf_config(language: str) -> DataConfig:
    return DataConfig(
        source="hf",
        name="celsowm/project-gutenberg-clean",
        subset="default",
        split="train",
        text_column="text",
        language=language,
        streaming=True,
    )


def _can_yield_text(config: DataConfig) -> bool:
    try:
        source = build_text_source(config)
    except Exception:
        return False
    try:
        next(source.iter_texts())
    except StopIteration:
        return False
    except Exception:
        return False
    return True


def resolve_data_config(args: argparse.Namespace) -> tuple[DataConfig, str]:
    if args.data_config is not None:
        data_config = load_data_config(args.data_config)
        return data_config, f"Using explicit data config: {args.data_config}"

    if args.prefer_local:
        local = _auto_local_config(args.language)
        if _can_yield_text(local):
            return local, f"Using local source: {local.path}"
        hf = _auto_hf_config(args.language)
        return hf, "Local data/raw is empty or unavailable; falling back to celsowm/project-gutenberg-clean"

    hf = _auto_hf_config(args.language)
    return hf, "Using default HuggingFace source: celsowm/project-gutenberg-clean"


def main() -> None:
    """Train a byte-level BPE tokenizer from configured text data and save it."""
    args = parse_args()
    if args.out is None:
        args.out = str(Path("tokenizers") / f"{args.language}_latest.json")
    data_config, source_message = resolve_data_config(args)
    if args.max_documents is not None:
        data_config = replace(data_config, max_documents=args.max_documents)

    print(source_message)
    print(f"language: {args.language}")

    source = build_text_source(data_config)
    bytes_seen = 0
    docs_seen = 0

    try:
        from tqdm import tqdm as _tqdm
    except ImportError:
        _tqdm = None

    ingest_total = args.max_bytes if args.max_bytes is not None else None
    ingest_bar = (
        _tqdm(
            total=ingest_total,
            desc="ingesting",
            unit="B",
            unit_scale=True,
            position=0,
            dynamic_ncols=True,
            leave=True,
        )
        if _tqdm is not None
        else None
    )

    def counted_texts():
        nonlocal bytes_seen, docs_seen
        for text in source.iter_texts():
            raw_len = len(text.encode("utf-8"))
            bytes_seen += raw_len
            docs_seen += 1
            if ingest_bar is not None:
                ingest_bar.update(raw_len)
                ingest_bar.set_postfix(docs=docs_seen)
            yield text

    started_at = time.perf_counter()
    try:
        tokenizer = train_bpe_tokenizer(
            counted_texts(),
            vocab_size=args.vocab_size,
            min_pair_frequency=args.min_pair_frequency,
            max_documents=data_config.max_documents,
            max_bytes=args.max_bytes,
            language=args.language,
        )
    finally:
        if ingest_bar is not None:
            ingest_bar.close()
    elapsed = time.perf_counter() - started_at
    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    tokenizer.save(out_path)

    effective_bytes = min(bytes_seen, args.max_bytes) if args.max_bytes is not None else bytes_seen
    throughput = effective_bytes / elapsed if elapsed > 0 else 0.0

    print(f"saved: {out_path}")
    print(f"tokenizer: {tokenizer.name}")
    print(f"vocab_size: {tokenizer.vocab_size}")
    print(f"merges: {len(tokenizer.merges)}")
    print(f"documents_seen: {docs_seen}")
    print(f"throughput_bytes_per_s: {throughput:,.0f}")


if __name__ == "__main__":
    main()

# bash
# python scripts/train_tokenizer.py --language pt

