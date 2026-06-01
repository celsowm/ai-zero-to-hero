"""Generate text from an exported model or raw checkpoint."""
from __future__ import annotations

import argparse
from pathlib import Path

import torch

from data.text_source import normalize_paragraphs
from infer import GPT2ForCausalLM


def parse_args() -> argparse.Namespace:
    """Parse command-line arguments for text generation.
    
    Returns:
        Parsed argparse namespace.
    """
    parser = argparse.ArgumentParser()
    parser.add_argument("--prompt", required=True)
    parser.add_argument("--language", default=None, help="Language tag (e.g., 'pt') to infer model and tokenizer defaults.")
    parser.add_argument("--model", "--checkpoint", dest="model", default=None, help="Path to model checkpoint or directory.")
    parser.add_argument("--max-new-tokens", type=int, default=80)
    parser.add_argument("--temperature", type=float, default=0.9)
    parser.add_argument("--top-k", type=int, default=100)
    parser.add_argument("--top-p", type=float, default=0.95)
    parser.add_argument("--do-sample", action=argparse.BooleanOptionalAction, default=True)
    parser.add_argument("--tokenizer", choices=("auto", "byte", "bpe"), default="auto")
    parser.add_argument("--tokenizer-path", default=None)
    parser.add_argument("--device", default="auto")
    parser.add_argument("--num-threads", type=int, default=1)
    parser.add_argument(
        "--unwrap",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Reflow hard-wrapped lines in generated text (Gutenberg-style line breaks).",
    )
    return parser.parse_args()


def _resolve_bpe_tokenizer_path(language: str) -> str:
    base = Path("tokenizers")
    candidates = [
        base / f"{language}.json",
        base / f"{language}_latest.json",
    ]
    for candidate in candidates:
        if candidate.exists():
            return str(candidate)
    wildcard = sorted(base.glob(f"{language}_*.json"), key=lambda p: p.stat().st_mtime, reverse=True)
    if wildcard:
        return str(wildcard[0])
    return str(candidates[0])


def resolve_defaults(args: argparse.Namespace) -> None:
    """Resolve model and tokenizer defaults based on language if not explicitly provided."""
    if args.language:
        if args.model is None:
            # Tenta o melhor checkpoint primeiro, cai para o latest se nao existir.
            run_dir = Path("checkpoints") / f"gpt2-small-{args.language}"
            best_path = run_dir / "best_val.pt"
            latest_path = run_dir / "latest.pt"
            args.model = str(best_path) if best_path.exists() else str(latest_path)
        
        if args.tokenizer == "auto":
            args.tokenizer = "bpe"
        
        if args.tokenizer == "bpe" and args.tokenizer_path is None:
            args.tokenizer_path = _resolve_bpe_tokenizer_path(args.language)
    
    # Se ainda nao tem modelo e nao passou language, exige explicitamente (ou falha depois)
    if args.model is None:
        raise ValueError("Either --language or --model must be provided.")


def main() -> None:
    """Load a model and print generated text for the requested prompt."""
    args = parse_args()
    resolve_defaults(args)
    
    if args.num_threads > 0:
        torch.set_num_threads(args.num_threads)
        
    model = GPT2ForCausalLM.from_pretrained(
        args.model,
        tokenizer=args.tokenizer,
        tokenizer_path=args.tokenizer_path,
        device=args.device,
    )
    text = model.generate(
        args.prompt,
        max_new_tokens=args.max_new_tokens,
        temperature=args.temperature,
        top_k=args.top_k,
        top_p=args.top_p,
        do_sample=args.do_sample,
    )
    if args.unwrap:
        text = normalize_paragraphs(text)
    print(text)


if __name__ == "__main__":
    main()

# bash
# python scripts/generate.py --language pt --prompt "Era uma vez"

