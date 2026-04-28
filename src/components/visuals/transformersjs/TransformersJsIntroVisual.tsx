import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { TransformersJsIntroVisualCopy } from '../../../types/slide';

interface TransformersJsIntroVisualProps {
  copy: TransformersJsIntroVisualCopy;
}

export const TransformersJsIntroVisual = React.memo(({ copy }: TransformersJsIntroVisualProps) => {
  const [active, setActive] = useState<'server' | 'browser'>('browser');

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((a) => (a === 'server' ? 'browser' : 'server'));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: '100%',
      padding: '16px 12px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: sw.text }}>
        {copy.title}
      </div>

      {/* Toggle */}
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
        <span style={{
          padding: '4px 12px',
          fontSize: '10px',
          fontWeight: 700,
          borderRadius: '4px',
          background: active === 'server' ? `${sw.red}20` : 'transparent',
          color: active === 'server' ? sw.red : sw.textMuted,
          border: active === 'server' ? `1px solid ${sw.red}44` : `1px solid transparent`,
          transition: 'all 0.3s ease',
        }}>
          {copy.serverLabel}
        </span>
        <span style={{
          padding: '4px 12px',
          fontSize: '10px',
          fontWeight: 700,
          borderRadius: '4px',
          background: active === 'browser' ? `${sw.green}20` : 'transparent',
          color: active === 'browser' ? sw.green : sw.textMuted,
          border: active === 'browser' ? `1px solid ${sw.green}44` : `1px solid transparent`,
          transition: 'all 0.3s ease',
        }}>
          {copy.browserLabel}
        </span>
      </div>

      {/* Diagram */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        {/* User */}
        <div style={{
          padding: '10px 20px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '8px',
          border: `1px solid ${sw.borderSubtle}`,
          fontSize: '12px',
          fontWeight: 600,
          color: sw.text,
        }}>
          👤 {copy.userLabel}
        </div>

        <div style={{ color: sw.textMuted, fontSize: '14px' }}>↓</div>

        {/* Server path */}
        <div style={{
          width: '100%',
          padding: '12px',
          background: active === 'server' ? 'rgba(255,46,151,0.08)' : 'transparent',
          borderRadius: '10px',
          border: `1px solid ${active === 'server' ? sw.red + '33' : sw.borderSubtle}`,
          opacity: active === 'server' ? 1 : 0.3,
          transition: 'all 0.4s ease',
        }}>
          <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, color: sw.red, marginBottom: '6px' }}>
            ☁️ {copy.serverBox}
          </div>
          <div style={{
            textAlign: 'center',
            fontSize: '10px',
            color: sw.textMuted,
            padding: '4px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '4px',
          }}>
            {copy.apiLabel}
          </div>
        </div>

        <div style={{ color: sw.textMuted, fontSize: '14px' }}>ou</div>

        {/* Browser path */}
        <div style={{
          width: '100%',
          padding: '12px',
          background: active === 'browser' ? 'rgba(52,211,153,0.08)' : 'transparent',
          borderRadius: '10px',
          border: `1px solid ${active === 'browser' ? sw.green + '33' : sw.borderSubtle}`,
          opacity: active === 'browser' ? 1 : 0.3,
          transition: 'all 0.4s ease',
        }}>
          <div style={{ textAlign: 'center', fontSize: '11px', fontWeight: 700, color: sw.green, marginBottom: '6px' }}>
            🖥️ {copy.browserBox}
          </div>
          <div style={{
            textAlign: 'center',
            fontSize: '10px',
            color: sw.green,
            padding: '4px',
            background: `${sw.green}08`,
            borderRadius: '4px',
          }}>
            {copy.localLabel}
          </div>
        </div>

        {/* Comparison */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
          <div style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: active === 'server' ? `${sw.red}12` : 'transparent',
            border: `1px solid ${active === 'server' ? sw.red + '33' : sw.borderSubtle}`,
            fontSize: '10px',
            color: active === 'server' ? sw.red : sw.textMuted,
            transition: 'all 0.4s ease',
          }}>
            💰 {copy.costLabel}: $$$
          </div>
          <div style={{
            padding: '6px 12px',
            borderRadius: '6px',
            background: active === 'browser' ? `${sw.green}12` : 'transparent',
            border: `1px solid ${active === 'browser' ? sw.green + '33' : sw.borderSubtle}`,
            fontSize: '10px',
            color: active === 'browser' ? sw.green : sw.textMuted,
            transition: 'all 0.4s ease',
          }}>
            🔒 {copy.privacyLabel}: 100%
          </div>
        </div>
      </div>
    </div>
  );
});
