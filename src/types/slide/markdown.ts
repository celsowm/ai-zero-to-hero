export interface MarkdownOutputCompareCopy {
  title: string;
  plainTextLabel: string;
  markdownLabel: string;
  headingExample: string;
  boldExample: string;
  codeExample: string;
  listExample: string;
  tableExample: string;
  syntaxLabel: string;
  renderLabel: string;
}

export interface MarkdownSyntaxVisualCopy {
  title: string;
  syntaxLabel: string;
  renderLabel: string;
  headingLabel: string;
  boldLabel: string;
  codeLabel: string;
  listLabel: string;
  tableLabel: string;
}

export interface JinjaIntroVisualCopy {
  title: string;
  templateLabel: string;
  renderedLabel: string;
  variableExample: string;
  variableRendered: string;
  forLoopExample: string;
  forLoopRendered: string;
  ifExample: string;
  ifRendered: string;
}

export interface JinjaChatmlPracticeVisualCopy {
  title: string;
  templateLabel: string;
  renderedLabel: string;
  messagesLabel: string;
  templateContent: string;
  renderedContent: string;
  addGenerationPromptLabel: string;
  systemMsg: string;
  userMsg: string;
}
