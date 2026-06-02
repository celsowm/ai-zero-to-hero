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

    def count_documents(self) -> int | None:
        if self.path.is_file():
            return 1
        return sum(1 for _ in self.path.rglob("*.txt"))


class HFTextSource:
    def __init__(self, config: DataConfig) -> None:
        self.config = config
        if config.name is None:
            raise ValueError("DataConfig.name is required for source='hf'")
        self._target_lang_primary = self._normalize_lang_tag(config.language)

    @staticmethod
    def _normalize_lang_tag(value: str | None) -> str | None:
        if value is None:
            return None
        tag = value.strip().lower().replace("_", "-")
        if not tag:
            return None
        return tag.split("-", 1)[0]

    def _row_matches_language(self, row: dict) -> bool:
        target = self._target_lang_primary
        if target is None:
            return True

        candidates: list[str] = []
        for key in ("languages", "language", "language_partition", "lang", "iso_language"):
            value = row.get(key)
            if isinstance(value, str):
                candidates.append(value)
            elif isinstance(value, list):
                candidates.extend(v for v in value if isinstance(v, str))

        if not candidates:
            return True

        normalized = {self._normalize_lang_tag(v) for v in candidates}
        return target in normalized

    def _iter_from_partitioned_parquet(self) -> Iterator[str]:
        from datasets import load_dataset
        from huggingface_hub import list_repo_files

        target = self._target_lang_primary
        if target is None:
            return

        repo_files = list_repo_files(self.config.name, repo_type="dataset")
        split_token = f"/{self.config.split}"
        parquet_files = [
            path
            for path in repo_files
            if path.endswith(".parquet")
            and f"/{target}/" in path.replace("\\", "/")
            and split_token in path.replace("\\", "/")
        ]
        if not parquet_files:
            return

        hf_urls = [f"hf://datasets/{self.config.name}/{path}" for path in parquet_files]
        dataset = load_dataset("parquet", data_files=hf_urls, split="train", streaming=self.config.streaming)
        for row in dataset:
            text = row.get(self.config.text_column)
            if isinstance(text, str):
                cleaned = normalize_paragraphs(text)
                if cleaned:
                    yield cleaned

    def iter_texts(self) -> Iterator[str]:
        from datasets import load_dataset
        from datasets.utils.logging import disable_progress_bar

        disable_progress_bar()

        used_partitioned = False
        for text in self._iter_from_partitioned_parquet():
            used_partitioned = True
            yield text
        if used_partitioned:
            return

        dataset = load_dataset(
            self.config.name,
            self.config.subset,
            split=self.config.split,
            streaming=self.config.streaming,
        )
        iterator = iter(dataset)
        while True:
            try:
                row = next(iterator)
            except StopIteration:
                break
            except Exception as exc:
                if "Couldn't cast" not in str(exc):
                    raise
                from datasets import load_dataset as _load_dataset
                from huggingface_hub import list_repo_files

                repo_files = list_repo_files(self.config.name, repo_type="dataset")
                split_token = f"/{self.config.split}"
                parquet_files = [
                    path for path in repo_files if path.endswith(".parquet") and split_token in path.replace("\\", "/")
                ]
                for path in parquet_files:
                    hf_url = f"hf://datasets/{self.config.name}/{path}"
                    partial_ds = _load_dataset("parquet", data_files=[hf_url], split="train", streaming=True)
                    for sub_row in partial_ds:
                        if not self._row_matches_language(sub_row):
                            continue
                        text = sub_row.get(self.config.text_column)
                        if isinstance(text, str):
                            cleaned = normalize_paragraphs(text)
                            if cleaned:
                                yield cleaned
                return

            if not self._row_matches_language(row):
                continue
            text = row.get(self.config.text_column)
            if isinstance(text, str):
                cleaned = normalize_paragraphs(text)
                if cleaned:
                    yield cleaned

    def count_documents(self) -> int | None:
        from datasets import load_dataset_builder

        try:
            builder = load_dataset_builder(self.config.name, self.config.subset)
            return builder.info.splits[self.config.split].num_examples
        except Exception:
            return None


def build_text_source(config: DataConfig) -> TextSource:
    if config.source == "local":
        if config.path is None:
            raise ValueError("DataConfig.path is required for source='local'")
        return LocalTextSource(config.path)
    if config.source == "hf":
        return HFTextSource(config)
    raise ValueError(f"Unsupported data source: {config.source!r}")
