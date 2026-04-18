import type { ISlide } from '../types/slide';

export const courseContent: ISlide[] = [
  {
    id: 'welcome',
    type: 'markdown',
    content: {
      'pt-br': {
        title: 'Bem-vindo ao Curso de IA',
        body: '# Bem-vindo ao curso!\n\nEste é um curso interativo de Inteligência Artificial onde exploraremos desde os fundamentos até conceitos avançados.\n\nUse as setas no canto inferior direito para navegar.',
      },
      'en-us': {
        title: 'Welcome to the AI Course',
        body: '# Welcome to the course!\n\nThis is an interactive Artificial Intelligence course where we will explore everything from fundamentals to advanced concepts.\n\nUse the arrows in the bottom right corner to navigate.',
      },
    },
  },
  {
    id: 'professor',
    type: 'markdown',
    content: {
      'pt-br': {
        title: 'Sobre o Professor',
        body: '# Celso Araujo Fontes\n\n- MsC em Computação pelo IME-RJ\n- Assessor de Inovações na PGE-RJ\n\nApaixonado por tecnologia e inovação, focado em transformar processos através da IA.',
      },
      'en-us': {
        title: 'About the Professor',
        body: '# Celso Araujo Fontes\n\n- MSc in Computing from IME-RJ\n- Innovation Advisor at PGE-RJ\n\nPassionate about technology and innovation, focused on transforming processes through AI.',
      },
    },
  },
  {
    id: 'ia-definition',
    type: 'markdown',
    content: {
      'pt-br': {
        title: 'IA é Inferência',
        body: '## Inteligência Artificial é engenharia de sistemas que extraem regularidades dos dados e usam essas regularidades para produzir predições úteis.\n\nNa prática, um sistema de IA precisa de três blocos trabalhando juntos:\n1. **Dados**\n2. **Modelo**\n3. **Objetivo de otimização**\n\n> IA não é consciência nem mágica; é um mecanismo estatístico para transformar entrada em estimativa sob incerteza.',
      },
      'en-us': {
        title: 'AI is Inference',
        body: '## Artificial Intelligence is systems engineering that extracts regularities from data and uses those regularities to produce useful predictions.\n\nIn practice, an AI system needs three blocks working together:\n1. **Data**\n2. **Model**\n3. **Optimization Goal**\n\n> AI is not consciousness or magic; it is a statistical mechanism for transforming input into estimation under uncertainty.',
      },
    },
  },
  {
    id: 'ia-vs-tradicionais',
    type: 'markdown',
    content: {
      'pt-br': {
        title: 'IA vs sistemas tradicionais',
        body: '1. **Software tradicional:** regras são escritas explicitamente pelo programador.\n\n2. **IA/ML:** parâmetros são ajustados a partir de exemplos e feedback de erro.\n\n3. **Tradicional:** responde bem a casos totalmente formalizáveis; **IA:** lida melhor com padrões ambíguos.\n\n4. **Leitura correta:** um é determinístico por projeto; o outro aprende uma fronteira estatística.',
      },
      'en-us': {
        title: 'AI vs Traditional Systems',
        body: '1. **Traditional software:** rules are written explicitly by the programmer.\n\n2. **AI/ML:** parameters are adjusted from examples and error feedback.\n\n3. **Traditional:** performs well on fully formalizable cases; **AI:** handles ambiguous patterns better.\n\n4. **Correct reading:** one is deterministic by design; the other learns a statistical boundary.',
      },
    },
  },
];
