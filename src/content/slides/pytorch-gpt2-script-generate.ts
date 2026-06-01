import { defineSlide } from './_factory';

export const pytorchGpt2ScriptGenerate = defineSlide({
  id: 'pytorch-gpt2-script-generate',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Gerar texto pelo terminal',
      body: `Agora fechamos o ciclo com um comando de terminal.

Depois de treinar tokenizer, preparar dados e treinar modelo, o usuário precisa conseguir gerar texto sem escrever código Python manualmente. O \`scripts/generate.py\` é esse ponto de entrada.

Ele recebe prompt, caminho do checkpoint ou idioma, parâmetros de geração, tokenizer, device e número de threads. Depois resolve defaults, carrega \`GPT2ForCausalLM.from_pretrained(...)\`, chama \`model.generate(...)\` e imprime o texto.

Este slide é importante porque conecta tudo que veio antes com a experiência final do usuário. O aluno vê que o treino não termina em loss; termina em um artefato carregável que pode receber prompt e devolver texto.

No projeto, o script aceita argumentos como \`--prompt\`, \`--language\`, \`--model\`, \`--max-new-tokens\`, \`--temperature\`, \`--top-k\`, \`--top-p\`, \`--do-sample\`, \`--tokenizer\`, \`--tokenizer-path\` e \`--device\`; depois carrega \`GPT2ForCausalLM\` e chama \`model.generate\`.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/script-generate
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: docstring, `argparse`, `pathlib`, `torch`, `normalize_paragraphs` da `data.text_source`, e `GPT2ForCausalLM` do pacote `infer`.' },
        { lineRange: [13, 54], content: '`parse_args()`: `--prompt` é obrigatório. Com `--language pt`, o script resolve checkpoint `checkpoints/gpt2-small-pt/best_val.pt` ou `latest.pt`, resolve o BPE em `tokenizers/pt_latest.json` e usa defaults de geração 80 tokens, temperature 0.9, top-k 100, top-p 0.95.' },
        { lineRange: [56, 75], content: '`resolve_defaults()`: se `--language` for fornecido, infere checkpoint, tokenizer e caminhos automaticamente.' },
        { lineRange: [77, 105], content: '`main()`: chama `resolve_defaults(args)`, configura threads, carrega modelo com `GPT2ForCausalLM.from_pretrained`, chama `model.generate()`, opcionalmente normaliza parágrafos com `normalize_paragraphs`, e imprime o texto gerado.' },
        { lineRange: [107, 109], content: 'Exemplo bash de uso: `python scripts/generate.py --language pt --prompt "Era uma vez"`.' },
      ],
    },
    'en-us': {
      title: 'Generate text from the terminal',
      body: `Now we close the loop with a terminal command.

After training a tokenizer, preparing data, and training a model, the user needs to be able to generate text without writing Python code manually. \`scripts/generate.py\` is that entry point.

It receives the prompt, checkpoint path or language, generation parameters, tokenizer, device, and thread count. Then it resolves defaults, loads \`GPT2ForCausalLM.from_pretrained(...)\`, calls \`model.generate(...)\`, and prints the text.

This slide is important because it connects everything that came before with the final user experience. The student sees that training does not end at loss; it ends in a loadable artifact that can receive a prompt and return text.

In the project, the script accepts arguments like \`--prompt\`, \`--language\`, \`--model\`, \`--max-new-tokens\`, \`--temperature\`, \`--top-k\`, \`--top-p\`, \`--do-sample\`, \`--tokenizer\`, \`--tokenizer-path\`, and \`--device\`; then loads \`GPT2ForCausalLM\` and calls \`model.generate\`.`,
      rightBody: `\`\`\`python
snippet:pytorch_gpt2/script-generate
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports: docstring, `argparse`, `pathlib`, `torch`, `normalize_paragraphs` from `data.text_source`, and `GPT2ForCausalLM` from the `infer` package.' },
        { lineRange: [13, 54], content: '`parse_args()`: `--prompt` is required. With `--language pt`, the script resolves `checkpoints/gpt2-small-pt/best_val.pt` or `latest.pt`, resolves BPE at `tokenizers/pt_latest.json`, and uses generation defaults of 80 tokens, temperature 0.9, top-k 100, top-p 0.95.' },
        { lineRange: [56, 75], content: '`resolve_defaults()`: if `--language` is given, infers checkpoint, tokenizer, and paths automatically.' },
        { lineRange: [77, 105], content: '`main()`: calls `resolve_defaults(args)`, sets threads, loads model with `GPT2ForCausalLM.from_pretrained`, calls `model.generate()`, optionally normalizes paragraphs with `normalize_paragraphs`, and prints the generated text.' },
        { lineRange: [107, 109], content: 'Bash usage example: `python scripts/generate.py --language pt --prompt "Era uma vez"`.' },
      ],
    },
  },
});

