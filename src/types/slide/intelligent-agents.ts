import type { BaseVisualCopy } from './base';

// ── AgenteInAction (slide: agents-why) ─────────────────────────────────────────

export interface AgenteInActionCopy extends BaseVisualCopy {
  title: string;
  llmOnlyLabel: string;
  agentLabel: string;
  questionLabel: string;
  askButton: string;
  llmResponse: string;
  agentResponse: string;
  toolUseLabel: string;
  hallucinationWarning: string;
  groundedResult: string;
  insightTitle: string;
  insightText: string;
}

// ── AgentAnatomy (slide: agents-definition) ─────────────────────────────────────

export interface AgentAnatomyCopy extends BaseVisualCopy {
  title: string;
  subtitle: string;
  // 5 components
  perceptionLabel: string;
  perceptionDesc: string;
  memoryLabel: string;
  memoryDesc: string;
  reasoningLabel: string;
  reasoningDesc: string;
  toolsLabel: string;
  toolsDesc: string;
  actionLabel: string;
  actionDesc: string;
  // Flow
  flowTitle: string;
  inputExample: string;
  outputExample: string;
  // Insight
  insightTitle: string;
  insightText: string;
}

// ── AgentLoopVisual (slide: agent-loop) ────────────────────────────────────────

export interface AgentLoopVisualCopy extends BaseVisualCopy {
  title: string;
  subtitle: string;
  // Steps
  planLabel: string;
  planDesc: string;
  actLabel: string;
  actDesc: string;
  observeLabel: string;
  observeDesc: string;
  decideLabel: string;
  decideDesc: string;
  // Interactive example
  taskLabel: string;
  taskExample: string;
  nextButton: string;
  resetButton: string;
  completedLabel: string;
  // Step details
  step1Detail: string;
  step2Detail: string;
  step3Detail: string;
  step4Detail: string;
  // Insight
  insightTitle: string;
  insightText: string;
}

// ── AgentMemoryVisual (slide: agent-memory) ────────────────────────────────────

export interface AgentMemoryVisualCopy extends BaseVisualCopy {
  title: string;
  subtitle: string;
  // 3 memory types
  conversationalLabel: string;
  conversationalDesc: string;
  semanticLabel: string;
  semanticDesc: string;
  proceduralLabel: string;
  proceduralDesc: string;
  // Interactive demo
  sendButton: string;
  userInput: string;
  memoryUsedLabel: string;
  // Examples
  convoExample1: string;
  convoExample2: string;
  semanticExample: string;
  proceduralExample: string;
  // Insight
  insightTitle: string;
  insightText: string;
}

// ── AgentPlanningVisual (slide: agent-planning) ────────────────────────────────

export interface AgentPlanningVisualCopy extends BaseVisualCopy {
  title: string;
  subtitle: string;
  // Comparison
  withPlanningLabel: string;
  withoutPlanningLabel: string;
  // Steps
  stepLabel: string;
  // Interactive
  runButton: string;
  taskInput: string;
  // Results
  qualityLabel: string;
  stepsLabel: string;
  timeLabel: string;
  // Insight
  insightTitle: string;
  insightText: string;
}

// ── ReActFlowVisual (slide: react-pattern) ─────────────────────────────────────

export interface ReActFlowVisualCopy extends BaseVisualCopy {
  title: string;
  subtitle: string;
  // Cycle labels
  thoughtLabel: string;
  thoughtDesc: string;
  actionLabel: string;
  actionDesc: string;
  observationLabel: string;
  observationDesc: string;
  // Interactive demo
  questionInput: string;
  startButton: string;
  resetButton: string;
  // Step content (array of ReAct turns)
  turnQuestion: string;
  // Insight
  insightTitle: string;
  insightText: string;
}

// ── MultiAgentVisual (slide: multi-agent-pattern) ──────────────────────────────

export interface MultiAgentVisualCopy extends BaseVisualCopy {
  title: string;
  subtitle: string;
  // Comparison
  singleAgentLabel: string;
  multiAgentLabel: string;
  // Agents
  researcherLabel: string;
  writerLabel: string;
  reviewerLabel: string;
  // Interactive
  runButton: string;
  taskInput: string;
  // Results
  qualitySingle: string;
  qualityMulti: string;
  timeSingle: string;
  timeMulti: string;
  communicationLabel: string;
  // Insight
  insightTitle: string;
  insightText: string;
}

// ── AgentFrameworksVisual (slide: agent-frameworks) ────────────────────────────

export interface AgentFrameworksVisualCopy extends BaseVisualCopy {
  title: string;
  subtitle: string;
  // Framework levels
  fromScratchLabel: string;
  fromScratchDesc: string;
  langgraphLabel: string;
  langgraphDesc: string;
  openaiAgentsLabel: string;
  openaiAgentsDesc: string;
  pydanticaiLabel: string;
  pydanticaiDesc: string;
  // Comparison
  complexityLabel: string;
  flexibilityLabel: string;
  bestForLabel: string;
  // Interactive
  selectFramework: string;
  seeDetails: string;
  // Insight
  insightTitle: string;
  insightText: string;
}

// ── MCPVisual (slide: mcp-protocol) ────────────────────────────────────────────

export interface MCPVisualCopy extends BaseVisualCopy {
  title: string;
  subtitle: string;
  // Protocol
  clientLabel: string;
  serverLabel: string;
  toolsLabel: string;
  resourcesLabel: string;
  promptsLabel: string;
  // Interactive payload builder
  buildPayload: string;
  sendButton: string;
  responseLabel: string;
  // Example
  exampleTool: string;
  exampleToolDesc: string;
  // Insight
  insightTitle: string;
  insightText: string;
}

// ── AgentPitfallsVisual (slide: agent-best-practices) ──────────────────────────

export interface AgentPitfallsVisualCopy extends BaseVisualCopy {
  title: string;
  subtitle: string;
  // 4 pitfalls
  pitfall1Title: string;
  pitfall1Desc: string;
  pitfall1Fix: string;
  pitfall2Title: string;
  pitfall2Desc: string;
  pitfall2Fix: string;
  pitfall3Title: string;
  pitfall3Desc: string;
  pitfall3Fix: string;
  pitfall4Title: string;
  pitfall4Desc: string;
  pitfall4Fix: string;
  // Interactive
  showFix: string;
  hideFix: string;
  // Insight
  insightTitle: string;
  insightText: string;
}
