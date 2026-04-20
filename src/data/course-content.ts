import type { ISlide, Language, LocalizedImageCopy } from '../types/slide';
import traditionalVsAiPtBr from '../assets/traditional_vs_ai_pt-br.png';
import traditionalVsAiEnUs from '../assets/traditional_vs_ai_en-us.png';
import { courseSlideOrder } from './course-outline';

const assetRegistry = {
  traditionalVsAiPtBr,
  traditionalVsAiEnUs,
} as const;

type AssetKey = keyof typeof assetRegistry;

type RawLocalizedImageCopy = Omit<LocalizedImageCopy, 'src'> & {
  src: AssetKey;
};

type RawSlide = Omit<ISlide, 'visual'> & {
  visual?:
    | { id: 'inference-diagram'; copy: Record<Language, unknown> }
    | { id: 'learning-loop-diagram'; copy: Record<Language, unknown> }
    | { id: 'localized-image'; copy: Record<Language, RawLocalizedImageCopy> }
    | { id: 'machine-learning-pipeline'; copy: Record<Language, unknown> }
    | { id: 'nonlinear-regression-boundary'; copy: Record<Language, unknown> }
    | { id: 'api-latency-growth'; copy: Record<Language, unknown> }
    | { id: 'linear-regression-tabs'; copy: Record<Language, unknown> }
    | { id: 'gradient-descent-3d'; copy: Record<Language, unknown> }
    | { id: 'linear-regression-notation'; copy: Record<Language, unknown> }
    | { id: 'linear-regression-3d-chart'; copy: Record<Language, unknown> }
    | { id: 'progress-stepper'; copy: Record<Language, unknown> }
    | { id: 'language-modeling-diagram'; copy: Record<Language, unknown> }
    | { id: 'next-token-interactive'; copy: Record<Language, unknown> }
    | { id: 'token-size-comparison'; copy: Record<Language, unknown> }
    | { id: 'tokenization-visualizer'; copy: Record<Language, unknown> }
    | { id: 'bigram-counter'; copy: Record<Language, unknown> }
    | { id: 'softmax-visualizer'; copy: Record<Language, unknown> }
    | { id: 'sampling-roulette'; copy: Record<Language, unknown> }
    | { id: 'cross-entropy-chart'; copy: Record<Language, unknown> }
    | { id: 'embedding-space-3d'; copy: Record<Language, unknown> }
    | { id: 'context-window-slider'; copy: Record<Language, unknown> }
    | { id: 'mlp-text-diagram'; copy: Record<Language, unknown> }
    | { id: 'training-loop-stepper'; copy: Record<Language, unknown> }
    | { id: 'gpt2-blackbox-diagram'; copy: Record<Language, unknown> }
    | { id: 'parallel-prediction-diagram'; copy: Record<Language, unknown> }
    | { id: 'positional-embedding-adder'; copy: Record<Language, unknown> }
    | { id: 'transformer-block-diagram'; copy: Record<Language, unknown> }
    | { id: 'causal-mask-matrix'; copy: Record<Language, unknown> }
    | { id: 'qkv-cocktail-party'; copy: Record<Language, unknown> }
    | { id: 'attention-lines-diagram'; copy: Record<Language, unknown> }
    | { id: 'multihead-diagram'; copy: Record<Language, unknown> }
    | { id: 'residual-stream-highway'; copy: Record<Language, unknown> }
    | { id: 'attention-vs-mlp'; copy: Record<Language, unknown> }
    | { id: 'unembedding-diagram'; copy: Record<Language, unknown> }
    | { id: 'temperature-slider-interactive'; copy: Record<Language, unknown> }
    | { id: 'gpt2-full-architecture-diagram'; copy: Record<Language, unknown> }
    | { id: 'layer-evolution-chart'; copy: Record<Language, unknown> }
    | { id: 'transformer-scaling-chart'; copy: Record<Language, unknown> }
    | { id: 'biological-vs-computational-neuron'; copy: Record<Language, unknown> };
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
    throw new Error(`Slide "${slideId}" is listed in course outline but was not found in slides JSON`);
  }

  return slide;
});

const courseSlideIds = new Set<string>(courseSlideOrder);
const unexpectedSlides = [...slidesById.keys()].filter(slideId => !courseSlideIds.has(slideId));

if (unexpectedSlides.length > 0) {
  throw new Error(`Slides are not listed in course outline: ${unexpectedSlides.join(', ')}`);
}

export const courseContent: ISlide[] = orderedSlides;
