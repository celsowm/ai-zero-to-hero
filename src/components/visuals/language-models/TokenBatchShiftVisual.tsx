import React from 'react';
import type { TokenBatchShiftVisualCopy } from '../../../types/slide';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';
import { TokenBatchShiftInteractive } from './TokenBatchShiftInteractive';

interface TokenBatchShiftVisualProps {
  copy: TokenBatchShiftVisualCopy;
}

export const TokenBatchShiftVisual = React.memo(({ copy }: TokenBatchShiftVisualProps) => (
  <PytorchTabbedCodeLayout
    tabs={copy.tabs}
    codePanel={copy.codePanel}
    altPanel={<TokenBatchShiftInteractive copy={copy.interactivePanel} />}
  />
));
