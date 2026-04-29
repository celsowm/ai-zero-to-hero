import React, { useState } from 'react';
import type { PromptEngineeringWhyCopy } from '../../../types/slide/prompt-engineering';
import { sw } from '../../../theme/tokens';

interface PromptEngineeringWhyProps {
  copy: PromptEngineeringWhyCopy;
}

export const PromptEngineeringWhyVisual = React.memo(({ copy }: PromptEngineeringWhyProps) => {
  const [selected, setSelected] = useState<'bad' | 'good'>('good');

  const isGood = selected === 'good';

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}>
      <h3 style={{
        margin: 0,
        fontSize: sw.fsBody,
        fontWeight: 600,
        color: sw.text,
        textAlign: 'center',
      }}>
        {copy.title}
      </h3>

      {/* Toggle buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={() => setSelected('bad')}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: `1px solid ${selected === 'bad' ? sw.pink : sw.borderSubtle}`,
            background: selected === 'bad' ? `${sw.pink}22` : 'transparent',
            color: selected === 'bad' ? sw.pink : sw.textDim,
            cursor: 'pointer',
            transition: sw.transitionFast,
            fontFamily: sw.fontSans,
            fontSize: sw.fsSmall,
            fontWeight: selected === 'bad' ? 700 : 400,
          }}
        >
          {copy.badPromptLabel}
        </button>
        <button
          onClick={() => setSelected('good')}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: `1px solid ${selected === 'good' ? sw.cyan : sw.borderSubtle}`,
            background: selected === 'good' ? `${sw.cyan}22` : 'transparent',
            color: selected === 'good' ? sw.cyan : sw.textDim,
            cursor: 'pointer',
            transition: sw.transitionFast,
            fontFamily: sw.fontSans,
            fontSize: sw.fsSmall,
            fontWeight: selected === 'good' ? 700 : 400,
          }}
        >
          {copy.goodPromptLabel}
        </button>
      </div>

      {/* Prompt card */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        border: `1px solid ${isGood ? `${sw.cyan}44` : `${sw.pink}44`}`,
        background: isGood ? `${sw.cyan}08` : `${sw.pink}08`,
        transition: sw.transitionFast,
        minHeight: '100px',
      }}>
        <p style={{
          margin: 0,
          fontSize: sw.fsSmall,
          color: isGood ? sw.cyan : sw.pink,
          fontStyle: 'italic',
          lineHeight: 1.6,
        }}>
          {isGood
            ? '"Explique gradient descent como se eu fosse um estudante de programação. Use a analogia de descer uma montanha com neblina. Inclua: (1) o que é, (2) por que é importante em ML, (3) um exemplo numérico simples com learning rate = 0.01"'
            : '"Me fala sobre gradient descent"'}
        </p>
      </div>

      {/* Arrow */}
      <div style={{ textAlign: 'center', fontSize: '24px', color: sw.textMuted }}>
        {copy.arrowLabel}
      </div>

      {/* Result card */}
      <div style={{
        padding: '20px',
        borderRadius: '12px',
        border: `1px solid ${isGood ? `${sw.green}44` : `${sw.yellow}44`}`,
        background: isGood ? `${sw.green}08` : `${sw.yellow}08`,
        transition: sw.transitionFast,
        minHeight: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{
          margin: 0,
          fontSize: sw.fsSmall,
          color: isGood ? sw.green : sw.yellow,
          textAlign: 'center',
          lineHeight: 1.6,
        }}>
          {isGood ? copy.goodResultLabel : copy.badResultLabel}
        </p>
      </div>

      {/* Quality meter */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: sw.fsSmall, color: sw.textDim }}>
          <span>{copy.specificityLabel}</span>
          <span style={{ color: isGood ? sw.green : sw.yellow }}>
            {isGood ? '████████░░' : '██░░░░░░░░'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: sw.fsSmall, color: sw.textDim }}>
          <span>{copy.qualityLabel}</span>
          <span style={{ color: isGood ? sw.green : sw.yellow }}>
            {isGood ? '█████████░' : '███░░░░░░░'}
          </span>
        </div>
      </div>
    </div>
  );
});
