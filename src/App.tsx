import React from 'react';
import { CourseProvider } from './context/CourseContext';
import { useCourse } from './hooks/useCourse';
import { NavigationProvider } from './context/NavigationContext';
import { UIProvider } from './context/UIContext';
import { useUI } from './hooks/useUI';
import { LocaleProvider } from './context/LocaleContext';
import { FloatingNavigation, Sidebar, SlideFactory, SlideTopBar, SearchModal } from './components';

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
            {currentSlide && <SlideFactory slide={currentSlide} language={language} />}
          </div>
        </div>

        <FloatingNavigation />
      </main>
    </div>
  );
};

function App() {
  return (
    <NavigationProvider>
      <UIProvider>
        <LocaleProvider>
          <CourseProvider>
            <CourseContent />
            <SearchModalWithReset />
          </CourseProvider>
        </LocaleProvider>
      </UIProvider>
    </NavigationProvider>
  );
}

function SearchModalWithReset() {
  const { isSearchOpen } = useUI();
  return <SearchModal key={String(isSearchOpen)} />;
}

export default App;
