import type { ISlide, Language, LocalizedImageCopy } from '../types/slide';
import traditionalVsAiPtBr from '../assets/traditional_vs_ai_pt-br.png';
import traditionalVsAiEnUs from '../assets/traditional_vs_ai_en-us.png';

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
    | { id: 'linear-regression-tabs'; copy: Record<Language, unknown> }
    | { id: 'gradient-descent-3d'; copy: Record<Language, unknown> }
    | { id: 'linear-regression-notation'; copy: Record<Language, unknown> }
    | { id: 'linear-regression-3d-chart'; copy: Record<Language, unknown> }
    | { id: 'progress-stepper'; copy: Record<Language, unknown> };
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

export const courseContent: ISlide[] = Object.entries(slideModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([, module]) => normalizeSlide(module.default));
