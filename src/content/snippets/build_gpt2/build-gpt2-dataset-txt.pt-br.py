# @region dataset-imports
import torch
from torch.utils.data import Dataset, DataLoader
# @endregion

# @region dataset-prepare-classic
def load_gutenberg_data(filepath):
    """Lê um arquivo texto do Projeto Gutenberg."""
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    return text

# Exemplo: Carregar clássicos em Português
text_br = load_gutenberg_data("data/gutenberg/dom_casmurro.txt")
text_pt = load_gutenberg_data("data/gutenberg/os_lusiadas.txt")
# @endregion

# @region dataset-class
class GPT2Dataset(Dataset):
    """Dataset auto-regressivo: prevê o próximo token."""
    def __init__(self, tokens, block_size):
        self.tokens = tokens
        self.block_size = block_size

    def __len__(self):
        # Quantas janelas cabem no texto
        return len(self.tokens) - self.block_size

    def __getitem__(self, idx):
        # A entrada (x) é a janela de tamanho block_size
        x = self.tokens[idx : idx + self.block_size]
        # O alvo (y) é a mesma janela, deslocada em 1 posição para o futuro
        y = self.tokens[idx + 1 : idx + self.block_size + 1]

        return torch.tensor(x, dtype=torch.long), torch.tensor(y, dtype=torch.long)
# @endregion

# @region dataset-loader
# Suponha que já tokenizamos nosso texto usando o nosso BPE customizado
tokens_exemplo = [12, 45, 89, 302, 15, 6, 8, 99, 102, 4]
block_size = 4

dataset = GPT2Dataset(tokens_exemplo, block_size)
loader = DataLoader(dataset, batch_size=2, shuffle=True)

for x, y in loader:
    print(f"Entrada (x):\n{x}")
    print(f"Alvo (y):\n{y}")
    break
# @endregion