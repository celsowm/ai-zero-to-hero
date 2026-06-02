"""Text source abstraction for local files and generic Hugging Face datasets.
"""
from __future__ import annotations

import re
from pathlib import Path
from typing import Iterator, Protocol

from config import DataConfig


_PARAGRAPH_SPLIT_RE = re.compile(r"\n[ \t]*\n[\s\n]*")
_INLINE_WS_RE = re.compile(r"[ \t\r\n]+")
_PAGE_NUMBER_RE = re.compile(r"^\s*\d{1,4}\s*$")


def normalize_paragraphs(text: str) -> str:
    if not text:
        return text
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    paragraphs: list[str] = []
    for raw_paragraph in _PARAGRAPH_SPLIT_RE.split(text):
        kept_lines = [
            line for line in raw_paragraph.split("\n")
            if not _PAGE_NUMBER_RE.match(line)
        ]
        if not kept_lines:
            continue
        joined = " ".join(kept_lines)
        flattened = _INLINE_WS_RE.sub(" ", joined).strip()
        if flattened:
            paragraphs.append(flattened)
    return "\n\n".join(paragraphs)


class TextSource(Protocol):
    def iter_texts(self) -> Iterator[str]:
        ...

    def count_documents(self) -> int | None:
        ...


class LocalTextSource:
    def __init__(self, path: str | Path) -> None:
        self.path = Path(path)
        if not self.path.exists():
            raise FileNotFoundError(f"Local text path does not exist: {self.path}")

    def iter_texts(self) -> Iterator[str]:
        if self.path.is_file():
            text = normalize_paragraphs(self.path.read_text(encoding="utf-8", errors="ignore"))
            if text:
                yield text
            return
        for file_path in sorted(self.path.rglob("*.txt")):
            text = normalize_paragraphs(file_path.read_text(encoding="utf-8", errors="ignore"))
            if text:
                yield text


class HFTextSource:
    def __init__(self, config: DataConfig) -> None:
        self.config = config
        if config.name is None:
            raise ValueError("DataConfig.name is required for source='hf'")

    def iter_texts(self) -> Iterator[str]:
        from datasets import load_dataset
        from datasets.utils.logging import disable_progress_bar
        disable_progress_bar()
        dataset = load_dataset(
            self.config.name,
            self.config.subset,
            split=self.config.split,
            streaming=self.config.streaming,
        )
        for row in dataset:
            text = row.get(self.config.text_column)
            if isinstance(text, str):
                cleaned = normalize_paragraphs(text)
                if cleaned:
                    yield cleaned


def build_text_source(config: DataConfig) -> TextSource:
    if config.source == "local":
        if config.path is None:
            raise ValueError("DataConfig.path is required for source='local'")
        return LocalTextSource(config.path)
    if config.source == "hf":
        return HFTextSource(config)
    raise ValueError(f"Unsupported data source: {config.source!r}")
