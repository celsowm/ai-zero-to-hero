# @region dataset-imports
from datasets import load_dataset
# @endregion

# @region dataset-prepare-modern
def prepare_fineweb_data():
    """Baixa um subconjunto do Fineweb (HuggingFace)."""
    # Fineweb é um dataset gigantesco da internet limpa usado por IAs reais.
    print("Baixando amostra de dados...")

    # O HuggingFace Datasets cuida de gerenciar o cache e baixar em pedaços
    dataset = load_dataset("HuggingFaceFW/fineweb", name="sample-10BT", split="train[:1000]")

    # Extrai a coluna de textos
    texts = dataset['text']
    print(f"Baixados {len(texts)} documentos da internet.")

    return texts

textos_internet = prepare_fineweb_data()
# @endregion