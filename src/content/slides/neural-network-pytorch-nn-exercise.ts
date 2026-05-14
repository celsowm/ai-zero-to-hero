import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnExercise = defineSlide({
  id: 'neural-network-pytorch-nn-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: `Exercício: Montando a Rede`,
      body: `Antes de treinarmos o modelo do paciente fumante, vamos praticar a construção da rede neural e prepará-la para inferência.`,
    },
    'en-us': {
      title: `Exercise: Building the Network`,
      body: `Before we train the smoker-patient model, let's practice building the neural network and preparing it for inference.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      "pt-br": {
        "title": "Exercício: PyTorch NN & Ciclo de Vida",
        "description": "Utilize os blocos de construção do PyTorch para montar e configurar redes neurais.",
        "runButtonLabel": "Executar",
        "checkButtonLabel": "Verificar",
        "successMessage": "Excelente! O modelo foi construído e configurado corretamente.",
        "errorMessage": "O modelo ou o comportamento não estão corretos. Verifique os testes.",
        "hintLabel": "Dica",
        "outputLabel": "Saída do Console",
        "exercises": [
          {
          "id": "1. Montando o LEGO (nn.Sequential)",
          "instructions": "No código ao lado, utilize `nn.Sequential` para recriar a arquitetura clássica `4 -> 16 -> 1`:\n\n1. `nn.Linear` que recebe 4 features e produz 16.\n2. Uma camada de ativação intermediária rápida (`nn.ReLU`).\n3. `nn.Linear` que pega as 16 intermediárias e esmaga para 1 (saída final).\n4. Uma ativação clássica de classificação binária (`nn.Sigmoid`).",
          "snippetId": "neural-networks/pytorch-nn-exercise-1-pt-br",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Num layers: 4\nLayer 1: Linear\nLayer 2: ReLU\nLayer 3: Linear\nLayer 4: Sigmoid"
          }
          ],
          "hints": [
            "Lembre-se de instanciar as camadas com parênteses vazios, ex: nn.ReLU().",
            "Separe os blocos por vírgula dentro do nn.Sequential(...)"
          ]
        },
          {
          "id": "2. Modo de Inferência",
          "instructions": "Seu modelo foi treinado e agora vai classificar pacientes em produção.\n\nDuas coisas não podem faltar:\n1. Desligar comportamentos exclusivos de treino (como Dropout) usando `.eval()`.\n2. Não desperdiçar memória criando históricos para os tensores, usando o contexto `torch.no_grad()`.",
          "snippetId": "neural-networks/pytorch-nn-exercise-2-pt-br",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Requires grad: False\nTraining mode: False"
          }
          ],
          "hints": [
            "Chame `model.eval()` antes de tudo.",
            "Coloque a inferência dentro de um bloco `with torch.no_grad():`"
          ]
        }
        ]
      },
      "en-us": {
        "title": "Exercise: PyTorch NN & Lifecycle",
        "description": "Use PyTorch building blocks to assemble and configure neural networks.",
        "runButtonLabel": "Run",
        "checkButtonLabel": "Check",
        "successMessage": "Excellent! The model was successfully built and configured.",
        "errorMessage": "The model architecture or behavior is incorrect. Check the tests.",
        "hintLabel": "Hint",
        "outputLabel": "Console Output",
        "exercises": [
          {
          "id": "1. Assembling the LEGO (nn.Sequential)",
          "instructions": "In the code beside, use `nn.Sequential` to recreate the classic `4 -> 16 -> 1` architecture:\n\n1. `nn.Linear` taking 4 features to 16.\n2. A fast hidden activation layer (`nn.ReLU`).\n3. `nn.Linear` squeezing the 16 hidden nodes into 1 final output.\n4. A classic binary classification activation (`nn.Sigmoid`).",
          "snippetId": "neural-networks/pytorch-nn-exercise-1-en-us",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Num layers: 4\nLayer 1: Linear\nLayer 2: ReLU\nLayer 3: Linear\nLayer 4: Sigmoid"
          }
          ],
          "hints": [
            "Remember to instantiate the layers with empty parentheses, e.g., nn.ReLU().",
            "Separate blocks with a comma inside nn.Sequential(...)"
          ]
        },
          {
          "id": "2. Inference Mode",
          "instructions": "Your model has been trained and now goes to production to classify patients.\n\nTwo things are mandatory:\n1. Disable training-only behaviors (like Dropout) using `.eval()`.\n2. Don't waste memory saving tensor history, by using the `torch.no_grad()` context manager.",
          "snippetId": "neural-networks/pytorch-nn-exercise-2-en-us",
          "validators": [
            {
            "type": "assertOutput",
            "expected": "Requires grad: False\nTraining mode: False"
          }
          ],
          "hints": [
            "Call `model.eval()` first.",
            "Put the inference inside a `with torch.no_grad():` block."
          ]
        }
        ]
      }
    },
  },
});
