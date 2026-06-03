import { defineSlide } from './_factory';

export const llmServeProblem = defineSlide({
  id: 'llm-serve-problem',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'O problema do script mortal',
      body: `Tudo que fizemos até agora — quantização, tokenização, geração — vive em **scripts Python que morrem após uma resposta**.

1. **Startup lento:** cada script chama \`from_pretrained()\` e espera 10–30s para carregar o modelo na GPU. Isso acontece a cada execução.

2. **Sem persistência:** quando o script termina, o modelo é descarregado da VRAM. A próxima chamada refaz tudo do zero.

3. **Sem concorrência:** dois usuários simultâneos = dois processos separados carregando o mesmo modelo em paralelo → OOM.

4. **GPU ociosa:** o modelo só está ativo durante \`model.generate()\`. Todo o tempo de startup é desperdício.

### A solução

Transformar o modelo em um **serviço de longa duração**: ele carrega uma vez, fica na memória e responde a múltiplas requisições via HTTP.

> Scripts Python são ótimos para experimentação. Para qualquer coisa além disso, precisamos de um servidor.`,
    },
    'en-us': {
      title: 'The dying script problem',
      body: `Everything we've done so far — quantization, tokenization, generation — lives in **Python scripts that die after one response**.

1. **Slow startup:** every script calls \`from_pretrained()\` and waits 10–30s to load the model into GPU. This happens on every run.

2. **No persistence:** when the script exits, the model is unloaded from VRAM. The next call starts from scratch.

3. **No concurrency:** two simultaneous users = two separate processes loading the same model in parallel → OOM.

4. **Idle GPU:** the model is only active during \`model.generate()\`. All startup time is wasted.

### The solution

Turn the model into a **long-running service**: it loads once, stays in memory, and responds to multiple requests over HTTP.

> Python scripts are great for experimentation. For anything beyond that, we need a server.`,
    },
  },
  visual: {
    id: 'llm-serve-problem-visual',
    copy: {
      'pt-br': {
        title: 'Script vs Servidor: ciclo de vida do modelo',
        scriptLabel: 'Script Python',
        serverLabel: 'Servidor',
        loadLabel: 'Carrega modelo',
        inferLabel: 'Infere',
        killLabel: 'Processo morre',
        requestLabel: 'Requisição',
        idleLabel: 'Aguardando',
        scriptDesc: 'Cada request → startup de 10-30s → GPU ativa por ms → processo morre',
        serverDesc: 'Startup único → GPU pronta → N requests sem recarregar',
        wasteLabel: 'Desperdício',
        efficiencyLabel: 'Eficiência',
      },
      'en-us': {
        title: 'Script vs Server: model lifecycle',
        scriptLabel: 'Python Script',
        serverLabel: 'Server',
        loadLabel: 'Load model',
        inferLabel: 'Infer',
        killLabel: 'Process dies',
        requestLabel: 'Request',
        idleLabel: 'Waiting',
        scriptDesc: 'Each request → 10-30s startup → GPU active for ms → process dies',
        serverDesc: 'Single startup → GPU ready → N requests without reloading',
        wasteLabel: 'Waste',
        efficiencyLabel: 'Efficiency',
      },
    },
  },
});
