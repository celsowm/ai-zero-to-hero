# @region dataset-imports
from datasets import load_dataset
# @endregion

# @region dataset-prepare-modern
def prepare_gutenberg_data():
    """Downloads a subset of Project Gutenberg Clean (HuggingFace)."""
    # This dataset is a cleaned public-domain books corpus.
    print("Downloading data sample...")

    # HuggingFace Datasets handles caching and downloading in chunks
    dataset = load_dataset("celsowm/project-gutenberg-clean", "default", split="train[:1000]")

    # Extracts the text column
    texts = dataset['text']
    print(f"Downloaded {len(texts)} books from Project Gutenberg.")

    return texts

book_texts = prepare_gutenberg_data()
# @endregion
