import { defineSlide } from './_factory';

export const pytorchGpt2ModuleIntro = defineSlide({
  id: 'pytorch-gpt2-module-intro',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Visão geral do módulo',
      body: `Neste módulo, a ideia não é usar um GPT pronto, nem esconder o funcionamento atrás de uma biblioteca gigante. **Vamos construir** uma versão pequena, didática e completa de um GPT em PyTorch, do começo ao fim.

O projeto começa com texto bruto. Esse texto passa por um tokenizer BPE, vira IDs inteiros, é salvo em *shards* binários, depois entra em um *dataset* PyTorch que cria pares x/y para prever o próximo token.

A partir daí, montamos o modelo: *embedding* de token, *embedding* de posição, blocos Transformer, atenção causal, MLP, *LayerNorm* e projeção final para *logits*. Depois vem o treino: *loss*, *backward*, AdamW, *scheduler* e *checkpoint*.

No fim, voltamos para o mundo do usuário: carregamos o *checkpoint*, recebemos um *prompt*, geramos tokens um por um e decodificamos esses tokens de volta para texto.

A mensagem principal do projeto é:

**texto → tokens → tensores → GPT → treino → checkpoint → geração → texto**`,
    },
    'en-us': {
      title: 'Module overview',
      body: `In this module, the idea is not to use a ready-made GPT, nor to hide how it works behind a giant library. **We will build** a small, didactic, and complete version of a GPT in PyTorch, from start to finish.

The project begins with raw text. That text goes through a BPE tokenizer, turns into integer IDs, is saved into binary shards, and then enters a PyTorch dataset that creates x/y pairs for next-token prediction.

From there, we build the model: token embedding, position embedding, Transformer blocks, causal attention, MLP, LayerNorm, and final logit projection. Then comes training: loss, backward, AdamW, scheduler, and checkpoint.

At the end, we return to the user's world: load the checkpoint, receive a prompt, generate tokens one by one, and decode those tokens back into text.

The project's main message is:

**text → tokens → tensors → GPT → training → checkpoint → generation → text**`,
    },
  },
  visual: {
    id: 'pytorch-gpt2-pipeline-mermaid',
    copy: {
      'pt-br': {
        title: 'Fluxo completo do pipeline',
        subtitle: 'Do texto bruto ao texto gerado, passando por tokenização, treino e inferência.',
        mermaidSource: `flowchart TB
    A["Texto bruto<br/>corpus / dataset"] --> B["Tokenizer BPE<br/>texto → IDs"]
    B --> C["Shards binários<br/>train_*.bin / val_*.bin"]
    C --> D["Dataset PyTorch<br/>chunk → x/y"]
    D --> E["GPT<br/>IDs → logits"]
    E --> F["Treino<br/>loss + backward + AdamW"]
    F --> G["Checkpoint<br/>pesos + configs"]
    G --> H["Inferência<br/>prompt → próximos tokens"]
    H --> I["Texto gerado<br/>decode(ids)"]

    subgraph DATA["Dados"]
      A
      B
      C
      D
    end

    subgraph MODEL["Modelo"]
      E
    end

    subgraph TRAIN["Treino"]
      F
      G
    end

    subgraph INFER["Inferência"]
      H
      I
    end`,
        legendTitle: 'Etapas do pipeline',
        legend: [
          { module: 'Dados', role: 'Preparação do corpus: tokenização com BPE, serialização em arquivos binários e dataset PyTorch com pares contexto/alvo.' },
          { module: 'Modelo', role: 'Arquitetura GPT: embeddings, blocos Transformer com atenção causal, MLP e projeção para logits.' },
          { module: 'Treino', role: 'Ciclo de otimização: forward, cálculo da loss, backward, passo do AdamW e salvamento de checkpoint.' },
          { module: 'Inferência', role: 'Geração autoregressiva: prompt → amostragem token a token → decodificação para texto legível.' },
        ],
        footer: 'Cada bloco será implementado em um arquivo separado, do zero, sem dependências externas além do PyTorch.',
      },
      'en-us': {
        title: 'Complete pipeline flow',
        subtitle: 'From raw text to generated text, through tokenization, training, and inference.',
        mermaidSource: `flowchart TB
    A["Raw text<br/>corpus / dataset"] --> B["BPE Tokenizer<br/>text → IDs"]
    B --> C["Binary shards<br/>train_*.bin / val_*.bin"]
    C --> D["PyTorch Dataset<br/>chunk → x/y"]
    D --> E["GPT<br/>IDs → logits"]
    E --> F["Training<br/>loss + backward + AdamW"]
    F --> G["Checkpoint<br/>weights + configs"]
    G --> H["Inference<br/>prompt → next tokens"]
    H --> I["Generated text<br/>decode(ids)"]

    subgraph DATA["Data"]
      A
      B
      C
      D
    end

    subgraph MODEL["Model"]
      E
    end

    subgraph TRAIN["Training"]
      F
      G
    end

    subgraph INFER["Inference"]
      H
      I
    end`,
        legendTitle: 'Pipeline stages',
        legend: [
          { module: 'Data', role: 'Corpus preparation: BPE tokenization, serialization into binary files, and PyTorch dataset with context/target pairs.' },
          { module: 'Model', role: 'GPT architecture: embeddings, Transformer blocks with causal attention, MLP, and logit projection.' },
          { module: 'Training', role: 'Optimization cycle: forward, loss computation, backward, AdamW step, and checkpoint saving.' },
          { module: 'Inference', role: 'Autoregressive generation: prompt → token-by-token sampling → decoding into readable text.' },
        ],
        footer: 'Each block will be implemented in a separate file, from scratch, with no external dependencies beyond PyTorch.',
      },
    },
  },
});
