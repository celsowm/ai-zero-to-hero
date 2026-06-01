# src/data/prepare.py

from __future__ import annotations

import json
from pathlib import Path

import numpy as np

from config import DataConfig
from data.text_source import build_text_source
from data.tokenizer import Tokenizer

TOKEN_DTYPE = np.uint16


def write_token_shards(
    config: DataConfig,
    out_dir: str | Path,
    *,
    tokenizer: Tokenizer,
    max_tokens: int,
    shard_size_tokens: int,
    val_fraction: float,
) -> None:
    out_path = Path(out_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    source = build_text_source(config)

    train_tokens: list[int] = []
    val_tokens: list[int] = []

    token_count = 0

    for doc_idx, text in enumerate(source.iter_texts()):
        ids = tokenizer.encode(text, add_eot=True)

        if token_count + len(ids) > max_tokens:
            break

        if doc_idx % int(1 / val_fraction) == 0:
            val_tokens.extend(ids)
        else:
            train_tokens.extend(ids)

        token_count += len(ids)

    _write_split(out_path, "train", train_tokens, shard_size_tokens)
    _write_split(out_path, "val", val_tokens, shard_size_tokens)

    metadata = {
        "vocab_size": tokenizer.vocab_size,
        "eot_id": tokenizer.eot_id,
        "dtype": "uint16",
        "train_tokens": len(train_tokens),
        "val_tokens": len(val_tokens),
    }

    (out_path / "metadata.json").write_text(
        json.dumps(metadata, indent=2),
        encoding="utf-8",
    )


def _write_split(
    out_dir: Path,
    split: str,
    tokens: list[int],
    shard_size_tokens: int,
) -> None:
    for shard_id, start in enumerate(range(0, len(tokens), shard_size_tokens)):
        shard = tokens[start : start + shard_size_tokens]
        array = np.asarray(shard, dtype=TOKEN_DTYPE)

        path = out_dir / f"{split}_{shard_id:06d}.bin"
        array.tofile(path)

