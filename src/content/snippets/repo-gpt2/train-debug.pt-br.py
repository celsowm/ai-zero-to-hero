parser.add_argument("--language", required=True)
parser.add_argument("--model-config", default="configs/model/gpt2-debug.yaml")
parser.add_argument("--train-config", default="configs/train/debug.yaml")

data_dir = args.data_dir or "data/tokenized/pt_bpe_latest"
model_config = load_model_config(args.model_config)
train_config = load_train_config(args.train_config)

trainer = Trainer(model_config=model_config, train_config=train_config, data_dir=data_dir)
trainer.fit()
