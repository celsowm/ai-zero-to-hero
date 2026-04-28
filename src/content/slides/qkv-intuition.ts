import { defineSlide } from './_factory';

export const qkvIntuition = defineSlide({
  id: 'qkv-intuition',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `A festa dos Tokens (Query, Key, Value)`,
      body: `Como os tokens decidem quem deve 'prestar atenção' em quem? Pense nisso como uma festa cheia de pessoas procurando quem tem as informações que elas precisam.

1. **A Pergunta (Query):** cada token emite um sinal dizendo o que ele está procurando. Ex: 'Sou um adjetivo procurando meu substantivo'.

2. **A Resposta (Key):** ao mesmo tempo, cada token carrega uma etiqueta dizendo o que ele é. Ex: 'Sou um substantivo'.

3. **A Mensagem (Value):** se a Pergunta de um token bater com a Resposta de outro, eles se conectam. O token que respondeu então envia sua mensagem (Value) para o que perguntou.

> Atenção é um sistema de busca: perguntas encontram respostas, e o significado flui entre as palavras.`,
    },
    'en-us': {
      title: `The Token Party (Query, Key, Value)`,
      body: `How do tokens decide who should 'pay attention' to whom? Think of it as a crowded party where people are looking for those who have the information they need.

1. **The Question (Query):** each token emits a signal saying what it is looking for. Ex: 'I am an adjective looking for my noun'.

2. **The Answer (Key):** at the same time, each token wears a name tag saying what it is. Ex: 'I am a noun'.

3. **The Message (Value):** if one token's Question matches another token's Answer, they connect. The answering token then sends its message (Value) to the asking one.

> Attention is a search system: queries find keys, and meaning flows between words.`,
    },
  },
  visual: {
    id: 'qkv-cocktail-party',
    copy: {
      "pt-br": {
        "queryLabel": "Query (O que eu procuro)",
        "keyLabel": "Key (O que eu sou)",
        "valueLabel": "Value (O que eu digo)"
      },
      "en-us": {
        "queryLabel": "Query (What I look for)",
        "keyLabel": "Key (What I am)",
        "valueLabel": "Value (What I say)"
      }
    },
  },
});
