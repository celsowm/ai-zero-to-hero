"""Single-process trainer for GPT-2 style next-token language modeling."""
from __future__ import annotations

import json
import math
import time
from contextlib import nullcontext
from pathlib import Path

import torch
from torch.utils.data import DataLoader
from tqdm import tqdm

from config import ModelConfig, TrainConfig
from data.shard_dataset import TokenShardDataset
from model.gpt import GPT
from train.checkpoint import CheckpointManager
from train.optimizer import build_adamw
from train.scheduler import cosine_lr
from utils.device import autocast_dtype, get_device
from utils.seed import seed_everything


class Trainer:
    def __init__(self, *, model_config: ModelConfig, train_config: TrainConfig, data_dir: str | Path) -> None:
        self.model_config = model_config
        self.train_config = train_config
        self.data_dir = Path(data_dir)
        self.device = get_device()

        if self.device.type == "cuda":
            torch.backends.cuda.matmul.allow_tf32 = True
            torch.backends.cudnn.allow_tf32 = True
            torch.backends.cudnn.benchmark = True
            torch.set_float32_matmul_precision("high")

        self._validate_data_metadata()

        seed_everything(train_config.seed)
        self.model = GPT(model_config).to(self.device)
        if train_config.compile:
            self.model = torch.compile(self.model)

        self.optimizer = build_adamw(
            self.model, learning_rate=train_config.learning_rate, weight_decay=train_config.weight_decay
        )
        self.checkpoints = CheckpointManager(train_config.out_dir)

        self.train_loader = self._make_loader("train", shuffle=True)
        self.val_loader = self._make_loader("val", shuffle=False, required=False)

        self.amp_dtype = autocast_dtype(train_config.mixed_precision)
        self.use_grad_scaler = self.amp_dtype == torch.float16 and self.device.type == "cuda"
        self.scaler = torch.amp.GradScaler(self.device.type, enabled=self.use_grad_scaler)

    def _validate_data_metadata(self) -> None:
        metadata_path = self.data_dir / "metadata.json"
        if not metadata_path.exists():
            return
        metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
        data_vocab_size = metadata.get("vocab_size")
        if data_vocab_size is not None and int(data_vocab_size) != self.model_config.vocab_size:
            raise ValueError(
                f"Model vocab_size={self.model_config.vocab_size}, "
                f"but data was prepared with vocab_size={data_vocab_size}."
            )

    def fit(self) -> None:
        self.model.train()
        step = 0
        best_val_loss: float | None = None
        loader_iter = iter(self.train_loader)
        t0 = time.time()

        pbar = tqdm(total=self.train_config.max_steps, desc="training", unit="step")
        while step < self.train_config.max_steps:
            self.optimizer.zero_grad(set_to_none=True)
            accumulated_loss = torch.zeros((), device=self.device)

            for _ in range(self.train_config.gradient_accumulation_steps):
                try:
                    x, y = next(loader_iter)
                except StopIteration:
                    loader_iter = iter(self.train_loader)
                    x, y = next(loader_iter)

                x = x.to(self.device, non_blocking=True)
                y = y.to(self.device, non_blocking=True)

                context = (
                    torch.autocast(device_type=self.device.type, dtype=self.amp_dtype)
                    if self.amp_dtype is not None and self.device.type in {"cuda", "cpu"}
                    else nullcontext()
                )
                with context:
                    _, loss = self.model(x, y)
                    assert loss is not None
                    loss = loss / self.train_config.gradient_accumulation_steps

                if self.use_grad_scaler:
                    self.scaler.scale(loss).backward()
                else:
                    loss.backward()
                accumulated_loss += loss.detach()

            lr = cosine_lr(
                step, max_lr=self.train_config.learning_rate,
                warmup_steps=self.train_config.warmup_steps,
                max_steps=self.train_config.max_steps,
            )
            for group in self.optimizer.param_groups:
                group["lr"] = lr

            if self.train_config.grad_clip > 0:
                if self.use_grad_scaler:
                    self.scaler.unscale_(self.optimizer)
                torch.nn.utils.clip_grad_norm_(self.model.parameters(), self.train_config.grad_clip)

            if self.use_grad_scaler:
                self.scaler.step(self.optimizer)
                self.scaler.update()
            else:
                self.optimizer.step()

            step += 1
            pbar.update(1)

            if step % 10 == 0:
                train_loss = float(accumulated_loss)
                pbar.set_postfix(lr=f"{lr:.2e}")

            if self.val_loader is not None and step % self.train_config.eval_interval == 0:
                val_loss = self.evaluate(max_batches=20)
                if best_val_loss is None or val_loss < best_val_loss:
                    best_val_loss = val_loss
                    self.checkpoints.save(
                        model=self._raw_model(), optimizer=self.optimizer,
                        model_config=self.model_config, train_config=self.train_config,
                        step=step, best_val_loss=best_val_loss, name="best_val.pt",
                    )

            if step % self.train_config.checkpoint_interval == 0:
                self.checkpoints.save(
                    model=self._raw_model(), optimizer=self.optimizer,
                    model_config=self.model_config, train_config=self.train_config,
                    step=step, best_val_loss=best_val_loss, name="latest.pt",
                )

        pbar.close()
        self.checkpoints.save(
            model=self._raw_model(), optimizer=self.optimizer,
            model_config=self.model_config, train_config=self.train_config,
            step=step, best_val_loss=best_val_loss, name="latest.pt",
        )

    @torch.no_grad()
    def evaluate(self, *, max_batches: int = 20) -> float:
        self.model.eval()
        losses = []
        for i, (x, y) in enumerate(self.val_loader):
            if i >= max_batches:
                break
            x = x.to(self.device, non_blocking=True)
            y = y.to(self.device, non_blocking=True)
            _, loss = self.model(x, y)
            assert loss is not None
            losses.append(float(loss.detach().cpu()))
        self.model.train()
        return sum(losses) / max(1, len(losses))

    def _make_loader(self, split: str, *, shuffle: bool, required: bool = True) -> DataLoader | None:
        try:
            dataset = TokenShardDataset(self.data_dir, split=split, block_size=self.model_config.block_size)
        except FileNotFoundError:
            if required:
                raise
            return None
        return DataLoader(
            dataset,
            batch_size=self.train_config.batch_size,
            shuffle=shuffle,
            num_workers=self.train_config.num_workers,
            pin_memory=self.device.type == "cuda",
            drop_last=True,
        )

    def _raw_model(self) -> torch.nn.Module:
        return self.model._orig_mod if hasattr(self.model, "_orig_mod") else self.model
