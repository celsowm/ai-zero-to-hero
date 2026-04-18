import React from 'react';
import { CourseProvider, useCourse } from './context/CourseContext';
import { Sidebar } from './components/Sidebar';
import { FloatingNavigation } from './components/FloatingNavigation';
import { SlideFactory } from './components/SlideFactory';

const CourseContent: React.FC = () => {
  const { currentSlide, language, currentSlideIndex, slides } = useCourse();

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: 'var(--sw-void)' }}>
      <Sidebar />

      <main className="flex-1 relative overflow-y-auto flex flex-col sw-grid-bg">
        {/* Slide counter */}
        <div className="flex items-center justify-end px-10 pt-8">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.15em',
              padding: '6px 14px',
              borderRadius: 10,
              background: 'rgba(168, 85, 247, 0.06)',
              border: '1px solid rgba(168, 85, 247, 0.1)',
            }}
          >
            <span className="glow-cyan" style={{ color: 'var(--sw-cyan)', fontSize: 14, fontWeight: 700 }}>
              {String(currentSlideIndex + 1).padStart(2, '0')}
            </span>
            <span style={{ color: 'var(--sw-purple)', opacity: 0.5 }}>/</span>
            <span style={{ color: 'var(--sw-text-muted)' }}>
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-12 py-8">
          <SlideFactory slide={currentSlide} language={language} />
        </div>

        <FloatingNavigation />
      </main>
    </div>
  );
};

function App() {
  return (
    <CourseProvider>
      <CourseContent />
    </CourseProvider>
  );
}

export default App;
