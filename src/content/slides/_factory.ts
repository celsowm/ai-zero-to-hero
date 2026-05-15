import type { ISlide, SlideVisual } from '../../types/slide/visuals';
import type { IContent, Language } from '../../types/slide/base';

interface SlideDef {
  id: string;
  type: ISlide['type'];
  content: Record<Language, IContent>;
  visual?: { id: string; copy: Record<Language, Record<string, unknown>> };
  options?: ISlide['options'];
}

export function defineSlide(def: SlideDef): ISlide {
  return {
    id: def.id,
    type: def.type,
    content: def.content,
    ...(def.visual ? { visual: def.visual as SlideVisual } : {}),
    ...(def.options ? { options: def.options } : {}),
  };
}
