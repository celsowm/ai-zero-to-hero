import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useUI } from '../context/UIContext';
import { useLocale } from '../context/LocaleContext';
import { ChevronLeft, ChevronRight, Globe, Zap, Search, Command } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { slides, goToSlide, currentSlideIndex } = useNavigation();
  const { setSearchOpen } = useUI();
  const { language, switchLanguage } = useLocale();

  return (
    <aside
      className={`flex flex-col h-screen transition-all duration-300 ease-out flex-shrink-0 ${
        isCollapsed ? 'w-[60px]' : 'w-[260px]'
      }`}
      style={{
        background: 'var(--sw-deep)',
        borderRight: '1px solid rgba(168, 85, 247, 0.08)',
      }}
    >
      {/* Header */}
      <div className="sw-border-gradient flex items-center gap-3 px-4 h-16">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, var(--sw-pink), var(--sw-purple))',
            boxShadow: '0 4px 15px rgba(255, 46, 151, 0.25)',
          }}
        >
          <Zap size={14} color="#fff" strokeWidth={2.5} />
        </div>
        {!isCollapsed && (
          <span
            className="font-semibold text-base tracking-wide truncate"
            style={{ color: 'var(--sw-pink)' }}
          >
            AI Zero to Hero
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto w-7 h-7 rounded-md flex items-center justify-center transition-all flex-shrink-0 hover:scale-110"
          style={{ color: 'var(--sw-text-muted)' }}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Search Trigger */}
      <div className={`px-2.5 py-3 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button
          onClick={() => setSearchOpen(true)}
          className={`group flex items-center gap-3 w-full rounded-lg transition-all duration-200 border border-white/5 hover:border-sw-pink/30 hover:bg-white/5 ${
            isCollapsed ? 'h-10 w-10 justify-center' : 'px-3 py-2'
          }`}
          style={{ background: 'rgba(255, 255, 255, 0.02)' }}
        >
          <Search size={16} className="text-sw-text-muted group-hover:text-sw-pink transition-colors" />
          {!isCollapsed && (
            <div className="flex-1 flex items-center justify-between min-w-0">
              <span className="text-sm text-sw-text-muted group-hover:text-white transition-colors truncate">
                {language === 'pt-br' ? 'Buscar...' : 'Search...'}
              </span>
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-white/30 font-medium">
                <Command size={10} />
                <span>K</span>
              </div>
            </div>
          )}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2.5 space-y-1">
        {slides.map((slide, index) => {
          const isActive = currentSlideIndex === index;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`w-full text-left rounded-lg flex items-center gap-3 transition-all duration-200 ${
                isCollapsed ? 'px-2.5 py-2.5 justify-center' : 'px-3 py-2.5'
              }`}
              style={{
                background: isActive
                  ? 'linear-gradient(135deg, rgba(255, 46, 151, 0.12), rgba(168, 85, 247, 0.06))'
                  : undefined,
                boxShadow: isActive
                  ? 'inset 2px 0 0 var(--sw-pink)'
                  : undefined,
                color: isActive ? 'var(--sw-text)' : 'var(--sw-text-muted)',
              }}
            >
              <span
                className="flex-shrink-0 text-center"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  fontWeight: 500,
                  minWidth: '18px',
                  color: isActive ? 'var(--sw-cyan)' : undefined,
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              {!isCollapsed && (
                <span className="truncate text-sm font-medium leading-snug">
                  {slide.content[language].title}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2.5 py-4" style={{ borderTop: '1px solid rgba(168, 85, 247, 0.06)' }}>
        <button
          onClick={switchLanguage}
          className={`flex items-center gap-2 rounded-lg text-xs transition-all w-full ${
            isCollapsed ? 'px-2.5 py-2 justify-center' : 'px-3 py-2'
          }`}
          style={{ color: 'var(--sw-text-muted)' }}
        >
          <Globe size={15} />
          {!isCollapsed && (
            <span className="font-medium">
              {language === 'pt-br' ? 'Português (BR)' : 'English (US)'}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};
