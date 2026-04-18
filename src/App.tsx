import React from 'react';
import { CourseProvider, useCourse } from './context/CourseContext';
import { Sidebar } from './components/Sidebar';
import { FloatingNavigation } from './components/FloatingNavigation';
import { SlideFactory } from './components/SlideFactory';
import { SlideTopBar } from './components/SlideTopBar';

const CourseContent: React.FC = () => {
  const { currentSlide, language } = useCourse();

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: 'var(--sw-void)' }}>
      <Sidebar />

      <main className="flex-1 relative overflow-y-auto flex flex-col sw-grid-bg">
        <SlideTopBar />

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
