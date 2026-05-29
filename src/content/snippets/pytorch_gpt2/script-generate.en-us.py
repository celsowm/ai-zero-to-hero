# scripts/generate.py

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()

    parser.add_argument("--prompt", required=True)

    parser.add_argument(
        "--language",
        default=None,
        help="Language tag para inferir modelo/tokenizer",
    )

    parser.add_argument(
        "--model",
        "--checkpoint",
        dest="model",
        default=None,
        help="Path para checkpoint ou diretório exportado",
    )

    parser.add_argument("--max-new-tokens", type=int, default=80)
    parser.add_argument("--temperature", type=float, default=0.9)
    parser.add_argument("--top-k", type=int, default=100)
    parser.add_argument("--top-p", type=float, default=0.95)

    parser.add_argument(
        "--do-sample",
        action=argparse.BooleanOptionalAction,
        default=True,
    )

    parser.add_argument(
        "--tokenizer",
        choices=("auto", "byte", "bpe"),
        default="auto",
    )

    parser.add_argument("--tokenizer-path", default=None)
    parser.add_argument("--device", default="auto")
    parser.add_argument("--num-threads", type=int, default=1)

    return parser.parse_args()


def main() -> None:
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
# python scripts/generate.py \
#   --language pt-BR \
#   --prompt "Era uma vez" \
#   --max-new-tokens 120 \
#   --temperature 0.8 \
#   --top-k 50 \
#   --top-p 0.95
