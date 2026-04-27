# @region dataset-imports
import torch
from torch.utils.data import Dataset, DataLoader
# @endregion

# @region dataset-prepare-classic
def load_gutenberg_data(filepath):
    """Reads a text file from Project Gutenberg."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    return text

# Example: Load English classics
text_us = load_gutenberg_data("data/gutenberg/moby_dick.txt")
text_uk = load_gutenberg_data("data/gutenberg/frankenstein.txt")
# @endregion

# @region dataset-class
class GPT2Dataset(Dataset):
    """Autoregressive Dataset: predicts the next token."""
    def __init__(self, tokens, block_size):
        self.tokens = tokens
        self.block_size = block_size

    def __len__(self):
        # How many windows fit in the text
        return len(self.tokens) - self.block_size

    def __getitem__(self, idx):
        # The input (x) is the window of size block_size
        x = self.tokens[idx : idx + self.block_size]
        # The target (y) is the same window, shifted 1 position to the future
        y = self.tokens[idx + 1 : idx + self.block_size + 1]

        return torch.tensor(x, dtype=torch.long), torch.tensor(y, dtype=torch.long)
# @endregion

# @region dataset-loader
# Assume we already tokenized our text using our custom BPE
example_tokens = [12, 45, 89, 302, 15, 6, 8, 99, 102, 4]
block_size = 4

dataset = GPT2Dataset(example_tokens, block_size)
loader = DataLoader(dataset, batch_size=2, shuffle=True)

for x, y in loader:
    print(f"Input (x):\n{x}")
    print(f"Target (y):\n{y}")
    break
# @endregion