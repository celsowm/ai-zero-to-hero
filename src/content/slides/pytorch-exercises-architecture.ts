import { defineSlide } from './_factory';

export const pytorchExercisesArchitecture = defineSlide({
  id: 'pytorch-exercises-architecture',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercícios: Arquitetura e nn.Module',
      body: 'Consolide o bloco de arquitetura PyTorch: projeções Linear, Embedding, forward de um mini-LM, esqueleto com ModuleDict/ModuleList, modos train/eval e passo mínimo do otimizador.',
    },
    'en-us': {
      title: 'Exercises: Architecture and nn.Module',
      body: 'Consolidate the PyTorch architecture block: Linear projections, Embedding, a mini-LM forward pass, ModuleDict/ModuleList skeletons, train/eval modes, and a minimal optimizer step.',
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Bateria 2: Módulos, Camadas e Ciclo de Execução',
        description: 'Construa e valide os contratos que aparecem em arquiteturas reais: entrada por embedding, projeção para logits, corpo empilhado e execução correta.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Excelente! Você agora sabe ler e montar esqueletos de arquitetura PyTorch.',
        errorMessage: 'A arquitetura falhou. Verifique shapes, módulos, modo do modelo e ordem do update.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Linear C -> V',
            instructions: 'Crie uma camada `nn.Linear(C, V)` chamada `projection` e aplique em `x` com shape `(B,T,C)`. Salve o resultado em `logits`.',
            snippetId: 'pytorch-exercises-architecture-1',
            validators: [
              { type: 'assertVariable', variableName: 'logits_shape', expectedValue: [2, 3, 5] },
              { type: 'assertVariable', variableName: 'weight_shape', expectedValue: [5, 4] },
            ],
            hints: ['`nn.Linear` atua no último eixo.', 'O peso de `Linear(C,V)` tem shape `(V,C)`.'],
          },
          {
            id: '2. Embedding lookup',
            instructions: 'Crie uma embedding `wte = nn.Embedding(V, C)` e aplique em `idx`. O resultado `H` deve sair no contrato `(B,T,C)`.',
            snippetId: 'pytorch-exercises-architecture-2',
            validators: [
              { type: 'assertVariable', variableName: 'H_shape', expectedValue: [2, 3, 4] },
              { type: 'assertVariable', variableName: 'embedding_weight_shape', expectedValue: [10, 4] },
            ],
            hints: ['Embedding recebe IDs `torch.long`.', 'A tabela de embedding tem shape `(V,C)`.'],
          },
          {
            id: '3. Mini-LM forward',
            instructions: 'Complete `TinyLM`: `wte` deve transformar `idx` em `H`, e `lm_head` deve transformar `H` em `logits` no shape `(B,T,V)`.',
            snippetId: 'pytorch-exercises-architecture-3',
            validators: [
              { type: 'assertVariable', variableName: 'is_module', expectedValue: true },
              { type: 'assertVariable', variableName: 'logits_shape', expectedValue: [2, 3, 11] },
            ],
            hints: ['No `__init__`: `nn.Embedding(V, C)` e `nn.Linear(C, V)`.', 'No `forward`: `H = self.wte(idx)` e depois `self.lm_head(H)`.'],
          },
          {
            id: '4. Esqueleto ModuleDict/ModuleList',
            instructions: 'Monte `transformer` como `nn.ModuleDict` com `wte`, `blocks` e `lm_head`. `blocks` deve ser uma `nn.ModuleList` com `num_layers` blocos repetidos.',
            snippetId: 'pytorch-exercises-architecture-4',
            validators: [
              { type: 'assertVariable', variableName: 'is_module_dict', expectedValue: true },
              { type: 'assertVariable', variableName: 'num_blocks', expectedValue: 3 },
              { type: 'assertVariable', variableName: 'has_lm_head', expectedValue: true },
            ],
            hints: ['Use `nn.ModuleDict({...})`.', 'Dentro de `blocks`, use uma list comprehension com `nn.Sequential(...)`.'],
          },
          {
            id: '5. eval() + no_grad()',
            instructions: 'Coloque o modelo em modo de avaliação com `model.eval()`, rode o forward dentro de `torch.no_grad()` e salve `model.training` em `is_training`.',
            snippetId: 'pytorch-exercises-architecture-9',
            validators: [
              { type: 'assertVariable', variableName: 'is_training', expectedValue: false },
            ],
            hints: ['`model.eval()` troca o modo do modelo.', '`with torch.no_grad(): out = model(x)` evita construir grafo na inferência.'],
          },
          {
            id: '6. Passo mínimo do otimizador',
            instructions: 'Execute a ordem `zero_grad -> loss -> backward -> step` para aproximar `w` do alvo. Salve `updated_w` e `grad_after_backward`.',
            snippetId: 'pytorch-exercises-architecture-10',
            validators: [
              { type: 'assertVariable', variableName: 'grad_after_backward', expectedValue: -4.0, tolerance: 0.001 },
              { type: 'assertVariable', variableName: 'updated_w', expectedValue: 1.4, tolerance: 0.001 },
            ],
            hints: ['Use `loss = torch.mean((w - target) ** 2)`.', 'Depois de `loss.backward()`, `w.grad.item()` vale `-4.0`.', '`optimizer.step()` move `w` de `1.0` para `1.4` com `lr=0.1`.'],
          },
        ],
      },
      'en-us': {
        title: 'Battery 2: Modules, Layers, and Execution Lifecycle',
        description: 'Build and validate contracts used in real architectures: embedding entry, projection to logits, stacked body, and correct execution.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Excellent! You now know how to read and build PyTorch architecture skeletons.',
        errorMessage: 'Architecture failed. Check shapes, modules, model mode, and update order.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Linear C -> V',
            instructions: 'Create an `nn.Linear(C, V)` layer called `projection` and apply it to `x` with shape `(B,T,C)`. Save the result in `logits`.',
            snippetId: 'pytorch-exercises-architecture-5',
            validators: [
              { type: 'assertVariable', variableName: 'logits_shape', expectedValue: [2, 3, 5] },
              { type: 'assertVariable', variableName: 'weight_shape', expectedValue: [5, 4] },
            ],
            hints: ['`nn.Linear` acts on the last axis.', 'The weight of `Linear(C,V)` has shape `(V,C)`.'],
          },
          {
            id: '2. Embedding lookup',
            instructions: 'Create `wte = nn.Embedding(V, C)` and apply it to `idx`. The result `H` should follow the `(B,T,C)` contract.',
            snippetId: 'pytorch-exercises-architecture-6',
            validators: [
              { type: 'assertVariable', variableName: 'H_shape', expectedValue: [2, 3, 4] },
              { type: 'assertVariable', variableName: 'embedding_weight_shape', expectedValue: [10, 4] },
            ],
            hints: ['Embedding receives `torch.long` IDs.', 'The embedding table has shape `(V,C)`.'],
          },
          {
            id: '3. Mini-LM forward',
            instructions: 'Complete `TinyLM`: `wte` should map `idx` to `H`, and `lm_head` should map `H` to `logits` with shape `(B,T,V)`.',
            snippetId: 'pytorch-exercises-architecture-7',
            validators: [
              { type: 'assertVariable', variableName: 'is_module', expectedValue: true },
              { type: 'assertVariable', variableName: 'logits_shape', expectedValue: [2, 3, 11] },
            ],
            hints: ['In `__init__`: `nn.Embedding(V, C)` and `nn.Linear(C, V)`.', 'In `forward`: `H = self.wte(idx)`, then `self.lm_head(H)`.'],
          },
          {
            id: '4. ModuleDict/ModuleList skeleton',
            instructions: 'Build `transformer` as an `nn.ModuleDict` with `wte`, `blocks`, and `lm_head`. `blocks` must be an `nn.ModuleList` with `num_layers` repeated blocks.',
            snippetId: 'pytorch-exercises-architecture-8',
            validators: [
              { type: 'assertVariable', variableName: 'is_module_dict', expectedValue: true },
              { type: 'assertVariable', variableName: 'num_blocks', expectedValue: 3 },
              { type: 'assertVariable', variableName: 'has_lm_head', expectedValue: true },
            ],
            hints: ['Use `nn.ModuleDict({...})`.', 'Inside `blocks`, use a list comprehension with `nn.Sequential(...)`.'],
          },
          {
            id: '5. eval() + no_grad()',
            instructions: 'Put the model in evaluation mode with `model.eval()`, run the forward pass inside `torch.no_grad()`, and save `model.training` in `is_training`.',
            snippetId: 'pytorch-exercises-architecture-11',
            validators: [
              { type: 'assertVariable', variableName: 'is_training', expectedValue: false },
            ],
            hints: ['`model.eval()` switches the model mode.', '`with torch.no_grad(): out = model(x)` avoids graph construction during inference.'],
          },
          {
            id: '6. Minimal optimizer step',
            instructions: 'Run the order `zero_grad -> loss -> backward -> step` to move `w` toward the target. Save `updated_w` and `grad_after_backward`.',
            snippetId: 'pytorch-exercises-architecture-12',
            validators: [
              { type: 'assertVariable', variableName: 'grad_after_backward', expectedValue: -4.0, tolerance: 0.001 },
              { type: 'assertVariable', variableName: 'updated_w', expectedValue: 1.4, tolerance: 0.001 },
            ],
            hints: ['Use `loss = torch.mean((w - target) ** 2)`.', 'After `loss.backward()`, `w.grad.item()` is `-4.0`.', '`optimizer.step()` moves `w` from `1.0` to `1.4` with `lr=0.1`.'],
          },
        ],
      },
    },
  },
});
