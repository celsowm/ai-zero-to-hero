# @region dataset-imports
from datasets import load_dataset
# @endregion

# @region dataset-prepare-modern
def prepare_fineweb_data():
    """Downloads a subset of Fineweb (HuggingFace)."""
    # Fineweb is a massive dataset of clean internet text used by real AIs.
    print("Downloading data sample...")

    # HuggingFace Datasets handles caching and downloading in chunks
    dataset = load_dataset("HuggingFaceFW/fineweb", name="sample-10BT", split="train[:1000]")

    # Extracts the text column
    texts = dataset['text']
    print(f"Downloaded {len(texts)} documents from the internet.")

    return texts

internet_texts = prepare_fineweb_data()
# @endregion