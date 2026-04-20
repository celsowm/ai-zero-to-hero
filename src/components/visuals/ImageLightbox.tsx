import React, { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ImageLightboxProps {
  src: string;
  alt: string;
  openLabel?: string;
  closeLabel?: string;
  className?: string;
  maxHeight?: string;
}

const DEFAULT_OPEN_LABEL = 'Open enlarged image';
const DEFAULT_CLOSE_LABEL = 'Close enlarged image';

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  src,
  alt,
  openLabel = DEFAULT_OPEN_LABEL,
  closeLabel = DEFAULT_CLOSE_LABEL,
  className,
  maxHeight = 'min(68vh, 540px)',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        style={{
          padding: 0,
          border: 0,
          background: 'transparent',
          width: '100%',
          cursor: 'zoom-in',
        }}
      >
        <img
          src={src}
          alt={alt}
          className={className}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            maxWidth: '100%',
            maxHeight,
            objectFit: 'contain',
            borderRadius: 12,
          }}
        />
      </button>

      {isOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: 'rgba(8, 8, 16, 0.82)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
              }}
            >
              <div
                onClick={(event) => event.stopPropagation()}
                style={{
                  position: 'relative',
                  maxWidth: 'min(92vw, 1180px)',
                  maxHeight: '92vh',
                  width: 'fit-content',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <span
                    id={titleId}
                    style={{
                      color: 'var(--sw-text)',
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {alt}
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label={closeLabel}
                    style={{
                      color: 'var(--sw-text)',
                      fontSize: 14,
                      padding: '8px 12px',
                      borderRadius: 999,
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                    }}
                  >
                    {closeLabel}
                  </button>
                </div>

                <img
                  src={src}
                  alt={alt}
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: 'calc(92vh - 56px)',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: 16,
                    boxShadow: '0 24px 80px rgba(0, 0, 0, 0.45)',
                  }}
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
};

