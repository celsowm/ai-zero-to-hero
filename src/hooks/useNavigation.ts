import type { ISlide } from '../types/slide';
import { createSafeContext } from '../context/createSafeContext';

export interface NavigationContextType {
  currentSlideIndex: number;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  goToSlide: (index: number) => void;
  slides: ISlide[];
}

export const [NavigationProviderInternal, useNavigation, NavigationContext] =
  createSafeContext<NavigationContextType>('Navigation');
