# Pente-Fino Agressivo — Coerência/Coesão PyTorch + `gpt2-pytorch-*`

## Método e escala
- Eixos avaliados (1-5): `termos`, `coesao_local`, `coerencia_global`, `densidade`, `visual`, `precisao_op`.
- Severidade:
- `P0`: quebra compreensão (salto conceitual, termo não aterrissado, abstração vazia, contradição).
- `P1`: não quebra, mas reduz qualidade didática (raso, repetitivo, visual pouco instrutivo).

## Backlog por slide
| Slide | Sev | Score (T/CL/CG/D/V/P) | Diagnóstico objetivo | Texto-alvo de substituição | Ajuste visual/aba | Impacto esperado |
|---|---|---|---|---|---|---|
| `neural-network-pytorch-intro` | P1 | 4/4/4/3/3/4 | Boa ponte, mas mistura “interface industrial” com jargão sem exemplo de ganho concreto por etapa. | Explicitar “mesmo loop, nova ergonomia”: modelar, treinar, depurar, iterar. | Aba 2 virar “mapa do loop antigo vs torch” com 4 linhas causais. | Menos sensação de slogan; ponte mais operacional. |
| `neural-network-pytorch-install` | P1 | 4/4/5/3/3/5 | Conteúdo correto, mas checklist domina e faltam erros reais de ambiente (pip/venv/python mismatch com sintoma). | Incluir 2 sintomas e diagnóstico curto (`ModuleNotFoundError`, `wrong interpreter`). | Aba 2 virar “sintoma → causa → correção”. | Reduz atrito inicial e suporte ad hoc. |
| `neural-network-pytorch-hardware` | P1 | 4/4/4/3/3/4 | Bom escopo, porém ainda catálogo; falta critério de decisão CPU/MPS/CUDA com custo/benefício. | Explicar quando vale GPU e quando CPU é suficiente (debug curto vs treino). | Aba 2 com matriz “objetivo x backend recomendado”. | Melhora decisão prática sem overengineering. |
| `neural-network-pytorch-tensors` | P1 | 4/4/4/3/2/4 | A base conceitual já foi corrigida: o slide define `token` e o snippet já mostra token IDs inteiros. O gap restante é visual: falta um microfluxo texto -> tokens -> IDs -> tensor para reduzir abstração. | Acrescentar microfluxo curto: texto -> tokens -> IDs -> tensor inteiro. | Manter snippet, mas complementar com visual simples de mapeamento “token/ID/posição”. | Reforça concretude sem tratar como quebra de compreensão. |
| `pytorch-tensor-ranks-0d-4d` | P1 | 5/4/4/3/4/4 | Bom explorador, mas 4D fica abstrato para trilha LM. | Dar exemplo 4D orientado a treino (micro-batches/chunks) ou declarar claramente “fora de LM imediato”. | Painel info com “o que será usado já” vs “fica para depois”. | Evita excesso de contexto irrelevante no momento. |
| `pytorch-shapes-language-modeling` | P1 | 4/4/4/4/3/4 | O contrato de treino está claro e `logits` já foi aterrissado. O ganho restante é narrativo: conectar esse “placar” de vocabulário com a etapa posterior de escolha de token na geração. | Fechar o ciclo com uma frase extra: logits -> distribuição -> índice escolhido (argmax/sampling). | Aba 2 com mini trilha visual de um único tempo `t`. | Melhora a transição para geração, sem caracterizar falha conceitual do slide atual. |
| `pytorch-token-batch` | P1 | 5/5/5/4/5/5 | Melhorou bastante; risco residual: termo “flatten” aparece sem reforçar por que a loss exige isso. | Inserir uma frase: “cross-entropy espera lista de exemplos independentes”. | No visual interativo, badge final “pares supervisionados -> shape de loss”. | Reduz erro clássico de shape na loss. |
| `neural-network-pytorch-silicon` | P1 | 4/4/4/3/3/4 | Correto e fora do núcleo LM; pode distrair do trilho principal se ficar longo. | Compactar para “intuição de throughput”, sem aprofundar barramento/caches neste bloco. | Visual em modo “resumo 3 pontos” com link mental para performance slide. | Mantém foco sem perder contexto. |
| `pytorch-why-performant` | P1 | 4/4/4/3/4/4 | Forte no “porquê”, fraco no “quando isso muda meu código”. | Adicionar 2 exemplos: vetorizar operação e mover para device certo. | Aba extra opcional de “anti-padrões de performance”. | Converte teoria de performance em ação. |
| `pytorch-autograd` | P1 | 5/5/5/4/4/5 | Já corrigido na base conceitual; falta só exemplo de acumulação de gradiente em 2 passos. | Incluir mini caso “sem `zero_grad()` vs com `zero_grad()`”. | Aba mecânica com mini timeline de dois steps. | Evita bug recorrente de treino inicial. |
| `neural-network-pytorch-nn-linear` | P1 | 5/5/5/4/4/5 | Melhorado; ainda pode reforçar peso compartilhado por posição temporal. | Frase explícita: mesma matriz aplicada a todas posições `(B,T)`. | Mapa de shape destacar “broadcast por grade temporal”. | Consolida leitura estrutural de `Linear`. |
| `pytorch-embedding-intro` | P0 | 4/4/4/3/2/4 | Bom conceito, mas ainda falta contraste técnico entre embedding e a alternativa implícita `one-hot @ W`. Hoje o slide define bem “o que é”, mas motiva pouco “por que existe assim”. | Explicar por que embedding é lookup eficiente e treinável. | Incluir visual comparando `one-hot @ W` vs `Embedding`. | Dá motivação técnica, não só definição. |
| `pytorch-embedding-to-logits` | P1 | 4/4/5/4/4/5 | O slide já foi reposicionado corretamente como “primeiro pipeline completo de predição por posição”. O risco residual é só de redundância com `Linear`, não de foco incorreto. | Preservar o foco atual e apenas reforçar “o que cada etapa preserva/muda”. | Aba 2 enfatizar “o que cada etapa preserva/muda”. | Mantém progressão sem refazer texto que já foi corrigido. |
| `neural-network-pytorch-nn-layers` | P1 | 4/4/4/3/3/4 | A contextualização de nomes já existe: `wte` e `lm_head` estão explicados no painel de código. O ajuste restante é elevar isso de detalhe local para padrão mental de leitura de repo real. | Reforçar convenção de nomes (`wte`, `lm_head`) como padrão recorrente em modelos autoregressivos. | Aba mapa virar “leitura de código real com nomes”. | Reduz atrito ao entrar no repo GPT, sem tratar o estado atual como quebra. |
| `neural-network-pytorch-optimizers` | P1 | 4/4/5/3/3/5 | Ordem do loop está boa; falta motivo de `optimizer state` para AdamW. | Adicionar 1 frase de estado interno e impacto na retomada. | Aba 2 incluir “erro: recriar optimizer quebra dinâmica”. | Conecta com slide de checkpoint. |
| `neural-network-pytorch-model-lifecycle` | P1 | 4/4/5/3/3/5 | Correto, mas `train/eval` ainda pode soar ritual sem causa em dropout/layernorm/grad. | Explicar o que muda internamente por modo. | Tabela “modo -> efeito no forward”. | Aumenta previsibilidade mental do comportamento. |
| `neural-network-pytorch-training` | P1 | 4/4/5/4/4/5 | Bom loop, mas “targets deslocados” poderia apontar explicitamente para o slide interativo de batch. | Link narrativo direto com `pytorch-token-batch` no texto. | Aba 2 com “dependências do loop” (batch, loss, backward, step). | Amarra melhor sequência pedagógica. |
| `neural-network-pytorch-prediction` | P1 | 4/4/5/3/3/5 | Bom contraste treino/inferência; falta pequeno bloco sobre parada de geração (`EOS`/limite). | Incluir critério mínimo de stop condition. | Aba passos incluir “parada” com 2 regras. | Evita gerar sem critério e confusão em prática. |
| `pytorch-save-load` | P1 | 4/4/5/3/3/5 | Coerente, mas faltam duas estratégias: salvar só modelo vs treino completo. | Explicitar casos de uso: inferência e retomada. | Aba payload com “mínimo inferência” vs “mínimo treino”. | Reduz confusão sobre conteúdo de checkpoint. |
| `pytorch-minimal-language-model` | P1 | 4/5/5/4/4/5 | Forte; pode reforçar que é “modelo didático”, não arquitetura de produção. | Acrescentar limites claros: sem atenção, sem contexto longo. | Aba contrato com “o que falta para virar GPT”. | Previne extrapolação indevida. |
| `gpt2-pytorch-config-loading` | P0 | 3/4/4/3/2/5 | Introduz `n_head`/`n_embd` sem reapresentar o que “head” significa para quem ainda não reativou o conceito de atenção. Aqui ainda há salto conceitual real na entrada do bloco GPT. | Reaterrissar: `head = subespaço de atenção`; `D = n_embd/n_head`. | Incluir mini diagrama de divisão `C -> H x D`. | Evita salto conceitual na entrada de atenção. |
| `gpt2-pytorch-attention` | P0 | 3/4/4/4/3/5 | Denso, mas `QKV` e causal mask entram rápido demais para primeira leitura. | Inserir preâmbulo de 3 linhas: “o que Q, K, V representam operacionalmente”. | Visual de um passo temporal com máscara triangular. | Aumenta legibilidade de atenção sem perda técnica. |
| `gpt2-pytorch-mlp-block` | P1 | 4/4/5/3/3/5 | Bom papel funcional; falta conexão explícita com `nn.Linear` já ensinado. | Referenciar reaproveitamento direto do padrão `C->4C->C`. | Aba 2 mostrar paralelo “MLP GPT2 = Linear stack + GELU”. | Reforça continuidade, não “novo bloco mágico”. |
| `gpt2-pytorch-model-forward` | P1 | 4/4/5/4/3/5 | Coerente; poderia explicitar melhor diferença de retorno para treino/inferência no código real. | Destacar retorno condicional em uma frase operacional. | Aba visual com bifurcação “with targets / without targets”. | Diminui erro de chamada da API do modelo. |
| `gpt2-pytorch-lm-head-generate` | P1 | 4/4/5/3/3/5 | Boa mecânica; top-k/top-p aparece como knobs sem mostrar efeito mínimo comparativo. | Acrescentar exemplo curto de comportamento de saída por knob. | Aba 2 “controle -> efeito típico”. | Melhora uso consciente de sampling. |
| `gpt2-pytorch-e2e-debugger` | P1 | 4/5/5/4/3/5 | Forte em shape tracing; falta ordem “quando passar para debug numérico”. | Adicionar critério de saída do debug de shape para debug de valor. | Aba final “shape OK -> próximos checks numéricos”. | Torna playbook de debug mais completo. |

## Lotes de execução recomendados
### Lote 1 — P0 PyTorch base
- `pytorch-embedding-intro`

### Lote 2 — P0 `gpt2-pytorch-*`
- `gpt2-pytorch-config-loading`
- `gpt2-pytorch-attention`

### Lote 3 — P1 (elevação de qualidade)
- Todos os demais slides listados na tabela.

## Checklist de gating (aceite por slide)
- Termo novo definido localmente ou referenciado de forma explícita a slide anterior imediato.
- Snippet explica mecanismo, não apenas mostra código.
- Visual ensina causalidade, transformação de shape ou diagnóstico operacional.
- Slide responde claramente: `o que é`, `por que existe`, `como aparece no código`.

## Nota de robustez de detalhe de conteúdo
- Escala (1-5):
- `1` = raso, definição solta.
- `2` = parcial, sem fechamento operacional.
- `3` = suficiente (conceito + uso básico).
- `4` = robusto (conceito + mecanismo + erro comum).
- `5` = muito robusto (conceito + mecanismo + trade-off + diagnóstico).

| Slide | Robustez (1-5) |
|---|---|
| `neural-network-pytorch-intro` | 3 |
| `neural-network-pytorch-install` | 3 |
| `neural-network-pytorch-hardware` | 3 |
| `neural-network-pytorch-tensors` | 3 |
| `pytorch-tensor-ranks-0d-4d` | 3 |
| `pytorch-shapes-language-modeling` | 4 |
| `pytorch-token-batch` | 4 |
| `neural-network-pytorch-silicon` | 3 |
| `pytorch-why-performant` | 3 |
| `pytorch-autograd` | 4 |
| `neural-network-pytorch-nn-linear` | 4 |
| `pytorch-embedding-intro` | 2 |
| `pytorch-embedding-to-logits` | 4 |
| `neural-network-pytorch-nn-layers` | 4 |
| `neural-network-pytorch-optimizers` | 3 |
| `neural-network-pytorch-model-lifecycle` | 3 |
| `neural-network-pytorch-training` | 4 |
| `neural-network-pytorch-prediction` | 3 |
| `pytorch-save-load` | 3 |
| `pytorch-minimal-language-model` | 4 |
| `gpt2-pytorch-config-loading` | 2 |
| `gpt2-pytorch-attention` | 3 |
| `gpt2-pytorch-mlp-block` | 3 |
| `gpt2-pytorch-model-forward` | 4 |
| `gpt2-pytorch-lm-head-generate` | 3 |
| `gpt2-pytorch-e2e-debugger` | 4 |
