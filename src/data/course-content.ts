import type { ISlide, Language, LocalizedImageCopy } from '../types/slide';
import huggingFaceLogoSynthwave from '../assets/hf-logo-synthwave.svg';
import traditionalVsAiPtBr from '../assets/traditional_vs_ai_pt-br.png';
import traditionalVsAiEnUs from '../assets/traditional_vs_ai_en-us.png';
import { courseSlideOrder } from './course-outline';
import { allSlides } from '../content/slides';

// Slide asset registry — slides that reference assets by key need resolution
const assetRegistry = {
  huggingFaceLogoSynthwave,
  traditionalVsAiPtBr,
  traditionalVsAiEnUs,
} as const;

type AssetKey = keyof typeof assetRegistry;

/** Resolve asset key to actual import path */
function resolveAsset(assetKey: string): string {
  const resolved = assetRegistry[assetKey as AssetKey];
  if (!resolved) {
    throw new Error(`Unknown asset key "${assetKey}" in course content`);
  }
  return resolved;
}

/** Check if a slide has a localized-image visual with unresolved asset keys */
function needsAssetResolution(slide: ISlide): slide is ISlide {
  if (slide.visual?.id !== 'localized-image') return false;
  const copy = slide.visual!.copy as Record<string, { src: string }>;
  const ptSrc = copy['pt-br']?.src;
  return typeof ptSrc === 'string' && !ptSrc.startsWith('data:') && !ptSrc.startsWith('/');
}

/** Normalize slides that have unresolved asset keys */
function normalizeSlide(slide: ISlide): ISlide {
  if (!needsAssetResolution(slide)) return slide;
  const v = slide.visual!;
  const copy = v.copy as Record<Language, { src: AssetKey } & Omit<LocalizedImageCopy, 'src'>>;
  return {
    ...slide,
    visual: {
      id: 'localized-image',
      copy: {
        'pt-br': { ...copy['pt-br'], src: resolveAsset(copy['pt-br'].src) },
        'en-us': { ...copy['en-us'], src: resolveAsset(copy['en-us'].src) },
      },
    },
  };
}

const slidesById = new Map<string, ISlide>();

for (const slide of allSlides) {
  const normalized = normalizeSlide(slide);

  if (slidesById.has(normalized.id)) {
    throw new Error(`Duplicate slide id "${normalized.id}" in course content`);
  }

  slidesById.set(normalized.id, normalized);
}

const orderedSlides = courseSlideOrder.map((slideId) => {
  const slide = slidesById.get(slideId);
  if (!slide) {
    console.error(`Slide "${slideId}" is listed in course outline but not found`);
    return null;
  }
  return slide;
}).filter((slide): slide is ISlide => slide !== null);

const courseSlideIds = new Set<string>(courseSlideOrder);
const unexpectedSlides = [...slidesById.keys()].filter(id => !courseSlideIds.has(id));

if (unexpectedSlides.length > 0) {
  console.error(`Slides not listed in course outline: ${unexpectedSlides.join(', ')}`);
}

export const courseContent: ISlide[] = orderedSlides;

export function findSlideById(id: string): ISlide | null {
  return slidesById.get(id) ?? null;
}
