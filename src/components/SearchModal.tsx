import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useCourse } from '../context/CourseContext';
import { Search, Command, CornerDownLeft, Hash } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen, slides, language, goToSlide } = useCourse();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const normalizedQuery = query.toLowerCase().trim();
    return slides
      .map((slide, index) => {
        const title = slide.content[language].title;
        const body = slide.content[language].body;
        if (title.toLowerCase().includes(normalizedQuery) || body.toLowerCase().includes(normalizedQuery)) {
          return { index, id: slide.id, title, preview: body.substring(0, 80) + '...' };
        }
        return null;
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);
  }, [query, slides, language]);

  useEffect(() => { setSelectedIndex(0); }, [results]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
      else if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev)); }
      else if (e.key === 'Enter' && results[selectedIndex]) handleSelect(results[selectedIndex].index);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, results, selectedIndex, setSearchOpen]);

  const handleSelect = (index: number) => {
    goToSlide(index);
    setSearchOpen(false);
  };

  if (!isSearchOpen) return null;

  const t = {
    emptyTitle: language === 'pt-br' ? 'BUSCA RÁPIDA' : 'QUICK SEARCH',
    emptyDesc: language === 'pt-br' 
      ? 'Digite o título de um tópico para pular diretamente para o conteúdo.' 
      : 'Type a topic title to jump directly to the content.',
    select: language === 'pt-br' ? 'Selecionar' : 'Select',
    navigate: language === 'pt-br' ? 'Navegar' : 'Navigate',
  };

  const modalContent = (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999999,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      paddingTop: '12vh', paddingLeft: '20px', paddingRight: '20px',
      fontFamily: "'Space Grotesk', sans-serif"
    }}>
      {/* Backdrop */}
      <div 
        style={{ position: 'absolute', inset: 0, background: 'rgba(5, 5, 15, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        onClick={() => setSearchOpen(false)}
      />

      {/* Modal Card */}
      <div style={{
        position: 'relative', width: '100%', maxWidth: '680px',
        background: 'var(--sw-void, #0b0b12)', borderRadius: '24px',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        boxShadow: '0 25px 70px rgba(0,0,0,0.6), 0 0 30px rgba(255, 46, 151, 0.1)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column'
      }}>
        {/* Glow Line */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--sw-pink, #ff2e97), var(--sw-purple, #a855f7), transparent)' }} />

        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Search size={24} color="var(--sw-pink, #ff2e97)" style={{ filter: 'drop-shadow(0 0 8px rgba(255,46,151,0.5))' }} />
          <input
            ref={inputRef}
            placeholder={language === 'pt-br' ? 'O que você quer aprender?' : 'What do you want to learn?'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontSize: '20px', fontWeight: '600',
              letterSpacing: '-0.02em'
            }}
          />
          <div style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', fontSize: '10px', fontWeight: '800', border: '1px solid rgba(255,255,255,0.1)' }}>ESC</div>
        </div>

        {/* Results Area */}
        <div style={{ maxHeight: '55vh', overflowY: 'auto', padding: '12px' }}>
          {results.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {results.map((result, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result.index)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      width: '100%', textAlign: 'left', padding: '16px', borderRadius: '16px',
                      display: 'flex', alignItems: 'center', gap: '16px', transition: 'all 0.2s',
                      background: isSelected ? 'rgba(255,255,255,0.07)' : 'transparent',
                      border: isSelected ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isSelected ? 'var(--sw-pink)' : 'rgba(255,255,255,0.03)',
                      color: isSelected ? '#fff' : 'rgba(255,255,255,0.2)',
                      boxShadow: isSelected ? '0 0 20px rgba(255,46,151,0.4)' : 'none',
                      transition: 'all 0.3s'
                    }}>
                      <Hash size={20} strokeWidth={isSelected ? 3 : 2} />
                    </div>
                    
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: isSelected ? 'var(--sw-cyan)' : 'rgba(255,255,255,0.15)', fontFamily: 'monospace' }}>#{String(result.index + 1).padStart(2, '0')}</span>
                        <span style={{ color: '#fff', fontWeight: '700', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result.title}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: isSelected ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result.preview}</p>
                    </div>

                    {isSelected && <CornerDownLeft size={16} color="var(--sw-cyan)" style={{ opacity: 0.8 }} />}
                  </button>
                );
              })}
            </div>
          ) : query.trim() ? (
            <div style={{ padding: '80px 0', textAlign: 'center', color: 'rgba(255,255,255,0.2)' }}>
              <Search size={48} style={{ marginBottom: '16px', opacity: 0.2 }} />
              <p style={{ fontWeight: '600' }}>{language === 'pt-br' ? 'Nenhum slide encontrado' : 'No slides found'}</p>
            </div>
          ) : (
            <div style={{ padding: '60px 40px', textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '30px', background: 'linear-gradient(135deg, var(--sw-pink), var(--sw-purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', margin: '0 auto 24px', boxShadow: '0 15px 35px rgba(255,46,151,0.3)' }}>
                <Search size={32} strokeWidth={3} />
              </div>
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.03em' }}>{t.emptyTitle}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', lineHeight: 1.5 }}>{t.emptyDesc}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <span style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>ENTER</span> {t.select}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: '800', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <span style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>↑↓</span> {t.navigate}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255, 46, 151, 0.4)', fontSize: '10px', fontWeight: '900', letterSpacing: '0.2em' }}>
            <Command size={12} /> AI ZERO TO HERO
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
