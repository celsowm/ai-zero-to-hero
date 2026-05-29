import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, GitMerge, Search, LayoutGrid, Eye } from 'lucide-react';
import { sw } from '../../../theme/tokens';
import type { MultiheadDiagramCopy } from '../../../types/slide';

interface MultiheadDiagramProps {
  copy: MultiheadDiagramCopy;
}

type DocumentId = 'D1' | 'D2';
type HeadType = 'local' | 'group' | 'question' | 'end';

interface TokenData {
  text: string;
  isPad: boolean;
}

const DOCS: Record<DocumentId, TokenData[]> = {
  D1: [
    { text: 'we', isPad: false }, { text: 'the', isPad: false }, { text: 'people', isPad: false },
    { text: 'of', isPad: false }, { text: 'usa', isPad: false }, { text: '.', isPad: false },
    { text: '<pad>', isPad: true }, { text: '<pad>', isPad: true },
  ],
  D2: [
    { text: 'are', isPad: false }, { text: 'we', isPad: false }, { text: 'the', isPad: false },
    { text: 'people', isPad: false }, { text: 'of', isPad: false }, { text: 'usa', isPad: false },
    { text: '?', isPad: false }, { text: '<pad>', isPad: true },
  ],
};

const getAttentionWeights = (docId: DocumentId, head: HeadType, targetIdx: number): number[] => {
  const tokens = DOCS[docId];
  const weights = new Array(8).fill(0);

  if (tokens[targetIdx].isPad) {
    weights[targetIdx] = 1;
    return weights;
  }

  tokens.forEach((t, i) => { if (!t.isPad) weights[i] = 0.05; });

  switch (head) {
    case 'local':
      if (targetIdx > 0 && !tokens[targetIdx - 1].isPad) weights[targetIdx - 1] += 0.3;
      weights[targetIdx] += 0.4;
      if (targetIdx < 7 && !tokens[targetIdx + 1].isPad) weights[targetIdx + 1] += 0.3;
      break;
    case 'group':
      weights[targetIdx] += 0.2;
      if (tokens[targetIdx].text === 'people') {
        const theIdx = tokens.findIndex(t => t.text === 'the');
        if (theIdx !== -1) weights[theIdx] += 0.6;
      } else if (tokens[targetIdx].text === 'usa') {
        const ofIdx = tokens.findIndex(t => t.text === 'of');
        if (ofIdx !== -1) weights[ofIdx] += 0.6;
      } else {
        weights[targetIdx] += 0.5;
      }
      break;
    case 'question': {
      const areIdx = tokens.findIndex(t => t.text === 'are');
      const qIdx = tokens.findIndex(t => t.text === '?');
      weights[targetIdx] += 0.2;
      if (areIdx !== -1) weights[areIdx] += 0.35;
      if (qIdx !== -1) weights[qIdx] += 0.35;
      if (areIdx === -1 && qIdx === -1) weights[targetIdx] += 0.7;
      break;
    }
    case 'end': {
      const dotIdx = tokens.findIndex(t => t.text === '.');
      const questIdx = tokens.findIndex(t => t.text === '?');
      weights[targetIdx] += 0.1;
      if (dotIdx !== -1) weights[dotIdx] += 0.8;
      if (questIdx !== -1) weights[questIdx] += 0.8;
      break;
    }
  }

  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map(w => w / sum);
};

export const MultiheadDiagram = React.memo(({ copy }: MultiheadDiagramProps) => {
  const [activeTab, setActiveTab] = useState<'shapes' | 'attention' | 'pipeline'>('attention');
  const [activeDoc, setActiveDoc] = useState<DocumentId>('D1');
  const [activeHead, setActiveHead] = useState<HeadType>('local');
  const [selectedTokenIdx, setSelectedTokenIdx] = useState<number>(2);
  const [attentionWeights, setAttentionWeights] = useState<number[]>([]);

  useEffect(() => {
    setSelectedTokenIdx(activeDoc === 'D1' ? 2 : 3);
  }, [activeDoc]);

  useEffect(() => {
    setAttentionWeights(getAttentionWeights(activeDoc, activeHead, selectedTokenIdx));
  }, [activeDoc, activeHead, selectedTokenIdx]);

  const FS = '13px';
  const FSLG = '15px';
  const FSSM = '11px';

  const btnBase: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 14px',
    borderRadius: 8,
    fontSize: FS,
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    transition: sw.transitionFast,
    fontFamily: sw.fontSans,
  };

  const tabBtn = (active: boolean): React.CSSProperties => ({
    ...btnBase,
    background: active ? sw.pink : 'transparent',
    color: active ? '#fff' : sw.textMuted,
  });

  const docBtn = (active: boolean): React.CSSProperties => ({
    ...btnBase,
    background: active ? sw.cyan : 'transparent',
    color: active ? '#000' : sw.textMuted,
    fontWeight: 800,
    minWidth: 40,
    justifyContent: 'center',
  });

  const headBtn = (active: boolean): React.CSSProperties => ({
    ...btnBase,
    background: active ? sw.purple : 'transparent',
    color: active ? '#fff' : sw.textMuted,
    fontWeight: 700,
    fontSize: FSSM,
  });

  const insightText = () => {
    if (activeHead === 'local') return copy.insightLocal;
    if (activeHead === 'group') return copy.insightGroup;
    if (activeHead === 'question' && activeDoc === 'D2') return copy.insightQuestionYes;
    if (activeHead === 'question' && activeDoc === 'D1') return copy.insightQuestionNo;
    if (activeHead === 'end') return copy.insightEnd;
    return '';
  };

  const HEAD_LABELS: Record<HeadType, string> = {
    local: copy.headLocal,
    group: copy.headGroup,
    question: copy.headQuestion,
    end: copy.headEnd,
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      {/* Header */}
      <div style={{
        padding: 16,
        background: sw.panelBackground,
        borderRadius: 16,
        border: sw.panelBorder,
        boxShadow: sw.panelShadow,
        marginBottom: 12,
        flexShrink: 0,
      }}>
        {/* Tab navigation */}
        <div style={{ display: 'flex', gap: 4, background: sw.tintStrong, padding: 3, borderRadius: 10, width: 'fit-content' }}>
          <button style={tabBtn(activeTab === 'shapes')} onClick={() => setActiveTab('shapes')}>
            <LayoutGrid size={14} />
            <span>1. {copy.shapesTab}</span>
          </button>
          <button style={tabBtn(activeTab === 'attention')} onClick={() => setActiveTab('attention')}>
            <Eye size={14} />
            <span>2. {copy.attentionTab}</span>
          </button>
          <button style={tabBtn(activeTab === 'pipeline')} onClick={() => setActiveTab('pipeline')}>
            <GitMerge size={14} />
            <span>3. {copy.pipelineTab}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: sw.panelBackground,
        borderRadius: 16,
        border: sw.panelBorder,
        boxShadow: sw.panelShadow,
        padding: 16,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* TAB: SHAPES */}
        {activeTab === 'shapes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: sw.cyan, margin: 0 }}>
              {copy.shapeExplanation}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ background: sw.tintStrong, borderRadius: 12, padding: 18, border: `1px solid ${sw.borderSubtle}` }}>
                <div style={{ fontFamily: sw.fontMono, fontSize: FS, color: sw.green, marginBottom: 10 }}>
                  D1 = we the people of usa .<br />
                  D2 = are we the people of usa ?
                </div>
                <div style={{
                  background: sw.surface,
                  borderRadius: 10,
                  padding: 14,
                  border: `1px solid ${sw.borderActiveCyan}`,
                }}>
                  <div style={{ fontSize: FSSM, fontWeight: 800, color: sw.cyan, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Tensor X
                  </div>
                  <div style={{ fontFamily: sw.fontMono, fontSize: '16px', lineHeight: 1.8 }}>
                    X.shape = (B, T, C)<br />
                    X.shape = (2, 8, 768)
                  </div>
                  <div style={{ fontSize: FS, color: sw.textDim, marginTop: 8, lineHeight: 1.6 }}>
                    <strong style={{ color: sw.yellow }}>B = 2</strong>: documentos no batch<br />
                    <strong style={{ color: sw.pink }}>T = 8</strong>: posições por documento<br />
                    <strong style={{ color: sw.purple }}>C = 768</strong>: números no vetor de cada token
                  </div>
                </div>
              </div>
              <div style={{ background: sw.tintStrong, borderRadius: 12, padding: 18, border: `1px solid ${sw.borderSubtle}` }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: sw.purple, margin: '0 0 12px 0' }}>A Divisão da Multi-Head</h4>
                <p style={{ fontSize: FS, color: sw.textDim, margin: '0 0 12px 0', lineHeight: 1.5 }}>
                  Em vez de uma única matriz gigante, dividimos <span style={{ fontFamily: sw.fontMono, color: sw.purple }}>C=768</span> em 12 subespaços:
                </p>
                <div style={{
                  background: sw.surface,
                  borderRadius: 8,
                  padding: 14,
                  fontFamily: sw.fontMono,
                  fontSize: '16px',
                  textAlign: 'center',
                  marginBottom: 12,
                  border: `1px solid ${sw.borderSubtle}`,
                }}>
                  768 = 12 heads × 64 dimensões
                </div>
                <p style={{ fontSize: FS, color: sw.textDim, margin: '0 0 8px 0' }}>Os tensores Q, K e V são remodelados:</p>
                <div style={{
                  fontFamily: sw.fontMono,
                  fontSize: '15px',
                  background: sw.surface,
                  borderRadius: 8,
                  padding: 10,
                  border: `1px solid ${sw.borderSubtle}`,
                  lineHeight: 1.8,
                }}>
                  <span style={{ color: sw.textMuted, textDecoration: 'line-through' }}>(2, 8, 768)</span><br />
                  <span style={{ color: sw.purple }}>→ (2, 12, 8, 64)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ATTENTION EXPLORER */}
        {activeTab === 'attention' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            {/* Controls */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              alignItems: 'center',
              borderBottom: `1px solid ${sw.borderSubtle}`,
              paddingBottom: 12,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: FSSM, fontWeight: 800, color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Documento</span>
                <div style={{ display: 'flex', gap: 2, background: sw.surface, padding: 2, borderRadius: 8 }}>
                  {(['D1', 'D2'] as DocumentId[]).map(doc => (
                    <button key={doc} style={docBtn(activeDoc === doc)} onClick={() => setActiveDoc(doc)}>{doc}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
                <span style={{ fontSize: FSSM, fontWeight: 800, color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Foco da Head</span>
                <div style={{ display: 'flex', gap: 2, background: sw.surface, padding: 2, borderRadius: 8, flexWrap: 'wrap' }}>
                  {(Object.entries(HEAD_LABELS) as [HeadType, string][]).map(([id, label]) => (
                    <button key={id} style={headBtn(activeHead === id)} onClick={() => setActiveHead(id)}>{label}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Attention visualization */}
            <div style={{
              flex: 1,
              background: sw.surface,
              borderRadius: 12,
              padding: 20,
              border: `1px solid ${sw.borderSubtle}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}>
              <p style={{ fontSize: FS, color: sw.textMuted, margin: 0, textAlign: 'center' }}>
                Para atualizar o token selecionado, esta Head está prestando atenção em:
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
                {DOCS[activeDoc].map((token, idx) => {
                  const weight = attentionWeights[idx];
                  const isSelected = selectedTokenIdx === idx;
                  const bgOpacity = token.isPad ? 0 : Math.max(0.05, weight);
                  const backgroundColor = `rgba(59, 130, 246, ${bgOpacity})`;

                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ fontSize: FSSM, color: sw.textMuted, fontFamily: sw.fontMono, height: 16 }}>
                        {weight > 0.05 && !token.isPad ? `${(weight * 100).toFixed(0)}%` : ''}
                      </div>
                      <button
                        onClick={() => !token.isPad && setSelectedTokenIdx(idx)}
                        disabled={token.isPad}
                        style={{
                          padding: '10px 18px',
                          borderRadius: 10,
                          fontFamily: sw.fontMono,
                          fontSize: '17px',
                          border: isSelected ? `2px solid ${sw.yellow}` : token.isPad ? `1px solid transparent` : `1px solid ${sw.borderSubtle}`,
                          cursor: token.isPad ? 'not-allowed' : 'pointer',
                          transition: sw.transitionFast,
                          opacity: token.isPad ? 0.3 : 1,
                          transform: isSelected ? 'scale(1.1)' : 'none',
                          backgroundColor,
                          color: weight > 0.3 || isSelected ? '#fff' : sw.textDim,
                          position: 'relative',
                        }}
                      >
                        {token.text}
                        {isSelected && (
                          <div style={{ position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)', color: sw.yellow }}>
                            <Search size={16} />
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Insight panel */}
            <div style={{
              padding: 14,
              background: sw.tintStrong,
              borderRadius: 10,
              border: `1px solid ${sw.borderSubtle}`,
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
              flexShrink: 0,
            }}>
              <Zap size={20} style={{ color: sw.yellow, flexShrink: 0, marginTop: 3 }} />
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 4px 0', color: sw.text }}>
                  {activeDoc === 'D1' && activeHead === 'question'
                    ? 'Atenção em contexto sem pergunta'
                    : `Avaliando: "${DOCS[activeDoc][selectedTokenIdx].text}"`}
                </h4>
                <p style={{ fontSize: FS, lineHeight: 1.6, color: sw.textDim, margin: 0 }}>
                  {insightText()}
                </p>
              </div>
            </div>

            {/* people note */}
            {DOCS[activeDoc][selectedTokenIdx].text === 'people' && (
              <div style={{
                textAlign: 'center',
                padding: 12,
                background: sw.tintAccent,
                borderRadius: 8,
                border: `1px solid ${sw.borderActiveCyan}`,
                fontSize: FS,
                color: sw.sky,
                lineHeight: 1.5,
                flexShrink: 0,
              }}>
                <strong>Exemplo do texto:</strong> {copy.peopleNote.replace('{doc}', activeDoc)}
                <div style={{ marginTop: 4, fontFamily: sw.fontMono, fontSize: FSSM }}>people_D1 ≠ people_D2</div>
              </div>
            )}
          </div>
        )}

        {/* TAB: PIPELINE */}
        {activeTab === 'pipeline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: sw.cyan, margin: 0 }}>
              {copy.pipelineTab}
            </h3>
            <p style={{ fontSize: FS, color: sw.textDim, margin: 0, textAlign: 'center', maxWidth: 450, lineHeight: 1.6 }}>
              {copy.pipelineNote}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%' }}>
              {/* 12 heads */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, width: '100%', maxWidth: 450 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{
                    background: sw.surface,
                    border: `1px solid ${sw.borderActivePurple}`,
                    borderRadius: 8,
                    padding: '8px 6px',
                    textAlign: 'center',
                    fontSize: FSSM,
                    fontFamily: sw.fontMono,
                    color: sw.purple,
                    lineHeight: 1.4,
                  }}>
                    Head {i + 1}<br />(64 dim)
                  </div>
                ))}
              </div>

              <ArrowRight size={24} style={{ color: sw.textMuted }} />

              {/* Concat */}
              <div style={{
                width: '100%',
                maxWidth: 450,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
                background: sw.tintAccent,
                border: `2px solid ${sw.borderActiveCyan}`,
                borderRadius: 12,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, rgba(0,229,255,0.06), rgba(168,85,247,0.06), rgba(0,229,255,0.06))',
                }} />
                <span style={{ fontFamily: sw.fontMono, fontWeight: 700, fontSize: '16px', color: sw.cyan, position: 'relative', zIndex: 1 }}>
                  Concat(head₁, ..., head₁₂) → 768 dimensões
                </span>
              </div>

              <ArrowRight size={24} style={{ color: sw.textMuted }} />

              {/* c_proj */}
              <div style={{
                width: '100%',
                maxWidth: 320,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 16,
                background: sw.tintAccent,
                border: `2px solid ${sw.emerald}80`,
                borderRadius: 12,
              }}>
                <span style={{ fontFamily: sw.fontMono, fontWeight: 700, fontSize: '16px', color: sw.emerald }}>
                  c_proj (Linear Layer)
                </span>
              </div>

              <ArrowRight size={24} style={{ color: sw.textMuted }} />

              {/* Residual stream */}
              <div style={{
                width: '100%',
                maxWidth: 400,
                textAlign: 'center',
                padding: 14,
                background: sw.surface,
                borderRadius: 10,
                borderBottom: `4px solid ${sw.textMuted}`,
                fontWeight: 700,
                color: sw.textDim,
                fontSize: FSLG,
              }}>
                Mistura no Residual Stream
                <div style={{ fontSize: FSSM, fontWeight: 400, marginTop: 4, color: sw.textMuted }}>
                  Segue para MLPs, ln_f e lm_head
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
