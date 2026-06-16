import { defineSlide } from './_factory';

export const visionMmprojLlamaCpp = defineSlide({
  id: 'vision-mmproj-llama-cpp',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Visão Computacional em LLMs: mmproj',
      body: [
        'Um modelo multimodal não coloca pixels crus dentro do transformer de texto. Antes da geração, a imagem passa por um encoder visual, vira vetores e só então entra no espaço que o LLM entende.',
        '',
        '### O caminho da imagem',
        '',
        '- A imagem é quebrada em patches ou regiões visuais',
        '- O encoder de visão transforma esses pedaços em embeddings',
        '- O `mmproj` projeta esses embeddings para a dimensão interna do modelo de linguagem',
        '- Depois disso, o LLM continua como sempre: atenção, logits e próximo token',
        '',
        '### Onde entram os pesos',
        '',
        '| Parte | O que carrega |',
        '|---|---|',
        '| GGUF principal | Pesos do modelo de linguagem |',
        '| Vision encoder | Pesos que extraem features da imagem |',
        '| `mmproj` | Pesos que alinham visão ao espaço do LLM |',
        '| KV cache | Tokens de texto e tokens visuais já processados |',
        '',
        '### Ligação com PyTorch',
        '',
        '- Em PyTorch, a imagem começa como tensor: `[batch, canais, altura, largura]`',
        '- O vision encoder é um `nn.Module` que transforma esse tensor em embeddings',
        '- O `mmproj` é outra transformação aprendida, parecida com uma camada linear entre espaços vetoriais',
        '- Quando exportamos/quantizamos para GGUF, esses pesos deixam de aparecer como código PyTorch, mas continuam sendo matrizes treinadas',
        '',
        '### No llama.cpp',
        '',
        '- Com arquivo local, use `llama-server -m model.gguf --mmproj file.gguf`',
        '- Com `-hf`, modelos compatíveis podem carregar o projector automaticamente',
        '- Em checkpoints multimodais `safetensors`, essa projeção pode já estar embutida no próprio modelo, em vez de vir como `mmproj` separado',
        '- O cliente continua chamando `/v1/chat/completions` com texto + `image_url`',
        '',
        '> No `llama.cpp`, o `mmproj` é a ponte treinada: sem ele, o runtime não consegue encaixar os vetores da imagem no espaço interno do LLM.',
      ].join('\n'),
    },
    'en-us': {
      title: 'Computer Vision in LLMs: mmproj',
      body: [
        'A multimodal model does not put raw pixels inside the text transformer. Before generation, the image goes through a vision encoder, becomes vectors, and only then enters the space the LLM understands.',
        '',
        '### The image path',
        '',
        '- The image is split into patches or visual regions',
        '- The vision encoder turns those pieces into embeddings',
        '- `mmproj` projects those embeddings into the language model hidden space',
        '- After that, the LLM continues as usual: attention, logits, and next token',
        '',
        '### Where the weights live',
        '',
        '| Part | What it carries |',
        '|---|---|',
        '| Main GGUF | Language model weights |',
        '| Vision encoder | Weights that extract image features |',
        '| `mmproj` | Weights that align vision to the LLM space |',
        '| KV cache | Already processed text and visual tokens |',
        '',
        '### Link to PyTorch',
        '',
        '- In PyTorch, the image starts as a tensor: `[batch, channels, height, width]`',
        '- The vision encoder is an `nn.Module` that turns that tensor into embeddings',
        '- `mmproj` is another learned transform, similar to a linear layer between vector spaces',
        '- When we export/quantize to GGUF, those weights stop looking like PyTorch code, but they are still trained matrices',
        '',
        '### In llama.cpp',
        '',
        '- With local files, use `llama-server -m model.gguf --mmproj file.gguf`',
        '- With `-hf`, compatible models can load the projector automatically',
        '- In multimodal `safetensors` checkpoints, that projection can already be embedded in the model itself instead of living as a separate `mmproj` file',
        '- The client still calls `/v1/chat/completions` with text + `image_url`',
        '',
        "> In `llama.cpp`, `mmproj` is the trained bridge: without it, the runtime cannot place image vectors in the LLM's internal space.",
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Cliente Python' },
        ],
        codePanels: [
          {
            title: 'Enviar imagem ao llama-server',
            description: 'Converte uma imagem local para Base64 e envia texto + imagem ao endpoint OpenAI-compatible do `llama-server`.',
            source: { snippetId: 'requests/vision-mmproj-llama-cpp', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 3],
                content: 'Base64 embute a imagem no JSON; `mimetypes` preserva o tipo correto; `requests` faz as chamadas HTTP.',
              },
              {
                lineRange: [5, 12],
                content: 'O exemplo assume um `llama-server` local na porta 8000, com um modelo vision-capable e `mmproj` já carregado.',
              },
              {
                lineRange: [14, 20],
                content: 'Antes do chat, o cliente consulta `/v1/models` para usar o identificador real do modelo ativo.',
              },
              {
                lineRange: [22, 30],
                content: 'A imagem vira um `data:` URL Base64, que pode viajar dentro do payload JSON.',
              },
              {
                lineRange: [32, 52],
                content: 'O `content` da mensagem mistura um bloco de texto e um bloco `image_url`, no formato multimodal compatível com OpenAI API.',
              },
              {
                lineRange: [54, 61],
                content: 'O POST envia o payload, valida erro HTTP e imprime a resposta textual produzida pelo modelo.',
              },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'Python Client' },
        ],
        codePanels: [
          {
            title: 'Send an image to llama-server',
            description: 'Converts a local image to Base64 and sends text + image to the OpenAI-compatible `llama-server` endpoint.',
            source: { snippetId: 'requests/vision-mmproj-llama-cpp', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 3],
                content: 'Base64 embeds the image in JSON; `mimetypes` preserves the correct type; `requests` performs the HTTP calls.',
              },
              {
                lineRange: [5, 12],
                content: 'The example assumes a local `llama-server` on port 8000, with a vision-capable model and `mmproj` already loaded.',
              },
              {
                lineRange: [14, 20],
                content: 'Before chat, the client queries `/v1/models` to use the real identifier of the active model.',
              },
              {
                lineRange: [22, 30],
                content: 'The image becomes a Base64 `data:` URL that can travel inside the JSON payload.',
              },
              {
                lineRange: [32, 52],
                content: 'The message `content` mixes a text block and an `image_url` block in the OpenAI API-compatible multimodal format.',
              },
              {
                lineRange: [54, 61],
                content: 'The POST sends the payload, validates HTTP errors, and prints the text response produced by the model.',
              },
            ],
          },
        ],
      },
    },
  },
});
