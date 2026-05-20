# @region dataset-imports
from datasets import load_dataset
# @endregion

# @region dataset-prepare-modern
def prepare_gutenberg_data():
    """Baixa um subconjunto do Project Gutenberg Clean (HuggingFace)."""
    # Este dataset é um corpus de livros em domínio público já limpo.
    print("Baixando amostra de dados...")

    # O HuggingFace Datasets cuida de gerenciar o cache e baixar em pedaços
    dataset = load_dataset("celsowm/project-gutenberg-clean", "default", split="train[:1000]")

    # Extrai a coluna de textos
    texts = dataset['text']
    print(f"Baixados {len(texts)} livros do Project Gutenberg.")

    return texts

textos_livros = prepare_gutenberg_data()
# @endregion
