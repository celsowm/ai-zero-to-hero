import React, { useState } from 'react';
import { Play, CheckCircle, Loader2, Terminal, AlertTriangle } from 'lucide-react';
import { ExerciseCodeEditor } from './ExerciseCodeEditor';

interface ExerciseEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onCheck: () => void;
  output: string;
  stderr: string;
  isRunning: boolean;
  runButtonLabel: string;
  checkButtonLabel: string;
  outputLabel: string;
}

export const ExerciseEditor: React.FC<ExerciseEditorProps> = ({
  code,
  onChange,
  onRun,
  onCheck,
  output,
  stderr,
  isRunning,
  runButtonLabel,
  checkButtonLabel,
  outputLabel,
}) => {
  const [showOutput, setShowOutput] = useState(false);
  const hasOutput = output.length > 0 || stderr.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: 12 }}>
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <ExerciseCodeEditor code={code} onChange={onChange} />
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
        <button
          type="button"
          onClick={() => {
            setShowOutput(true);
            onRun();
          }}
          disabled={isRunning}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            background: 'rgba(0, 229, 255, 0.12)',
            border: '1px solid rgba(0, 229, 255, 0.25)',
            color: 'var(--sw-cyan)',
            fontSize: 13,
            fontWeight: 700,
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.6 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
          {runButtonLabel}
        </button>

        <button
          type="button"
          onClick={() => {
            setShowOutput(true);
            onCheck();
          }}
          disabled={isRunning}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            borderRadius: 8,
            background: 'rgba(52, 211, 153, 0.12)',
            border: '1px solid rgba(52, 211, 153, 0.25)',
            color: '#34d399',
            fontSize: 13,
            fontWeight: 700,
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.6 : 1,
            transition: 'all 0.2s ease',
          }}
        >
          <CheckCircle size={14} />
          {checkButtonLabel}
        </button>
      </div>

      {(showOutput || hasOutput) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            maxHeight: 220,
            borderRadius: 8,
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255,255,255,0.05)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              fontSize: 11,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--sw-text-muted)',
              flexShrink: 0,
            }}
          >
            <Terminal size={12} />
            {outputLabel}
          </div>
          <div
            style={{
              flex: 1,
              overflow: 'auto',
              padding: 14,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              lineHeight: 1.6,
              color: 'var(--sw-text)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {output.length > 0 && <div>{output}</div>}
            {stderr.length > 0 && (
              <div style={{ color: '#f87171', marginTop: output.length > 0 ? 8 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <AlertTriangle size={12} />
                  <span style={{ fontWeight: 700 }}>Erro</span>
                </div>
                {stderr}
              </div>
            )}
            {!hasOutput && (
              <span style={{ color: 'var(--sw-text-muted)' }}>(sem saída)</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
