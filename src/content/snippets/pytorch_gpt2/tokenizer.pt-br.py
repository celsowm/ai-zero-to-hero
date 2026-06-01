# src/data/tokenizer.py

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path


class Tokenizer:
    vocab_size: int
    eot_id: int

    def encode(self, text: str, *, add_eot: bool = False) -> list[int]:
        raise NotImplementedError

    def decode(self, ids: list[int]) -> str:
        raise NotImplementedError


class ByteTokenizer(Tokenizer):
    vocab_size = 257
    eot_id = 256

    def encode(self, text: str, *, add_eot: bool = False) -> list[int]:
        ids = list(text.encode("utf-8"))

        if add_eot:
            ids.append(self.eot_id)

        return ids

    def decode(self, ids: list[int]) -> str:
        byte_values = [i for i in ids if 0 <= i <= 255]
        return bytes(byte_values).decode("utf-8", errors="replace")


@dataclass(frozen=True)
class BPETokenizer(Tokenizer):
    merges: list[tuple[int, int]]
    eot_id: int = 256

    @property
    def vocab_size(self) -> int:
        return 257 + len(self.merges)

    def encode(self, text: str, *, add_eot: bool = False) -> list[int]:
        ids = list(text.encode("utf-8"))

        for merge_id, pair in enumerate(self.merges, start=257):
            ids = _replace_pair(ids, pair, merge_id)

        if add_eot:
            ids.append(self.eot_id)

        return ids

    def decode(self, ids: list[int]) -> str:
        table: dict[int, list[int]] = {i: [i] for i in range(256)}
        table[self.eot_id] = []

        for merge_id, (a, b) in enumerate(self.merges, start=257):
            table[merge_id] = table[a] + table[b]

        byte_values: list[int] = []
        for token_id in ids:
            byte_values.extend(table.get(token_id, []))

        return bytes(byte_values).decode("utf-8", errors="replace")

    def save(self, path: str | Path) -> None:
        payload = {
            "type": "byte_bpe",
            "eot_id": self.eot_id,
            "merges": self.merges,
        }

        Path(path).write_text(
            json.dumps(payload, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )


def _replace_pair(
    ids: list[int],
    pair: tuple[int, int],
    new_id: int,
) -> list[int]:
    out: list[int] = []
    i = 0

    while i < len(ids):
        if i + 1 < len(ids) and (ids[i], ids[i + 1]) == pair:
            out.append(new_id)
            i += 2
        else:
            out.append(ids[i])
            i += 1

    return out

