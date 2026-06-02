"""Local tokenizers used by the project.

The byte tokenizer is dependency-free and deterministic. The BPE tokenizer is a
small byte-level implementation intended for learning and project control rather
than maximum tokenizer-training throughput.
"""
from __future__ import annotations

import json
import heapq
import re
import time
from collections import Counter, OrderedDict
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Protocol


# GPT-2 English regex: handles English clitics ('s, 't, 're, 've, 'm, 'll, 'd).
_SPLIT_REGEX_EN = re.compile(
    r"""'(?:[sdmt]|ll|ve|re)| ?\w+| ?[^\s\w]+|\s+(?!\S)|\s+""",
    re.UNICODE,
)

# Portuguese variant: handles common contractions written with an apostrophe
# (d'água, n'um, c'os, p'ra, m'amor, etc.) by attaching the leading
# letter+apostrophe to the following word.
_SPLIT_REGEX_PT = re.compile(
    r"""(?:[dncpmtsDNCPMTS])'(?=\w)| ?\w+| ?[^\s\w]+|\s+(?!\S)|\s+""",
    re.UNICODE,
)

# Language-agnostic fallback: same shape as GPT-2 but without any clitic rule.
_SPLIT_REGEX_DEFAULT = re.compile(
    r""" ?\w+| ?[^\s\w]+|\s+(?!\S)|\s+""",
    re.UNICODE,
)

_SPLIT_REGEX_BY_LANGUAGE: dict[str, re.Pattern[str]] = {
    "en": _SPLIT_REGEX_EN,
    "pt": _SPLIT_REGEX_PT,
}
_CHUNK_CACHE_MAX_SIZE = 32_768


def _normalize_language(language: str | None) -> str | None:
    if language is None:
        return None
    tag = language.strip().lower().replace("_", "-")
    return tag.split("-", 1)[0] or None


def _resolve_split_regex(language: str | None) -> re.Pattern[str]:
    primary = _normalize_language(language)
    if primary is None:
        return _SPLIT_REGEX_DEFAULT
    return _SPLIT_REGEX_BY_LANGUAGE.get(primary, _SPLIT_REGEX_DEFAULT)


def _pretokenize_to_byte_chunks(text: str, language: str | None = None) -> list[bytes]:
    pattern = _resolve_split_regex(language)
    chunks: list[bytes] = []
    for match in pattern.finditer(text):
        piece = match.group(0)
        if piece:
            chunks.append(piece.encode("utf-8"))
    return chunks


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


def _merge_pair(ids: list[int], pair: tuple[int, int], new_id: int) -> list[int]:
    if len(ids) < 2:
        return ids

    left, right = pair
    out: list[int] = []
    i = 0
    while i < len(ids):
        if i < len(ids) - 1 and ids[i] == left and ids[i + 1] == right:
            out.append(new_id)
            i += 2
        else:
            out.append(ids[i])
            i += 1
    return out


@dataclass(frozen=True)
class BPETokenizer:
    merges: tuple[tuple[int, int], ...]
    pretokenizer_language: str | None = None
    name: str = "bpe"

    def __post_init__(self) -> None:
        merge_lookup = {pair: new_id for new_id, pair in enumerate(self.merges, start=257)}
        merge_rank = {pair: rank for rank, pair in enumerate(self.merges)}
        object.__setattr__(
            self,
            "pretokenizer_language",
            _normalize_language(self.pretokenizer_language),
        )
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
        path = Path(path)
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    @classmethod
    def load(cls, path: str | Path) -> BPETokenizer:
        payload = json.loads(Path(path).read_text(encoding="utf-8"))
        if payload.get("type") != "byte_bpe":
            raise ValueError(f"Unsupported tokenizer file type: {payload.get('type')!r}")
        if int(payload.get("eot_id", -1)) != 256:
            raise ValueError("Only eot_id=256 is supported")
        merges = tuple((int(a), int(b)) for a, b in payload.get("merges", []))
        tokenizer = cls(
            merges=merges,
            pretokenizer_language=payload.get("pretokenizer_language"),
        )
        expected_vocab = payload.get("vocab_size")
        if expected_vocab is not None and int(expected_vocab) != tokenizer.vocab_size:
            raise ValueError(
                f"Tokenizer file says vocab_size={expected_vocab}, "
                f"but merges imply {tokenizer.vocab_size}"
            )
        return tokenizer

    def _expanded_vocab(self) -> dict[int, bytes]:
        vocab: dict[int, bytes] = {idx: bytes([idx]) for idx in range(256)}
        vocab[self.eot_id] = b""
        for new_id, (left, right) in enumerate(self.merges, start=257):
            if left not in vocab or right not in vocab:
                raise ValueError(f"Invalid merge ({left}, {right}) for token {new_id}")
            vocab[new_id] = vocab[left] + vocab[right]
        return vocab


def _pair_counts(sequences: list[list[int]]) -> Counter[tuple[int, int]]:
    counts: Counter[tuple[int, int]] = Counter()
    for ids in sequences:
        counts.update(zip(ids, ids[1:]))
    return counts


def _best_pair_from_counter(
    pair_freq: Counter[tuple[int, int]],
    min_pair_frequency: int,
) -> tuple[int, int, int] | None:
    best_pair: tuple[int, int] | None = None
    best_key: tuple[int, int, int, int] | None = None
    for pair, freq in pair_freq.items():
        if freq < min_pair_frequency:
            continue
        left, right = pair
        key = (freq, left == right, -(left + right), -left)
        if best_key is None or key > best_key:
            best_key = key
            best_pair = pair
    if best_pair is None:
        return None
    return best_pair[0], best_pair[1], pair_freq[best_pair]


def _merge_tuple(
    symbols: tuple[int, ...],
    left: int,
    right: int,
    merged: int,
) -> tuple[int, ...]:
    out: list[int] = []
    i = 0
    n = len(symbols)
    while i < n:
        if i + 1 < n and symbols[i] == left and symbols[i + 1] == right:
            out.append(merged)
            i += 2
        else:
            out.append(symbols[i])
            i += 1
    return tuple(out)


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


def _encode_chunked_ids(
    text: str,
    *,
    language: str | None,
    merge_lookup: dict[tuple[int, int], int],
    merge_rank: dict[tuple[int, int], int],
    cache: OrderedDict[bytes, tuple[int, ...]] | None = None,
    cache_max_size: int = _CHUNK_CACHE_MAX_SIZE,
) -> list[int]:
    ids: list[int] = []
    for chunk in _pretokenize_to_byte_chunks(text, language):
        cached: tuple[int, ...] | None = None
        if cache is not None:
            cached = cache.get(chunk)
            if cached is not None:
                cache.move_to_end(chunk)
        if cached is None:
            cached = tuple(_apply_merges_fast(list(chunk), merge_lookup, merge_rank))
            if cache is not None:
                cache[chunk] = cached
                cache.move_to_end(chunk)
                if len(cache) > cache_max_size:
                    cache.popitem(last=False)
        ids.extend(cached)
    return ids


def _train_bpe_incremental(
    sequences: list[list[int]] | None = None,
    *,
    target_merges: int,
    min_pair_frequency: int,
    progress,
    build_splits_progress=None,
    pre_split_counts: dict[tuple[int, ...], int] | None = None,
) -> list[tuple[int, int]]:
    if pre_split_counts is not None:
        splits: dict[tuple[int, ...], int] = dict(pre_split_counts)
        if build_splits_progress is not None:
            build_splits_progress.update(len(splits))
    else:
        if sequences is None:
            raise ValueError("Either sequences or pre_split_counts must be provided")
        splits = {}
        for ids in sequences:
            key = tuple(ids)
            splits[key] = splits.get(key, 0) + 1
            if build_splits_progress is not None:
                build_splits_progress.update(1)

    pair_freq: Counter[tuple[int, int]] = Counter()
    pair_index: dict[tuple[int, int], set[tuple[int, ...]]] = {}
    try:
        from tqdm import tqdm as _tqdm
    except ImportError:
        _tqdm = None
    build_pairs_progress = (
        _tqdm(
            total=len(splits),
            desc="BPE build pairs",
            unit="split",
            position=2,
            dynamic_ncols=True,
            leave=False,
        )
        if _tqdm
        else None
    )
    for symbols, weight in splits.items():
        for i in range(len(symbols) - 1):
            pair = (symbols[i], symbols[i + 1])
            pair_freq[pair] += weight
            pair_index.setdefault(pair, set()).add(symbols)
        if build_pairs_progress is not None:
            build_pairs_progress.update(1)
    if build_pairs_progress is not None:
        build_pairs_progress.close()

    merges: list[tuple[int, int]] = []

    while len(merges) < target_merges:
        best = _best_pair_from_counter(pair_freq, min_pair_frequency)
        if best is None:
            break
        left, right, frequency = best
        new_id = 257 + len(merges)

        affected = pair_index.pop((left, right), set())
        if not affected:
            if (left, right) in pair_freq:
                del pair_freq[(left, right)]
            continue

        new_splits_buffer: dict[tuple[int, ...], int] = {}
        for old_symbols in affected:
            count = splits.pop(old_symbols, 0)
            if count <= 0:
                continue

            for i in range(len(old_symbols) - 1):
                pair = (old_symbols[i], old_symbols[i + 1])
                if pair == (left, right):
                    continue
                pair_freq[pair] -= count
                if pair_freq[pair] <= 0:
                    del pair_freq[pair]
                entries = pair_index.get(pair)
                if entries is not None:
                    entries.discard(old_symbols)
                    if not entries:
                        del pair_index[pair]

            merged_symbols = _merge_tuple(old_symbols, left, right, new_id)
            new_splits_buffer[merged_symbols] = new_splits_buffer.get(merged_symbols, 0) + count

        if (left, right) in pair_freq:
            del pair_freq[(left, right)]

        for new_symbols, extra_count in new_splits_buffer.items():
            if new_symbols in splits:
                existing = splits[new_symbols]
                for i in range(len(new_symbols) - 1):
                    pair = (new_symbols[i], new_symbols[i + 1])
                    pair_freq[pair] -= existing
                    if pair_freq[pair] <= 0:
                        del pair_freq[pair]
                    entries = pair_index.get(pair)
                    if entries is not None:
                        entries.discard(new_symbols)
                        if not entries:
                            del pair_index[pair]
                splits[new_symbols] += extra_count
            else:
                splits[new_symbols] = extra_count

            final_count = splits[new_symbols]
            for i in range(len(new_symbols) - 1):
                pair = (new_symbols[i], new_symbols[i + 1])
                pair_freq[pair] += final_count
                pair_index.setdefault(pair, set()).add(new_symbols)

        merges.append((left, right))
        if progress is not None:
            progress.set_postfix(vocab=len(merges) + 257, top_freq=frequency)
            progress.update(1)

    return merges


def train_bpe_tokenizer(
    texts: Iterable[str],
    *,
    vocab_size: int,
    min_pair_frequency: int = 2,
    max_documents: int | None = None,
    max_bytes: int | None = None,
    language: str | None = None,
) -> BPETokenizer:

    if vocab_size < 257:
        raise ValueError("vocab_size must be at least 257")
    if min_pair_frequency < 1:
        raise ValueError("min_pair_frequency must be >= 1")

    chunk_counts: Counter[bytes] = Counter()
    consumed_bytes = 0

    for doc_index, text in enumerate(texts):
        if max_documents is not None and doc_index >= max_documents:
            break

        raw = text.encode("utf-8")
        if max_bytes is not None:
            remaining = max_bytes - consumed_bytes
            if remaining <= 0:
                break
            if len(raw) > remaining:
                text = raw[:remaining].decode("utf-8", errors="ignore")
                raw = text.encode("utf-8")

        if not raw:
            continue

        for chunk in _pretokenize_to_byte_chunks(text, language):
            chunk_counts[chunk] += 1
        consumed_bytes += len(raw)

    if not chunk_counts:
        raise ValueError("Cannot train tokenizer: no text was provided")

    pre_split_counts: dict[tuple[int, ...], int] = {
        tuple(chunk): count for chunk, count in chunk_counts.items()
    }

    target_merges = vocab_size - 257

    try:
        from tqdm import tqdm as _tqdm
    except ImportError:
        _tqdm = None

    progress = (
        _tqdm(
            range(target_merges),
            desc="BPE merges",
            unit="merge",
            position=1,
            dynamic_ncols=True,
            leave=True,
        )
        if _tqdm
        else None
    )
    build_splits_progress = (
        _tqdm(
            total=len(pre_split_counts),
            desc="BPE build splits",
            unit="split",
            position=3,
            dynamic_ncols=True,
            leave=False,
        )
        if _tqdm
        else None
    )
    start = time.perf_counter()
    try:
        merges = _train_bpe_incremental(
            target_merges=target_merges,
            min_pair_frequency=min_pair_frequency,
            progress=progress,
            build_splits_progress=build_splits_progress,
            pre_split_counts=pre_split_counts,
        )
    finally:
        if build_splits_progress is not None:
            build_splits_progress.close()
    elapsed = time.perf_counter() - start

    if progress is not None:
        progress.close()
        token_count = sum(len(chunk) * count for chunk, count in pre_split_counts.items())
        throughput = token_count / elapsed if elapsed > 0 else 0.0
        print(
            f"BPE trainer throughput: {throughput:,.0f} tokens/s "
            f"({token_count:,} bytes across {len(pre_split_counts):,} unique chunks, "
            f"{elapsed:.2f}s)"
        )

    return BPETokenizer(
        merges=tuple(merges),
        pretokenizer_language=language,
    )


def build_tokenizer(name: str = "byte", *, tokenizer_path: str | Path | None = None) -> Tokenizer:
    if name == "byte":
        return ByteTokenizer()
    if name == "bpe":
        if tokenizer_path is None:
            raise ValueError("tokenizer_path is required when tokenizer='bpe'")
        return BPETokenizer.load(tokenizer_path)
    raise ValueError(f"Unsupported tokenizer: {name!r}")
