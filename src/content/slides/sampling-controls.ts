import { defineSlide } from './_factory';

export const samplingControls = defineSlide({
  id: 'sampling-controls',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Controlando a criatividade (Temperatura)`,
      body: `Temos as probabilidades e sabemos rolar o dado. Mas e se quisermos que o modelo seja super exato (ex: código de programação) ou super criativo (ex: poesia)?

1. **Temperatura:** é um controle matemático aplicado ANTES do Softmax. Uma Temperatura baixa (ex: 0.1) faz as palavras mais prováveis esmagarem as outras. O modelo fica conservador e 'robótico'.

2. **Temperatura alta:** uma Temperatura alta (ex: 0.9) nivela o jogo, dando chance para palavras inusitadas aparecerem. O modelo fica mais criativo (mas pode alucinar).

3. **Top-K / Top-p:** além da temperatura, podemos simplesmente cortar fora a 'cauda longa' de palavras muito raras, garantindo que o modelo nunca escolha algo completamente absurdo.

> A Temperatura é o botão de volume entre a lógica fria e o caos criativo.`,
    },
    'en-us': {
      title: `Controlling creativity (Temperature)`,
      body: `We have the probabilities and we know how to roll the die. But what if we want the model to be super exact (e.g., code) or super creative (e.g., poetry)?

1. **Temperature:** it is a mathematical control applied BEFORE the Softmax. A low Temperature (e.g., 0.1) makes the most likely words crush the others. The model becomes conservative and 'robotic'.

2. **High Temperature:** a high Temperature (e.g., 0.9) levels the playing field, giving unusual words a chance to appear. The model becomes more creative (but might hallucinate).

3. **Top-K / Top-p:** besides temperature, we can simply chop off the 'long tail' of very rare words, ensuring the model never picks something completely absurd.

> Temperature is the volume dial between cold logic and creative chaos.`,
    },
  },
  visual: {
    id: 'temperature-slider-interactive',
    copy: {
      "pt-br": {
        "lowTemp": "Frio (Conservador)",
        "highTemp": "Quente (Criativo)"
      },
      "en-us": {
        "lowTemp": "Cold (Conservative)",
        "highTemp": "Hot (Creative)"
      }
    },
  },
});
