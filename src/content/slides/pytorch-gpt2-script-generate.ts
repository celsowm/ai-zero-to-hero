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
        { lineRange: [3, 43], content: '`parse_args()`: argumentos `--prompt` (obrigatório), `--language`, `--model`/`--checkpoint`, `--max-new-tokens`, `--temperature`, `--top-k`, `--top-p`, `--do-sample`, `--tokenizer`, `--tokenizer-path`, `--device`, `--num-threads`.' },
        { lineRange: [46, 73], content: '`main()`: chama `resolve_defaults(args)`, configura threads, carrega modelo com `GPT2ForCausalLM.from_pretrained`, chama `model.generate()`, opcionalmente normaliza parágrafos com `normalize_paragraphs`, e imprime o texto gerado.' },
        { lineRange: [76, 77], content: 'Bloco `if __name__ == "__main__"`: executa `main()` quando chamado diretamente.' },
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
        { lineRange: [3, 43], content: '`parse_args()`: arguments `--prompt` (required), `--language`, `--model`/`--checkpoint`, `--max-new-tokens`, `--temperature`, `--top-k`, `--top-p`, `--do-sample`, `--tokenizer`, `--tokenizer-path`, `--device`, `--num-threads`.' },
        { lineRange: [46, 73], content: '`main()`: calls `resolve_defaults(args)`, sets threads, loads model with `GPT2ForCausalLM.from_pretrained`, calls `model.generate()`, optionally normalizes paragraphs with `normalize_paragraphs`, and prints the generated text.' },
        { lineRange: [76, 77], content: '`if __name__ == "__main__"` block: runs `main()` when called directly.' },
      ],
    },
  },
});
