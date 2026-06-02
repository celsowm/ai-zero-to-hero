"""Dataset preparation utilities that convert text streams into token shards.
"""
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
_WORKER_BATCH_SIZE = 32


_WORKER_TOKENIZER: Tokenizer | None = None


def _worker_init(factory: Callable[[], Tokenizer]) -> None:
    global _WORKER_TOKENIZER
    _WORKER_TOKENIZER = factory()


def _worker_encode_batch(texts: list[str]) -> list[list[int]]:
    assert _WORKER_TOKENIZER is not None, "worker tokenizer was not initialized"
    return [_WORKER_TOKENIZER.encode(text, add_eot=True) for text in texts]


def _bounded_texts(texts: Iterable[str], max_documents: int | None) -> Iterator[str]:
    if max_documents is None:
        yield from texts
        return
    for i, text in enumerate(texts):
        if i >= max_documents:
            return
        yield text


def _batched_texts(texts: Iterable[str], batch_size: int) -> Iterator[list[str]]:
    iterator = iter(texts)
    while True:
        batch = list(islice(iterator, batch_size))
        if not batch:
            return
        yield batch


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
    if not 0.0 <= val_fraction < 1.0:
        raise ValueError("val_fraction must be in [0.0, 1.0)")
    if num_workers < 1:
        raise ValueError("num_workers must be >= 1")
    if num_workers > 1 and tokenizer_factory is None:
        raise ValueError(
            "tokenizer_factory must be provided when num_workers > 1 "
            "(workers need a picklable factory to rebuild the tokenizer)"
        )

    tokenizer = tokenizer or ByteTokenizer()
    if tokenizer.vocab_size > np.iinfo(TOKEN_DTYPE).max:
        raise ValueError(f"Tokenizer vocab_size {tokenizer.vocab_size} does not fit {TOKEN_DTYPE}")

    out_path = Path(out_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    for path in out_path.glob("*.bin"):
        path.unlink()
    if (out_path / "metadata.json").exists():
        (out_path / "metadata.json").unlink()

    source = build_text_source(config)
    max_tokens = max_tokens if max_tokens is not None else config.max_tokens

    buffers: dict[str, list[int]] = {"train": [], "val": []}
    shard_counts = {"train": 0, "val": 0}
    total_tokens = 0
    total_docs = 0
    total_expected_docs = source.count_documents()

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

    if max_tokens is not None:
        pbar = tqdm(total=max_tokens, desc="tokenizing", unit="tok")
    else:
        pbar = tqdm(total=total_expected_docs, desc="tokenizing", unit="doc")

    bounded_texts = _bounded_texts(source.iter_texts(), config.max_documents)

    pool = None
    if num_workers > 1:
        ctx = get_context("spawn")
        pool = ctx.Pool(
            processes=num_workers,
            initializer=_worker_init,
            initargs=(tokenizer_factory,),
        )
        encoded_batches: Iterator[list[list[int]]] = pool.imap(
            _worker_encode_batch,
            _batched_texts(bounded_texts, _WORKER_BATCH_SIZE),
            chunksize=2,
        )
        print(f"[prepare] tokenizing with {num_workers} worker processes")
    else:
        encoded_batches = (
            [tokenizer.encode(text, add_eot=True)]
            for text in bounded_texts
        )

    try:
        stop_requested = False
        for batch_ids in encoded_batches:
            for ids in batch_ids:
                if not ids:
                    continue

                if max_tokens is not None:
                    remaining = max_tokens - total_tokens
                    if remaining <= 0:
                        stop_requested = True
                        break
                    ids = ids[:remaining]

                val_every = round(1 / val_fraction) if val_fraction > 0 else 0
                split = "val" if val_every and (total_docs + 1) % val_every == 0 else "train"
                buffers[split].extend(ids)

                total_docs += 1
                total_tokens += len(ids)

                if max_tokens is not None:
                    pbar.update(len(ids))
                else:
                    pbar.update(1)
                    pbar.set_postfix(tok=f"{total_tokens:,}")

                flush(split)

                if max_tokens is not None and total_tokens >= max_tokens:
                    stop_requested = True
                    break
            if stop_requested:
                break
    finally:
        if pool is not None:
            pool.terminate()
            pool.join()

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


def read_bin_tokens(path: str | Path) -> np.memmap:
    return np.memmap(path, dtype=TOKEN_DTYPE, mode="r")
