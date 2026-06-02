"""PyTorch dataset for random next-token batches from binary token shards."""
from __future__ import annotations

import bisect
from pathlib import Path

import numpy as np
import torch
from torch.utils.data import Dataset

from data.prepare import TOKEN_DTYPE


class TokenShardDataset(Dataset[tuple[torch.Tensor, torch.Tensor]]):
    def __init__(self, data_dir: str | Path, *, split: str, block_size: int) -> None:
        self.data_dir = Path(data_dir)
        self.split = split
        self.block_size = block_size
        self.files = sorted(self.data_dir.glob(f"{split}_*.bin"))
        if not self.files:
            raise FileNotFoundError(f"No {split}_*.bin shards found in {self.data_dir}")

        self.arrays = [np.memmap(path, dtype=TOKEN_DTYPE, mode="r") for path in self.files]
        self.windows_per_file = [max(0, len(arr) - block_size) for arr in self.arrays]
        self.cumulative: list[int] = []
        running = 0
        for count in self.windows_per_file:
            running += count
            self.cumulative.append(running)

        if running <= 0:
            raise ValueError(f"Not enough tokens in {self.data_dir} for block_size={block_size}")

    def __len__(self) -> int:
        return self.cumulative[-1]

    def __getitem__(self, idx: int) -> tuple[torch.Tensor, torch.Tensor]:
        if idx < 0:
            idx += len(self)
        if idx < 0 or idx >= len(self):
            raise IndexError(idx)

        file_idx = bisect.bisect_right(self.cumulative, idx)
        prev = 0 if file_idx == 0 else self.cumulative[file_idx - 1]
        offset = idx - prev
        arr = self.arrays[file_idx]

        chunk = np.asarray(arr[offset : offset + self.block_size + 1], dtype=np.int64)
        x = torch.from_numpy(chunk[:-1].copy()).long()
        y = torch.from_numpy(chunk[1:].copy()).long()
        return x, y
