import type { ISlide, SlideVisual } from '../../types/slide/visuals';
import type { IContent } from '../../types/slide/base';

type Lang = 'pt-br' | 'en-us';

interface SlideDef {
  id: string;
  type: ISlide['type'];
  content: Record<Lang, IContent>;
  visual?: { id: string; copy: Record<Lang, Record<string, unknown>> };
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
