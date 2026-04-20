import React from 'react';
import type { LocalizedImageCopy } from '../../types/slide';
import { ImageLightbox } from './ImageLightbox';

interface LocalizedImageVisualProps {
  copy: LocalizedImageCopy;
}

export const LocalizedImageVisual: React.FC<LocalizedImageVisualProps> = ({ copy }) => {
  return (
    <figure
      style={{
        width: '100%',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
      }}
    >
      <ImageLightbox
        src={copy.src}
        alt={copy.alt}
        openLabel={copy.openLabel}
        closeLabel={copy.closeLabel}
      />
    </figure>
  );
};

