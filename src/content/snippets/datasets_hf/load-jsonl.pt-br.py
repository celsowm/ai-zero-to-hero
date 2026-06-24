from datasets import load_dataset

dataset = load_dataset('json', data_files='seu_arquivo.jsonl', split='train')

print(dataset[0])
