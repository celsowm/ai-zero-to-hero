# configs/data/hf_text.yaml

data:
  source: hf
  name: celsowm/project-gutenberg-clean
  subset: default
  split: train
  text_column: text
  language: pt
  streaming: true


# configs/model/gpt2-small-bpe.yaml

model:
  vocab_size: 32000
  block_size: 512
  n_layer: 8
  n_head: 8
  n_embd: 512
  dropout: 0.1
  bias: true
  tie_weights: true


# configs/train/gpt2-small-bf16.yaml

train:
  batch_size: 16
  gradient_accumulation_steps: 8
  max_steps: 20000
  learning_rate: 0.0006
  weight_decay: 0.1
  warmup_steps: 500
  grad_clip: 1.0
  eval_interval: 500
  checkpoint_interval: 1000
  mixed_precision: bf16
  compile: false
  out_dir: checkpoints/gpt2-small
  seed: 1337
  num_workers: 2

