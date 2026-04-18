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
];
