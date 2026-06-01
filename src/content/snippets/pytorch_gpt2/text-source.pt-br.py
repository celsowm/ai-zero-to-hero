# src/data/text_source.py

from __future__ import annotations

from abc import ABC, abstractmethod
from pathlib import Path
from typing import Iterator

from config import DataConfig


def normalize_paragraphs(text: str) -> str:
    lines = [line.strip() for line in text.splitlines()]

    paragraphs: list[str] = []
    current: list[str] = []

    for line in lines:
        if not line:
            if current:
                paragraphs.append(" ".join(current))
                current = []
            continue

        current.append(line)

    if current:
        paragraphs.append(" ".join(current))

    return "\n\n".join(paragraphs)


class TextSource(ABC):
    @abstractmethod
    def iter_texts(self) -> Iterator[str]:
        raise NotImplementedError


class LocalTextSource(TextSource):
    def __init__(self, path: str | Path) -> None:
        self.path = Path(path)

    def iter_texts(self) -> Iterator[str]:
        for file in sorted(self.path.glob("*.txt")):
            text = file.read_text(encoding="utf-8")
            yield normalize_paragraphs(text)


class HFTextSource(TextSource):
    def __init__(self, config: DataConfig) -> None:
        self.config = config

    def iter_texts(self) -> Iterator[str]:
        from datasets import load_dataset

        dataset = load_dataset(
            self.config.name,
            self.config.subset,
            split=self.config.split,
            streaming=self.config.streaming,
        )

        for row in dataset:
            text = row.get(self.config.text_column)
            if isinstance(text, str) and text.strip():
                yield normalize_paragraphs(text)


def build_text_source(config: DataConfig) -> TextSource:
    if config.source == "hf":
        return HFTextSource(config)

    if config.source == "local":
        return LocalTextSource(config.name)

    raise ValueError(f"Unsupported data source: {config.source!r}")

