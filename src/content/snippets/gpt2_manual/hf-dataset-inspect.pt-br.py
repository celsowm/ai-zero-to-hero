from datasets import get_dataset_config_names, load_dataset


repo_id = "celsowm/seu-dataset"

configs = get_dataset_config_names(repo_id)
print("configs:", configs)

config_name = configs[0] if configs else None
dataset = load_dataset(repo_id, config_name)

print(dataset)
print("splits:", list(dataset.keys()))

split_name = "train" if "train" in dataset else list(dataset.keys())[0]
train = dataset[split_name]

print("split usado:", split_name)
print("features:", train.features)
print("columns:", train.column_names)
print("sample:", train[0])
