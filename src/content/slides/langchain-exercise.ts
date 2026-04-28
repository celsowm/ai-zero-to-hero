import { defineSlide } from './_factory';

export const langchainExercise = defineSlide({
  id: 'langchain-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercício: Fix the Bug — Chain com Parser Errado',
      body: `O chain abaixo tem um bug sutil no output parser. Execute, observe o erro, e encontre o problema.`,
    },
    'en-us': {
      title: 'Exercise: Fix the Bug — Chain with Wrong Parser',
      body: `The chain below has a subtle bug in the output parser. Run it, observe the error, and find the problem.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercício: Fix the Bug — LangChain Chain',
        description: 'Encontre e corrija o bug no output parser do LangChain.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Parabéns! Bug corrigido com sucesso!',
        errorMessage: 'Alguns testes falharam. Revise seu código.',
        hintLabel: 'Dica',
        outputLabel: 'Saída',
        exercises: [
          {
            id: '1. Parser com formato errado',
            instructions: 'O PydanticOutputParser espera um modelo Pydantic, mas está sendo passado uma string simples. Corrija criando um modelo Pydantic com \`class Answer(BaseModel)\` e passando-o ao parser.',
            starterCode: 'from langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import PydanticOutputParser\nfrom langchain_openai import ChatOpenAI\n\n# BUG: parser está esperando Pydantic mas não tem modelo!\nparser = PydanticOutputParser(pydantic_object=str)\n\nprompt = ChatPromptTemplate.from_messages([\n    ("system", "Answer the question in JSON format with fields: name, answer"),\n    ("human", "{question}"),\n])\n\nmodel = ChatOpenAI(model="gpt-4o-mini")\n\nchain = prompt | model | parser\nresult = chain.invoke({"question": "What is the capital of Brazil?"})\nprint(f"Result type: {type(result)}")\nprint(f"Result: {result}")',
            validators: [
              {
                type: 'assertOutput',
                expected: 'Result type:',
              },
            ],
            hints: [
              'PydanticOutputParser precisa de um BaseModel, não str.',
              'Crie: class Answer(BaseModel): name: str; answer: str',
            ],
          },
        ],
      },
      'en-us': {
        title: 'Exercise: Fix the Bug — LangChain Chain',
        description: 'Find and fix the bug in the LangChain output parser.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Congratulations! Bug fixed successfully!',
        errorMessage: 'Some tests failed. Please review your code.',
        hintLabel: 'Hint',
        outputLabel: 'Output',
        exercises: [
          {
            id: '1. Parser with wrong format',
            instructions: 'The PydanticOutputParser expects a Pydantic model, but a plain string is being passed. Fix it by creating a Pydantic model with \`class Answer(BaseModel)\` and passing it to the parser.',
            starterCode: 'from langchain_core.prompts import ChatPromptTemplate\nfrom langchain_core.output_parsers import PydanticOutputParser\nfrom langchain_openai import ChatOpenAI\n\n# BUG: parser is expecting a Pydantic model but got str!\nparser = PydanticOutputParser(pydantic_object=str)\n\nprompt = ChatPromptTemplate.from_messages([\n    ("system", "Answer the question in JSON format with fields: name, answer"),\n    ("human", "{question}"),\n])\n\nmodel = ChatOpenAI(model="gpt-4o-mini")\n\nchain = prompt | model | parser\nresult = chain.invoke({"question": "What is the capital of Brazil?"})\nprint(f"Result type: {type(result)}")\nprint(f"Result: {result}")',
            validators: [
              {
                type: 'assertOutput',
                expected: 'Result type:',
              },
            ],
            hints: [
              'PydanticOutputParser needs a BaseModel, not str.',
              'Create: class Answer(BaseModel): name: str; answer: str',
            ],
          },
        ],
      },
    },
  },
});
