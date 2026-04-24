import type { ISlide, Language, LocalizedImageCopy, SlideVisual } from '../types/slide';
import huggingFaceLogoSynthwave from '../assets/hf-logo-synthwave.svg';
import traditionalVsAiPtBr from '../assets/traditional_vs_ai_pt-br.png';
import traditionalVsAiEnUs from '../assets/traditional_vs_ai_en-us.png';
import { courseSlideOrder } from './course-outline';

// Slide asset registry
const assetRegistry = {
  huggingFaceLogoSynthwave,
  traditionalVsAiPtBr,
  traditionalVsAiEnUs,
} as const;

type AssetKey = keyof typeof assetRegistry;

type RawLocalizedImageCopy = Omit<LocalizedImageCopy, 'src'> & {
  src: AssetKey;
};

/**
 * Extract the visual copy type from the SlideVisual union for a given visual id.
 * This avoids duplicating the visual union type — it's derived from the canonical
 * SlideVisual type in types/slide/visuals.ts.
 */
type VisualCopyForId<T extends SlideVisual['id']> = Extract<SlideVisual, { id: T }>['copy'];

type RawSlide = Omit<ISlide, 'visual'> & {
  visual?:
    | { id: 'inference-diagram'; copy: VisualCopyForId<'inference-diagram'> }
    | { id: 'learning-loop-diagram'; copy: VisualCopyForId<'learning-loop-diagram'> }
    | { id: 'localized-image'; copy: Record<Language, RawLocalizedImageCopy> }
    | { id: 'machine-learning-pipeline'; copy: VisualCopyForId<'machine-learning-pipeline'> }
    | { id: 'nonlinear-regression-boundary'; copy: VisualCopyForId<'nonlinear-regression-boundary'> }
    | { id: 'nonlinear-solution-ring'; copy: VisualCopyForId<'nonlinear-solution-ring'> }
    | { id: 'api-latency-growth'; copy: VisualCopyForId<'api-latency-growth'> }
    | { id: 'linear-regression-tabs'; copy: VisualCopyForId<'linear-regression-tabs'> }
    | { id: 'python-prereq-tabs'; copy: VisualCopyForId<'python-prereq-tabs'> }
    | { id: 'python-exercise'; copy: VisualCopyForId<'python-exercise'> }
    | { id: 'neural-network-tabs-stepper'; copy: VisualCopyForId<'neural-network-tabs-stepper'> }
    | { id: 'gradient-descent-3d'; copy: VisualCopyForId<'gradient-descent-3d'> }
    | { id: 'linear-regression-notation'; copy: VisualCopyForId<'linear-regression-notation'> }
    | { id: 'linear-regression-3d-chart'; copy: VisualCopyForId<'linear-regression-3d-chart'> }
    | { id: 'progress-stepper'; copy: VisualCopyForId<'progress-stepper'> }
    | { id: 'language-modeling-diagram'; copy: VisualCopyForId<'language-modeling-diagram'> }
    | { id: 'next-token-interactive'; copy: VisualCopyForId<'next-token-interactive'> }
    | { id: 'token-size-comparison'; copy: VisualCopyForId<'token-size-comparison'> }
    | { id: 'tokenization-visualizer'; copy: VisualCopyForId<'tokenization-visualizer'> }
    | { id: 'bigram-counter'; copy: VisualCopyForId<'bigram-counter'> }
    | { id: 'softmax-visualizer'; copy: VisualCopyForId<'softmax-visualizer'> }
    | { id: 'sampling-roulette'; copy: VisualCopyForId<'sampling-roulette'> }
    | { id: 'cross-entropy-chart'; copy: VisualCopyForId<'cross-entropy-chart'> }
    | { id: 'embedding-space-3d'; copy: VisualCopyForId<'embedding-space-3d'> }
    | { id: 'context-window-slider'; copy: VisualCopyForId<'context-window-slider'> }
    | { id: 'mlp-text-diagram'; copy: VisualCopyForId<'mlp-text-diagram'> }
    | { id: 'training-loop-stepper'; copy: VisualCopyForId<'training-loop-stepper'> }
    | { id: 'neural-network-to-language-modeling-comparator'; copy: VisualCopyForId<'neural-network-to-language-modeling-comparator'> }
    | { id: 'gpt2-blackbox-diagram'; copy: VisualCopyForId<'gpt2-blackbox-diagram'> }
    | { id: 'transformer-overview-teaser'; copy: VisualCopyForId<'transformer-overview-teaser'> }
    | { id: 'parallel-prediction-diagram'; copy: VisualCopyForId<'parallel-prediction-diagram'> }
    | { id: 'positional-embedding-adder'; copy: VisualCopyForId<'positional-embedding-adder'> }
    | { id: 'transformer-block-diagram'; copy: VisualCopyForId<'transformer-block-diagram'> }
    | { id: 'causal-mask-matrix'; copy: VisualCopyForId<'causal-mask-matrix'> }
    | { id: 'qkv-cocktail-party'; copy: VisualCopyForId<'qkv-cocktail-party'> }
    | { id: 'attention-lines-diagram'; copy: VisualCopyForId<'attention-lines-diagram'> }
    | { id: 'multihead-diagram'; copy: VisualCopyForId<'multihead-diagram'> }
    | { id: 'residual-stream-highway'; copy: VisualCopyForId<'residual-stream-highway'> }
    | { id: 'attention-vs-mlp'; copy: VisualCopyForId<'attention-vs-mlp'> }
    | { id: 'unembedding-diagram'; copy: VisualCopyForId<'unembedding-diagram'> }
    | { id: 'temperature-slider-interactive'; copy: VisualCopyForId<'temperature-slider-interactive'> }
    | { id: 'gpt2-full-architecture-diagram'; copy: VisualCopyForId<'gpt2-full-architecture-diagram'> }
    | { id: 'layer-evolution-chart'; copy: VisualCopyForId<'layer-evolution-chart'> }
    | { id: 'transformer-scaling-chart'; copy: VisualCopyForId<'transformer-scaling-chart'> }
    | { id: 'neuron-architecture-animated'; copy: VisualCopyForId<'neuron-architecture-animated'> }
    | { id: 'activation-functions-comparator'; copy: VisualCopyForId<'activation-functions-comparator'> }
    | { id: 'sigmoid-deep-dive-explorer'; copy: VisualCopyForId<'sigmoid-deep-dive-explorer'> }
    | { id: 'sigmoid-derivative-explorer'; copy: VisualCopyForId<'sigmoid-derivative-explorer'> }
    | { id: 'feedforward-flow-visual'; copy: VisualCopyForId<'feedforward-flow-visual'> }
    | { id: 'backprop-signal-flow'; copy: VisualCopyForId<'backprop-signal-flow'> }
    | { id: 'neural-network-step-debugger'; copy: VisualCopyForId<'neural-network-step-debugger'> }
    | { id: 'biological-vs-computational-neuron'; copy: VisualCopyForId<'biological-vs-computational-neuron'> }
    | { id: 'architecture-comparator'; copy: VisualCopyForId<'architecture-comparator'> }
    | { id: 'linear-regression-simple-line'; copy: VisualCopyForId<'linear-regression-simple-line'> }
    | { id: 'welcome-synthwave'; copy: VisualCopyForId<'welcome-synthwave'> }
    | { id: 'hidden-states-to-logits'; copy: VisualCopyForId<'hidden-states-to-logits'> }
    | { id: 'sampling-controls'; copy: VisualCopyForId<'sampling-controls'> }
    | { id: 'prediction-evolution-we-the-people'; copy: VisualCopyForId<'prediction-evolution-we-the-people'> }
    | { id: 'why-transformers-work-so-well'; copy: VisualCopyForId<'why-transformers-work-so-well'> }
    | { id: 'road-to-mini-transformer'; copy: VisualCopyForId<'road-to-mini-transformer'> };
};

const slideModules = import.meta.glob('./slides/*.json', {
  eager: true,
}) as Record<string, { default: RawSlide }>;

function resolveAsset(assetKey: string): string {
  const resolved = assetRegistry[assetKey as AssetKey];
  if (!resolved) {
    throw new Error(`Unknown asset key "${assetKey}" in course content JSON`);
  }
  return resolved;
}

function normalizeSlide(slide: RawSlide): ISlide {
  if (slide.visual?.id !== 'localized-image') {
    return slide as ISlide;
  }

  const copy = slide.visual.copy as Record<Language, RawLocalizedImageCopy>;

  return {
    ...slide,
    visual: {
      id: 'localized-image',
      copy: {
        'pt-br': {
          ...copy['pt-br'],
          src: resolveAsset(copy['pt-br'].src),
        },
        'en-us': {
          ...copy['en-us'],
          src: resolveAsset(copy['en-us'].src),
        },
      },
    },
  };
}

const slidesById = new Map<string, ISlide>();

for (const module of Object.values(slideModules)) {
  const slide = normalizeSlide(module.default);

  if (slidesById.has(slide.id)) {
    throw new Error(`Duplicate slide id "${slide.id}" in course content`);
  }

  slidesById.set(slide.id, slide);
}

const orderedSlides = courseSlideOrder.map((slideId) => {
  const slide = slidesById.get(slideId);

  if (!slide) {
    console.error(`Slide "${slideId}" is listed in course outline but was not found in slides JSON`);
    return null;
  }

  return slide;
}).filter((slide): slide is ISlide => slide !== null);

const courseSlideIds = new Set<string>(courseSlideOrder);
const unexpectedSlides = [...slidesById.keys()].filter(slideId => !courseSlideIds.has(slideId));

if (unexpectedSlides.length > 0) {
  console.error(`Slides are not listed in course outline: ${unexpectedSlides.join(', ')}`);
}

export const courseContent: ISlide[] = orderedSlides;
