from datasets import load_dataset

dataset = load_dataset('json', data_files='your_file.jsonl', split='train')

print(dataset[0])
