import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

interface ExerciseCodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const ExerciseCodeEditor: React.FC<ExerciseCodeEditorProps> = ({ code, onChange }) => {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 0,
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <CodeMirror
        value={code}
        height="100%"
        extensions={[python()]}
        theme={vscodeDark}
        onChange={onChange}
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
          autocompletion: false,
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
          fontSize: 13,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      />
    </div>
  );
};
