import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { X, Play, Trash2, Terminal } from 'lucide-react';
import { sw } from '../theme/tokens';
import { useUI } from '../hooks/useUI';
import { useLocale } from '../hooks/useLocale';
import { useEscapeKey } from '../hooks/useKeydown';
import { getUiMessages } from '../i18n/uiMessages';
import { runPython } from '../services/pyodideRunner';

interface OutputState {
  stdout: string;
  stderr: string;
  isRunning: boolean;
  hasRun: boolean;
}

export const CodeToolModal: React.FC = () => {
  const { isCodeToolOpen, setIsCodeToolOpen, codeToolCode, setCodeToolCode } = useUI();
  const { language } = useLocale();
  const [output, setOutput] = useState<OutputState>({
    stdout: '',
    stderr: '',
    isRunning: false,
    hasRun: false,
  });

  const handleClose = useCallback(() => {
    setIsCodeToolOpen(false);
  }, [setIsCodeToolOpen]);

  useEscapeKey(handleClose, isCodeToolOpen);

  const handleRun = async () => {
    if (!codeToolCode.trim() || output.isRunning) return;
    setOutput(prev => ({ ...prev, isRunning: true, hasRun: true }));
    const result = await runPython(codeToolCode);
    setOutput({
      stdout: result.stdout,
      stderr: result.stderr,
      isRunning: false,
      hasRun: true,
    });
  };

  const handleClear = () => {
    setOutput({ stdout: '', stderr: '', isRunning: false, hasRun: false });
  };

  if (!isCodeToolOpen) return null;

  const t = getUiMessages(language);

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Backdrop */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(5, 5, 15, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        onClick={handleClose}
      />

      {/* Modal Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          background: sw.void,
          borderRadius: '24px',
          border: `1px solid ${sw.borderActivePurple}`,
          boxShadow:
            '0 25px 70px rgba(0,0,0,0.6), 0 0 30px rgba(255, 46, 151, 0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Glow Line */}
        <div
          style={{
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${sw.pink}, ${sw.purple}, transparent)`,
          }}
        />

        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${sw.tintOverlay}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Terminal
              size={22}
              color={sw.pink}
              style={{ filter: `drop-shadow(0 0 8px rgba(255,46,151,0.5))` }}
            />
            <span
              style={{
                color: '#fff',
                fontSize: '18px',
                fontWeight: '800',
                letterSpacing: '-0.02em',
              }}
            >
              {t.codeToolTitle}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Run button */}
            <button
              onClick={handleRun}
              disabled={output.isRunning || !codeToolCode.trim()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '10px',
                border: 'none',
                background:
                  output.isRunning || !codeToolCode.trim()
                    ? 'rgba(26, 22, 40, 0.5)'
                    : `linear-gradient(135deg, ${sw.pink}, ${sw.purple})`,
                color:
                  output.isRunning || !codeToolCode.trim()
                    ? sw.textMuted
                    : '#fff',
                cursor:
                  output.isRunning || !codeToolCode.trim()
                  ? 'not-allowed'
                  : 'pointer',
                fontSize: '13px',
                fontWeight: '700',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'all 0.2s ease',
                boxShadow:
                  output.isRunning || !codeToolCode.trim()
                    ? 'none'
                    : '0 4px 20px rgba(255, 46, 151, 0.3), 0 0 40px rgba(168, 85, 247, 0.1)',
              }}
            >
              <Play size={14} />
              {output.isRunning ? t.running : t.runButton}
            </button>

            {/* Clear button */}
            <button
              onClick={handleClear}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '10px',
                border: `1px solid ${sw.tintOverlay}`,
                background: 'transparent',
                color: sw.textMuted,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title={t.clearButton}
            >
              <Trash2 size={16} />
            </button>

            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '10px',
                border: 'none',
                background: 'rgba(26, 22, 40, 0.5)',
                color: sw.textMuted,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            padding: '12px',
            borderBottom: `1px solid ${sw.tintOverlay}`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              flex: 1,
              minHeight: 0,
              borderRadius: '12px',
              overflow: 'auto',
              border: `1px solid rgba(255,255,255,0.05)`,
            }}
          >
            <CodeMirror
              value={codeToolCode}
              height="auto"
              extensions={[python()]}
              theme={vscodeDark}
              onChange={setCodeToolCode}
              basicSetup={{
                lineNumbers: true,
                highlightActiveLineGutter: true,
                highlightActiveLine: true,
                foldGutter: false,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: true,
                bracketMatching: true,
                closeBrackets: true,
                autocompletion: true,
                rectangularSelection: false,
                crosshairCursor: false,
                highlightSelectionMatches: false,
                closeBracketsKeymap: false,
                searchKeymap: false,
                foldKeymap: false,
                completionKeymap: false,
                lintKeymap: false,
              }}
              style={{
                height: '100%',
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            />
          </div>
        </div>

        {/* Output Area */}
        <div style={{ minHeight: '140px', maxHeight: '250px', display: 'flex', flexDirection: 'column' }}>
          {/* Output header */}
          <div
            style={{
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: `1px solid ${sw.tintOverlay}`,
            }}
          >
            <Terminal size={14} color={sw.cyan} />
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                color: sw.textMuted,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {t.outputTitle}
            </span>
            {output.hasRun && (
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '10px',
                  fontWeight: '700',
                  color: output.stderr ? '#ef4444' : '#22c55e',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: output.stderr
                    ? 'rgba(239, 68, 68, 0.1)'
                    : 'rgba(34, 197, 94, 0.1)',
                }}
              >
                {output.stderr ? 'ERROR' : 'OK'}
              </span>
            )}
          </div>

          {/* Output content */}
          <div
            style={{
              flex: 1,
              padding: '16px 24px',
              overflow: 'auto',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              lineHeight: 1.6,
            }}
          >
            {!output.hasRun && (
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>
                {language === 'pt-br'
                  ? 'Clique em ▶ RUN para executar o código'
                  : 'Click ▶ RUN to execute the code'}
              </span>
            )}
            {output.stdout && (
              <pre
                style={{
                  margin: 0,
                  color: '#e2e8f0',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {output.stdout}
              </pre>
            )}
            {output.stderr && (
              <pre
                style={{
                  margin: '8px 0 0',
                  color: '#ef4444',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {output.stderr}
              </pre>
            )}
          </div>
        </div>

        {/* Footer bar */}
        <div
          style={{
            padding: '12px 24px',
            background: 'rgba(0,0,0,0.3)',
            borderTop: `1px solid ${sw.tintOverlay}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '10px',
              fontWeight: '800',
              color: sw.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            <span
              style={{
                padding: '2px 6px',
                background: sw.tintOverlay,
                borderRadius: '4px',
                border: `1px solid ${sw.borderSubtle}`,
                color: sw.textDim,
                marginRight: '6px',
              }}
            >
              ESC
            </span>
            {language === 'pt-br' ? 'Fechar' : 'Close'}
          </span>
          <span
            style={{
              color: 'rgba(255, 46, 151, 0.4)',
              fontSize: '10px',
              fontWeight: '900',
              letterSpacing: '0.2em',
            }}
          >
            PYTHON 3.11
          </span>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
