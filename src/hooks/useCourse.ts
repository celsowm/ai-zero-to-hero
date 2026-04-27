import type { Language, ISlide } from '../types/slide';
import { createSafeContext } from '../context/createSafeContext';

export interface CourseContextValue {
  currentSlide: ISlide | null;
  language: Language;
}

export const [CourseProviderInternal, useCourse, CourseContext] =
  createSafeContext<CourseContextValue>('Course');
