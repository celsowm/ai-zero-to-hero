#!/usr/bin/env python3
"""
Fetch Portuguese books from Project Gutenberg via the Gutendex API.

Usage:
    python fetch-gutenberg-books.py [--limit N] [--output-dir DIR]

Downloads plain-text Portuguese ebooks, strips Gutenberg headers/footers,
and saves them as individual .txt files plus a combined corpus.
"""

import argparse
import os
import re
import sys
import time
import urllib.request
import urllib.error
import json

GUTENDEX_URL = "https://gutendex.com/books"
GUTENBERG_TEXT_URL = "https://www.gutenberg.org/cache/epub/{id}/{id}-0.txt"

BOOKS_TO_FETCH = [
    # (gutenberg_id, filename_prefix)
    (5575, "dom-casmurro"),        # Machado de Assis
    (3362, "os-lusiadas"),         # Luis de Camoes
    (19699, "memorias-postumas"),  # Machado de Assis - Memorias Postumas
]


def fetch_gutendex_page(url: str, max_retries: int = 3) -> dict:
    """Fetch a page from the Gutendex API with retry logic."""
    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": "AI-Zero-to-Hero Course (educational)",
                "Accept": "application/json",
            })
            with urllib.request.urlopen(req, timeout=30) as response:
                return json.loads(response.read().decode("utf-8"))
        except (urllib.error.URLError, Exception) as e:
            print(f"  Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
    raise RuntimeError(f"Failed to fetch {url} after {max_retries} retries")


def list_portuguese_books(limit: int = 10) -> list[dict]:
    """List Portuguese books from Gutendex."""
    print("Searching for Portuguese books...")
    url = f"{GUTENDEX_URL}?languages=pt"
    data = fetch_gutendex_page(url)
    books = data.get("results", [])

    print(f"  Found {len(books)} books (showing top {limit})")
    return books[:limit]


def download_text(gutenberg_id: int) -> str | None:
    """Download the plain text version of a book."""
    url = GUTENBERG_TEXT_URL.format(id=gutenberg_id)
    print(f"  Downloading: {url}")

    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "AI-Zero-to-Hero Course (educational)",
        })
        with urllib.request.urlopen(req, timeout=60) as response:
            return response.read().decode("utf-8")
    except (urllib.error.URLError, Exception) as e:
        print(f"  Failed to download: {e}")
        return None


def strip_gutenberg_header(text: str) -> str:
    """Remove Gutenberg headers and footers from the text."""
    # Remove the standard Gutenberg header
    pattern = r"\*\*\* START OF (THIS|THE) PROJECT GUTENBERG EBOOK .*? \*\*\*"
    match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
    if match:
        text = text[match.end():]

    # Remove the footer
    pattern = r"\*\*\* END OF (THIS|THE) PROJECT GUTENBERG EBOOK .*? \*\*\*"
    match = re.search(pattern, text, re.IGNORECASE | re.DOTALL)
    if match:
        text = text[:match.start()]

    # Clean up: remove extra whitespace, but keep paragraph structure
    text = re.sub(r"\r\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)  # Max 2 consecutive newlines
    text = text.strip()

    return text


def extract_first_n_words(text: str, n: int = 2000) -> str:
    """Extract the first N words from the text (for a manageable sample)."""
    words = text.split()
    sample_words = words[:n]
    sample = " ".join(sample_words)

    # Try to end at a sentence boundary
    last_period = sample.rfind(".")
    if last_period > n * 0.8:  # If there's a period in the last 20%
        sample = sample[:last_period + 1]

    return sample


def main():
    parser = argparse.ArgumentParser(description="Fetch Portuguese books from Project Gutenberg")
    parser.add_argument("--limit", type=int, default=10, help="Max books to list")
    parser.add_argument("--output-dir", type=str, default="src/data/gutenberg", help="Output directory")
    parser.add_argument("--sample-words", type=int, default=2000, help="Words per sample")
    args = parser.parse_args()

    os.makedirs(args.output_dir, exist_ok=True)

    # Option 1: List available Portuguese books
    print("\n" + "=" * 60)
    print("PORTUGUESE BOOKS ON PROJECT GUTENBERG")
    print("=" * 60)
    try:
        books = list_portuguese_books(args.limit)
        for i, book in enumerate(books, 1):
            title = book.get("title", "Unknown")
            authors = book.get("authors", [])
            author_names = ", ".join(a.get("name", "Unknown") for a in authors)
            book_id = book.get("id", "?")
            print(f"  {i:2d}. [{book_id}] {title} — {author_names}")
    except Exception as e:
        print(f"  Could not list books: {e}")
        print("  Continuing with predefined books...")

    # Option 2: Download specific books
    print("\n" + "=" * 60)
    print("FETCHING PREDEFINED BOOKS")
    print("=" * 60)

    all_samples = []

    for book_id, filename in BOOKS_TO_FETCH:
        print(f"\nProcessing: {filename} (ID: {book_id})")

        text = download_text(book_id)
        if text is None:
            print(f"  Skipping {filename}")
            continue

        # Strip headers/footers
        clean_text = strip_gutenberg_header(text)

        # Save full cleaned text
        full_path = os.path.join(args.output_dir, f"{filename}-full.txt")
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(clean_text)
        print(f"  Saved full: {full_path} ({len(clean_text)} chars)")

        # Extract sample
        sample = extract_first_n_words(clean_text, args.sample_words)
        sample_path = os.path.join(args.output_dir, f"{filename}-sample.txt")
        with open(sample_path, "w", encoding="utf-8") as f:
            f.write(sample)
        print(f"  Saved sample: {sample_path} ({len(sample.split())} words)")

        all_samples.append(sample)

    # Save combined corpus
    if all_samples:
        combined = "\n\n".join(all_samples)
        combined_path = os.path.join(args.output_dir, "combined-corpus.txt")
        with open(combined_path, "w", encoding="utf-8") as f:
            f.write(combined)
        print(f"\n  Saved combined corpus: {combined_path} ({len(combined.split())} words)")

        # Print corpus stats
        words = combined.split()
        unique_words = set(w.lower() for w in words)
        print(f"\n  Corpus stats:")
        print(f"    Total words: {len(words)}")
        print(f"    Unique words: {len(unique_words)}")
        print(f"    Characters: {len(combined)}")

    print("\nDone! You can now use the corpus in the BPE exercises.")


if __name__ == "__main__":
    main()
