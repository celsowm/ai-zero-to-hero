import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useLocale } from '../context/LocaleContext';
import { useNavigation } from '../context/NavigationContext';
import { useUI } from '../context/UIContext';
import { Search, Command, CornerDownLeft, Hash } from 'lucide-react';
import { sw } from '../theme/tokens';
import { useSearchResults } from '../hooks/useSearchResults';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setSearchOpen } = useUI();
  const { slides, goToSlide } = useNavigation();
  const { language } = useLocale();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useSearchResults(slides, query, language);

  useEffect(() => { setSelectedIndex(0); }, [results]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isSearchOpen]);

  const handleSelect = (index: number) => {
    goToSlide(index);
    setSearchOpen(false);
  };

  useKeyboardNavigation({
    isOpen: isSearchOpen,
    results,
    selectedIndex,
    onSelect: handleSelect,
    onClose: () => setSearchOpen(false),
    setSelectedIndex,
  });

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
        background: sw.void, borderRadius: '24px',
        border: `1px solid ${sw.borderActivePurple}`,
        boxShadow: '0 25px 70px rgba(0,0,0,0.6), 0 0 30px rgba(255, 46, 151, 0.1)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column'
      }}>
        {/* Glow Line */}
        <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${sw.pink}, ${sw.purple}, transparent)` }} />

        {/* Header */}
        <div style={{ padding: '24px', borderBottom: `1px solid ${sw.tintOverlay}`, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Search size={24} color={sw.pink} style={{ filter: `drop-shadow(0 0 8px rgba(255,46,151,0.5))` }} />
          <input
            ref={inputRef}
            placeholder={language === 'pt-br' ? 'O que você quer aprender?' : 'What do you want to learn?'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#fff', fontSize: '20px', fontWeight: '600',
              fontFamily: sw.fontSans, letterSpacing: '-0.02em'
            }}
          />
          <div style={{ padding: '4px 8px', borderRadius: '6px', background: sw.tintOverlay, color: sw.textMuted, fontSize: '10px', fontWeight: '800', border: `1px solid ${sw.borderSubtle}` }}>ESC</div>
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
                      background: isSelected ? sw.tintStronger : 'transparent',
                      border: isSelected ? `1px solid ${sw.borderSubtle}` : '1px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isSelected ? sw.pink : sw.tint,
                      color: isSelected ? '#fff' : sw.textMuted,
                      boxShadow: isSelected ? '0 0 20px rgba(255,46,151,0.4)' : 'none',
                      transition: 'all 0.3s'
                    }}>
                      <Hash size={20} strokeWidth={isSelected ? 3 : 2} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: isSelected ? sw.cyan : sw.textMuted, fontFamily: sw.fontMono }}>#{String(result.index + 1).padStart(2, '0')}</span>
                        <span style={{ color: '#fff', fontWeight: '700', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result.title}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: isSelected ? sw.tintAccent : sw.tintOverlay, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{result.preview}</p>
                    </div>

                    {isSelected && <CornerDownLeft size={16} color={sw.cyan} style={{ opacity: 0.8 }} />}
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
        <div style={{ padding: '16px 24px', background: 'rgba(0,0,0,0.3)', borderTop: `1px solid ${sw.tintOverlay}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: '800', color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <span style={{ padding: '2px 6px', background: sw.tintOverlay, borderRadius: '4px', border: `1px solid ${sw.borderSubtle}`, color: sw.textDim }}>ENTER</span> {t.select}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: '800', color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <span style={{ padding: '2px 6px', background: sw.tintOverlay, borderRadius: '4px', border: `1px solid ${sw.borderSubtle}`, color: sw.textDim }}>↑↓</span> {t.navigate}
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
