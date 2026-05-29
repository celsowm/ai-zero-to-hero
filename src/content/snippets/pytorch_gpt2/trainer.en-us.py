# src/pytorch_gpt2/train/trainer.py

from __future__ import annotations

from pathlib import Path

import torch
from torch.utils.data import DataLoader

from pytorch_gpt2.config import ModelConfig, TrainConfig
from pytorch_gpt2.data.shard_dataset import TokenShardDataset
from pytorch_gpt2.model.gpt import GPT
from pytorch_gpt2.train.checkpoint import CheckpointManager
from pytorch_gpt2.train.optimizer import build_adamw
from pytorch_gpt2.train.scheduler import cosine_lr
from pytorch_gpt2.utils.device import get_device
from pytorch_gpt2.utils.seed import seed_everything


class Trainer:
    def __init__(
        self,
        *,
        model_config: ModelConfig,
        train_config: TrainConfig,
        data_dir: str | Path,
    ) -> None:
        self.model_config = model_config
        self.train_config = train_config
        self.data_dir = Path(data_dir)

        self.device = get_device()

        seed_everything(train_config.seed)

        self.model = GPT(model_config).to(self.device)

        self.optimizer = build_adamw(
            self.model,
            learning_rate=train_config.learning_rate,
            weight_decay=train_config.weight_decay,
        )

        self.checkpoints = CheckpointManager(train_config.out_dir)

        self.train_loader = self._make_loader("train", shuffle=True)
        self.val_loader = self._make_loader("val", shuffle=False)

    def _make_loader(self, split: str, *, shuffle: bool) -> DataLoader:
        dataset = TokenShardDataset(
            self.data_dir,
            split=split,
            block_size=self.model_config.block_size,
        )

        return DataLoader(
            dataset,
            batch_size=self.train_config.batch_size,
            shuffle=shuffle,
            num_workers=self.train_config.num_workers,
            pin_memory=self.device.type == "cuda",
            drop_last=True,
        )

    def fit(self) -> None:
        self.model.train()

        loader_iter = iter(self.train_loader)

        for step in range(self.train_config.max_steps):
            self.optimizer.zero_grad(set_to_none=True)

            for _ in range(self.train_config.gradient_accumulation_steps):
                try:
                    x, y = next(loader_iter)
                except StopIteration:
                    loader_iter = iter(self.train_loader)
                    x, y = next(loader_iter)

                x = x.to(self.device)
                y = y.to(self.device)

                logits, loss = self.model(x, y)
                assert loss is not None

                loss = loss / self.train_config.gradient_accumulation_steps
                loss.backward()

            lr = cosine_lr(
                step,
                max_lr=self.train_config.learning_rate,
                warmup_steps=self.train_config.warmup_steps,
                max_steps=self.train_config.max_steps,
            )

            for group in self.optimizer.param_groups:
                group["lr"] = lr

            torch.nn.utils.clip_grad_norm_(
                self.model.parameters(),
                self.train_config.grad_clip,
            )

            self.optimizer.step()

            if step % self.train_config.checkpoint_interval == 0:
                self.checkpoints.save(
                    model=self.model,
                    optimizer=self.optimizer,
                    model_config=self.model_config,
                    train_config=self.train_config,
                    step=step,
                    name="latest.pt",
                )
