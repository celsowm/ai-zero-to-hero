# configs/data/project_gutenberg_clean_pt.yaml

data:
  source: hf
  name: celsowm/project-gutenberg-clean
  subset: default
  split: train
  text_column: text
  language: pt-BR
  streaming: true
  max_documents: null
  max_tokens: null


# configs/model/gpt2-small-bpe.yaml

model:
  vocab_size: 32000
  block_size: 1024
  n_layer: 12
  n_head: 12
  n_embd: 768
  dropout: 0.1
  bias: true
  tie_weights: true


# configs/train/gpt2-small-bf16.yaml

train:
  batch_size: 4
  gradient_accumulation_steps: 4
  max_steps: 1000
  learning_rate: 0.0006
  weight_decay: 0.1
  warmup_steps: 100
  grad_clip: 1.0
  eval_interval: 100
  checkpoint_interval: 500
  mixed_precision: bf16
  compile: false
  out_dir: checkpoints/gpt2-small
  seed: 1337
  num_workers: 0
