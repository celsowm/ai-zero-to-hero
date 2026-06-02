"""Local tokenizers used by the project."""
from __future__ import annotations

import json
import heapq
import re
import time
from collections import Counter, OrderedDict
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Protocol


_SPLIT_REGEX_EN = re.compile(
    r"""'(?:[sdmt]|ll|ve|re)| ?\w+| ?[^\s\w]+|\s+(?!\S)|\s+""",
    re.UNICODE,
)
_SPLIT_REGEX_PT = re.compile(
    r"""(?:[dncpmtsDNCPMTS])'(?=\w)| ?\w+| ?[^\s\w]+|\s+(?!\S)|\s+""",
    re.UNICODE,
)
_SPLIT_REGEX_DEFAULT = re.compile(
    r""" ?\w+| ?[^\s\w]+|\s+(?!\S)|\s+""",
    re.UNICODE,
)


class Tokenizer(Protocol):
    name: str

    @property
    def vocab_size(self) -> int:
        ...

    @property
    def eot_id(self) -> int:
        ...

    def encode(self, text: str, *, add_eot: bool = False) -> list[int]:
        ...

    def decode(self, ids: list[int]) -> str:
        ...


@dataclass(frozen=True)
class ByteTokenizer:
    name: str = "byte"

    @property
    def vocab_size(self) -> int:
        return 257

    @property
    def eot_id(self) -> int:
        return 256

    def encode(self, text: str, *, add_eot: bool = False) -> list[int]:
        ids = list(text.encode("utf-8"))
        if add_eot:
            ids.append(self.eot_id)
        return ids

    def decode(self, ids: list[int]) -> str:
        byte_ids = [idx for idx in ids if 0 <= idx < 256]
        return bytes(byte_ids).decode("utf-8", errors="replace")


@dataclass(frozen=True)
class BPETokenizer:
    merges: tuple[tuple[int, int], ...]
    pretokenizer_language: str | None = None
    name: str = "bpe"

    def __post_init__(self) -> None:
        merge_lookup = {pair: new_id for new_id, pair in enumerate(self.merges, start=257)}
        merge_rank = {pair: rank for rank, pair in enumerate(self.merges)}
        object.__setattr__(self, "_merge_lookup", merge_lookup)
        object.__setattr__(self, "_merge_rank", merge_rank)
        object.__setattr__(self, "_chunk_cache", OrderedDict())

    @property
    def vocab_size(self) -> int:
        return 257 + len(self.merges)

    @property
    def eot_id(self) -> int:
        return 256

    def encode(self, text: str, *, add_eot: bool = False) -> list[int]:
        ids = _encode_chunked_ids(
            text,
            language=self.pretokenizer_language,
            merge_lookup=self._merge_lookup,
            merge_rank=self._merge_rank,
            cache=self._chunk_cache,
        )
        if add_eot:
            ids.append(self.eot_id)
        return ids

    def decode(self, ids: list[int]) -> str:
        vocab = self._expanded_vocab()
        chunks: list[bytes] = []
        for idx in ids:
            if idx == self.eot_id:
                continue
            chunk = vocab.get(idx)
            if chunk is not None:
                chunks.append(chunk)
        return b"".join(chunks).decode("utf-8", errors="replace")

    def save(self, path: str | Path) -> None:
        payload = {
            "type": "byte_bpe",
            "version": 1,
            "base_vocab_size": 257,
            "eot_id": self.eot_id,
            "vocab_size": self.vocab_size,
            "pretokenizer_language": self.pretokenizer_language,
            "merges": [[a, b] for a, b in self.merges],
        }
        Path(path).write_text(json.dumps(payload, indent=2), encoding="utf-8")

    @classmethod
    def load(cls, path: str | Path) -> BPETokenizer:
        payload = json.loads(Path(path).read_text(encoding="utf-8"))
        if payload.get("type") != "byte_bpe":
            raise ValueError(f"Unsupported tokenizer file type: {payload.get('type')!r}")
        merges = tuple((int(a), int(b)) for a, b in payload.get("merges", []))
        return cls(merges=merges, pretokenizer_language=payload.get("pretokenizer_language"))

    def _expanded_vocab(self) -> dict[int, bytes]:
        vocab: dict[int, bytes] = {idx: bytes([idx]) for idx in range(256)}
        vocab[self.eot_id] = b""
        for new_id, (left, right) in enumerate(self.merges, start=257):
            vocab[new_id] = vocab[left] + vocab[right]
        return vocab


def _pretokenize_to_byte_chunks(text: str, language: str | None = None) -> list[bytes]:
    pattern = _resolve_split_regex(language)
    chunks: list[bytes] = []
    for match in pattern.finditer(text):
        piece = match.group(0)
        if piece:
            chunks.append(piece.encode("utf-8"))
    return chunks


def _resolve_split_regex(language: str | None) -> re.Pattern[str]:
    if language == "pt":
        return _SPLIT_REGEX_PT
    if language == "en":
        return _SPLIT_REGEX_EN
    return _SPLIT_REGEX_DEFAULT


def _encode_chunked_ids(
    text: str,
    *,
    language: str | None,
    merge_lookup: dict[tuple[int, int], int],
    merge_rank: dict[tuple[int, int], int],
    cache: OrderedDict[bytes, tuple[int, ...]] | None = None,
) -> list[int]:
    ids: list[int] = []
    for chunk in _pretokenize_to_byte_chunks(text, language):
        cached: tuple[int, ...] | None = None
        if cache is not None:
            cached = cache.get(chunk)
        if cached is None:
            cached = tuple(_apply_merges_fast(list(chunk), merge_lookup, merge_rank))
            if cache is not None:
                cache[chunk] = cached
        ids.extend(cached)
    return ids


def _apply_merges_fast(
    symbols: list[int],
    merge_lookup: dict[tuple[int, int], int],
    merge_rank: dict[tuple[int, int], int],
) -> list[int]:
    n = len(symbols)
    if n <= 1:
        return symbols
    nxt = list(range(1, n + 1))
    prv = list(range(-1, n - 1))
    heap: list[tuple[int, int]] = []
    for i in range(n - 1):
        pair = (symbols[i], symbols[i + 1])
        if pair in merge_rank:
            heapq.heappush(heap, (merge_rank[pair], i))
    alive = [True] * n
    while heap:
        rank, i = heapq.heappop(heap)
        if not alive[i]:
            continue
        j = nxt[i]
        if j >= n or not alive[j]:
            continue
        pair = (symbols[i], symbols[j])
        if merge_rank.get(pair) != rank:
            continue
        symbols[i] = merge_lookup[pair]
        alive[j] = False
        nxt[i] = nxt[j]
        if nxt[j] < n:
            prv[nxt[j]] = i
        li = prv[i]
        if li >= 0:
            left_pair = (symbols[li], symbols[i])
            if left_pair in merge_rank:
                heapq.heappush(heap, (merge_rank[left_pair], li))
        ri = nxt[i]
        if ri < n:
            right_pair = (symbols[i], symbols[ri])
            if right_pair in merge_rank:
                heapq.heappush(heap, (merge_rank[right_pair], i))
    return [symbols[i] for i in range(n) if alive[i]]
