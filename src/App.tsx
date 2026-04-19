import React from 'react';
import { CourseProvider, useCourse } from './context/CourseContext';
import { FloatingNavigation, Sidebar, SlideFactory, SlideTopBar } from './components';

const CourseContent: React.FC = () => {
  const { currentSlide, language } = useCourse();

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: 'var(--sw-void)' }}>
      <Sidebar />

      <main className="flex-1 relative overflow-hidden flex flex-col sw-grid-bg min-h-0">
        <SlideTopBar />

        {/* Content */}
        <div className="flex-1 flex items-stretch justify-center px-12 py-8 min-h-0 overflow-hidden">
          <div className="w-full h-full min-h-0 flex justify-center overflow-hidden">
            <SlideFactory slide={currentSlide} language={language} />
          </div>
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
