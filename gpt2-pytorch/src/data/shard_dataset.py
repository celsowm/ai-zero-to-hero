# src/data/shard_dataset.py

from __future__ import annotations

from pathlib import Path

import numpy as np
import torch
from torch.utils.data import Dataset

from data.prepare import TOKEN_DTYPE


class TokenShardDataset(Dataset[tuple[torch.Tensor, torch.Tensor]]):
    def __init__(
        self,
        data_dir: str | Path,
        *,
        split: str,
        block_size: int,
    ) -> None:
        self.data_dir = Path(data_dir)
        self.split = split
        self.block_size = block_size

        self.shards = sorted(self.data_dir.glob(f"{split}_*.bin"))

        if not self.shards:
            raise FileNotFoundError(f"No shards found for split={split!r}")

        self.arrays = [
            np.memmap(path, dtype=TOKEN_DTYPE, mode="r")
            for path in self.shards
        ]

        self.index: list[tuple[int, int]] = []

        for shard_idx, array in enumerate(self.arrays):
            max_offset = len(array) - block_size - 1

            for offset in range(max_offset):
                self.index.append((shard_idx, offset))

    def __len__(self) -> int:
        return len(self.index)

    def __getitem__(self, idx: int) -> tuple[torch.Tensor, torch.Tensor]:
        shard_idx, offset = self.index[idx]
        array = self.arrays[shard_idx]

        chunk = array[offset : offset + self.block_size + 1].astype(np.int64)

        x = torch.from_numpy(chunk[:-1].copy()).long()
        y = torch.from_numpy(chunk[1:].copy()).long()

        return x, y

