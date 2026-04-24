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
 * RawVisual is derived from SlideVisual — only `localized-image` differs
 * (uses AssetKey instead of resolved string for `src`).
 * Every other visual passes through unchanged.
 */
type RawVisual = SlideVisual extends infer V
  ? V extends { id: 'localized-image'; copy: Record<Language, LocalizedImageCopy> }
    ? { id: 'localized-image'; copy: Record<Language, RawLocalizedImageCopy> }
    : V
  : never;

type RawSlide = Omit<ISlide, 'visual'> & {
  visual?: RawVisual;
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

export function findSlideById(id: string): ISlide | null {
  return slidesById.get(id) ?? null;
}
