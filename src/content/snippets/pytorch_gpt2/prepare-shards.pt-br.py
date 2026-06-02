"""Dataset preparation utilities that convert text streams into token shards."""
from __future__ import annotations

import json
from itertools import islice
from multiprocessing import get_context
from pathlib import Path
from typing import Callable, Iterable, Iterator

import numpy as np
from tqdm import tqdm

from config import DataConfig
from data.text_source import build_text_source
from data.tokenizer import ByteTokenizer, Tokenizer

TOKEN_DTYPE = np.uint16


def write_token_shards(
    config: DataConfig,
    out_dir: str | Path,
    *,
    tokenizer: Tokenizer | None = None,
    max_tokens: int | None = None,
    shard_size_tokens: int = 10_000_000,
    val_fraction: float = 0.01,
    num_workers: int = 1,
    tokenizer_factory: Callable[[], Tokenizer] | None = None,
) -> None:
    tokenizer = tokenizer or ByteTokenizer()
    out_path = Path(out_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    for path in out_path.glob("*.bin"):
        path.unlink()
    if (out_path / "metadata.json").exists():
        (out_path / "metadata.json").unlink()

    source = build_text_source(config)

    buffers: dict[str, list[int]] = {"train": [], "val": []}
    shard_counts = {"train": 0, "val": 0}
    total_tokens = 0
    total_docs = 0

    def flush(split: str, *, force: bool = False) -> None:
        if not buffers[split]:
            return
        if not force and len(buffers[split]) < shard_size_tokens:
            return
        shard_id = shard_counts[split]
        file_path = out_path / f"{split}_{shard_id:06d}.bin"
        arr = np.asarray(buffers[split], dtype=TOKEN_DTYPE)
        arr.tofile(file_path)
        buffers[split].clear()
        shard_counts[split] += 1

    pbar = tqdm(total=max_tokens, desc="tokenizing", unit="tok")

    for text in source.iter_texts():
        ids = tokenizer.encode(text, add_eot=True)
        if not ids:
            continue

        if max_tokens is not None:
            remaining = max_tokens - total_tokens
            if remaining <= 0:
                break
            ids = ids[:remaining]

        val_every = round(1 / val_fraction) if val_fraction > 0 else 0
        split = "val" if val_every and (total_docs + 1) % val_every == 0 else "train"
        buffers[split].extend(ids)

        total_docs += 1
        total_tokens += len(ids)
        pbar.update(len(ids))
        flush(split)

        if max_tokens is not None and total_tokens >= max_tokens:
            break

    pbar.close()
    flush("train", force=True)
    flush("val", force=True)

    metadata = {
        "source": config.source,
        "name": config.name,
        "subset": config.subset,
        "split": config.split,
        "text_column": config.text_column,
        "language": config.language,
        "tokenizer": tokenizer.name,
        "vocab_size": tokenizer.vocab_size,
        "dtype": str(np.dtype(TOKEN_DTYPE)),
        "total_tokens": total_tokens,
        "total_documents": total_docs,
        "shards": shard_counts,
        "val_fraction": val_fraction,
    }
    (out_path / "metadata.json").write_text(json.dumps(metadata, indent=2), encoding="utf-8")
