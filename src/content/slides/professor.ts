import { defineSlide } from './_factory';

export const professor = defineSlide({
  id: 'professor',
  type: 'markdown',
  content: {
    'pt-br': {
      title: `Sobre o Professor`,
      body: `# Celso Araujo Fontes

- MsC em Computação pelo IME-RJ
- Assessor de Inovações na PGE-RJ

Apaixonado por tecnologia e inovação, focado em transformar processos através da IA.`,
    },
    'en-us': {
      title: `About the Professor`,
      body: `# Celso Araujo Fontes

- MSc in Computing from IME-RJ
- Innovation Advisor at PGE-RJ

Passionate about technology and innovation, focused on transforming processes through AI.`,
    },
  },
});
