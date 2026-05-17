import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useUI } from '../hooks/useUI';
import { ChevronLeft, ChevronRight, Terminal } from 'lucide-react';
import { sw } from '../theme/tokens';
import GitHubButton from 'react-github-btn';
import { SlideCounter } from './SlideCounter';
import { FontSizeControls } from './FontSizeControls';

export const FloatingNavigation: React.FC = () => {
  const { goToNextSlide, goToPrevSlide, currentSlideIndex, slides } = useNavigation();
  const { setIsCodeToolOpen } = useUI();

  const isFirst = currentSlideIndex === 0;
  const isLast = currentSlideIndex === slides.length - 1;

  const btnBase: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    border: 'none',
    flexShrink: 0,
  };

  return (
    <footer
      className="flex w-full shrink-0 items-center justify-between pb-0"
      style={{ marginTop: 10, width: '100%' }}
      aria-label="Slide navigation"
    >
      {/* LEFT: Code Playground + GitHub Star + GitHub Follow */}
      <div className="flex items-center" style={{ gap: 14 }}>
        {/* Code Playground */}
        <button
          onClick={() => setIsCodeToolOpen(true)}
          style={{
            ...btnBase,
            padding: 0,
            background: 'rgba(26, 22, 40, 0.5)',
            color: sw.cyan,
            cursor: 'pointer',
            opacity: 0.8,
            border: `1px solid ${sw.tintOverlay}`,
          }}
          title="Code Playground"
        >
          <Terminal size={16} strokeWidth={2} />
        </button>

        {/* GitHub Star - iframe needs manual centering */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 36 }}>
          <span style={{ transform: 'translateY(4px)' }}>
            <GitHubButton
              href="https://github.com/celsowm/ai-zero-to-hero"
              data-color-scheme="no-preference: dark; light: light; dark: dark;"
              data-icon="octicon-star"
              data-size="large"
              data-show-count={true}
              aria-label="Star celsowm/ai-zero-to-hero on GitHub"
            >
              Star
            </GitHubButton>
          </span>
        </div>

        {/* GitHub Follow - iframe needs manual centering */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 36 }}>
          <span style={{ transform: 'translateY(4px)' }}>
            <GitHubButton
              href="https://github.com/celsowm"
              data-color-scheme="no-preference: dark; light: light; dark: dark;"
              data-size="large"
              data-show-count={true}
              aria-label="Follow @celsowm on GitHub"
            >
              Follow
            </GitHubButton>
          </span>
        </div>
      </div>

      {/* CENTER: Slide Counter */}
      <SlideCounter />

      {/* RIGHT: FontSizeControls + Nav arrows */}
      <div className="flex items-center" style={{ gap: 14 }}>
        <FontSizeControls />

        {/* Prev / Next */}
        <div className="inline-flex items-center" style={{ gap: 6 }}>
          <button
            onClick={goToPrevSlide}
            disabled={isFirst}
            style={{
              ...btnBase,
              padding: 0,
              background: isFirst ? 'rgba(26, 22, 40, 0.5)' : 'var(--sw-surface)',
              color: isFirst ? 'var(--sw-text-muted)' : 'var(--sw-text-dim)',
              cursor: isFirst ? 'not-allowed' : 'pointer',
              opacity: isFirst ? 0.3 : 0.8,
            }}
          >
            <ChevronLeft size={16} strokeWidth={2} />
          </button>
          <button
            onClick={goToNextSlide}
            disabled={isLast}
            style={{
              ...btnBase,
              padding: 0,
              background: isLast
                ? 'rgba(26, 22, 40, 0.5)'
                : 'linear-gradient(135deg, var(--sw-pink), var(--sw-purple))',
              color: isLast ? 'var(--sw-text-muted)' : '#fff',
              cursor: isLast ? 'not-allowed' : 'pointer',
              opacity: isLast ? 0.3 : 1,
              boxShadow: isLast
                ? 'none'
                : '0 4px 20px rgba(255, 46, 151, 0.3), 0 0 40px rgba(168, 85, 247, 0.1)',
            }}
          >
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </footer>
  );
};
