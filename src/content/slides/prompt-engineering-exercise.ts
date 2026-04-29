import { defineSlide } from './_factory';

export const promptEngineeringExercise = defineSlide({
  id: 'prompt-engineering-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercício: Fix the Bug — Few-Shot com Template Errado',
      body: `O few-shot prompt abaixo tem um bug: os exemplos não estão sendo formatados corretamente. Execute, observe o output, e corrija.`,
    },
    'en-us': {
      title: 'Exercise: Fix the Bug — Few-Shot with Wrong Template',
      body: `The few-shot prompt below has a bug: examples are not being formatted correctly. Run it, observe the output, and fix it.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercício: Fix the Bug — Few-Shot Prompt',
        description: 'Encontre e corrija o bug no FewShotPromptTemplate.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Parabéns! Few-shot funcionando corretamente!',
        errorMessage: 'Alguns testes falharam. Revise seu código.',
        hintLabel: 'Dica',
        outputLabel: 'Saída',
        exercises: [
          {
            id: '1. Few-shot com template errado',
            instructions: 'O FewShotPromptTemplate precisa de um ExamplePromptTemplate para formatar cada exemplo. O bug está em usar \`prompt_template\` ao invés de \`example_prompt\`. Corrija criando um \`PromptTemplate\` com input_variables=["input", "output"] e passando ao parâmetro correto.',
            starterCode: 'from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate\n\nexamples = [\n    {"input": "happy", "output": "sad"},\n    {"input": "tall", "output": "short"},\n    {"input": "bright", "output": "dark"},\n]\n\n# BUG: usando prompt_template ao invés de example_prompt!\nfew_shot = FewShotPromptTemplate(\n    examples=examples,\n    prompt_template=PromptTemplate.from_template("Input: {input}\\nOutput: {output}"),\n    suffix="Input: {input}\\nOutput:",\n    input_variables=["input"],\n)\n\nformatted = few_shot.format(input="cold")\nprint(f"Formatted prompt:\\n{formatted}")',
            validators: [
              {
                type: 'assertOutput',
                expected: 'Formatted prompt:',
              },
            ],
            hints: [
              'FewShotPromptTemplate usa \`example_prompt\`, não \`prompt_template\`.',
              'O parâmetro correto é: example_prompt=PromptTemplate(...)',
            ],
          },
        ],
      },
      'en-us': {
        title: 'Exercise: Fix the Bug — Few-Shot Prompt',
        description: 'Find and fix the bug in the FewShotPromptTemplate.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Congratulations! Few-shot working correctly!',
        errorMessage: 'Some tests failed. Please review your code.',
        hintLabel: 'Hint',
        outputLabel: 'Output',
        exercises: [
          {
            id: '1. Few-shot with wrong template',
            instructions: 'The FewShotPromptTemplate needs an ExamplePromptTemplate to format each example. The bug is using \`prompt_template\` instead of \`example_prompt\`. Fix it by creating a \`PromptTemplate\` with input_variables=["input", "output"] and passing it to the correct parameter.',
            starterCode: 'from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate\n\nexamples = [\n    {"input": "happy", "output": "sad"},\n    {"input": "tall", "output": "short"},\n    {"input": "bright", "output": "dark"},\n]\n\n# BUG: using prompt_template instead of example_prompt!\nfew_shot = FewShotPromptTemplate(\n    examples=examples,\n    prompt_template=PromptTemplate.from_template("Input: {input}\\nOutput: {output}"),\n    suffix="Input: {input}\\nOutput:",\n    input_variables=["input"],\n)\n\nformatted = few_shot.format(input="cold")\nprint(f"Formatted prompt:\\n{formatted}")',
            validators: [
              {
                type: 'assertOutput',
                expected: 'Formatted prompt:',
              },
            ],
            hints: [
              'FewShotPromptTemplate uses \`example_prompt\`, not \`prompt_template\`.',
              'The correct parameter is: example_prompt=PromptTemplate(...)',
            ],
          },
        ],
      },
    },
  },
});
