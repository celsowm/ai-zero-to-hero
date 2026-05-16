import React from 'react';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';

export const PytorchSequentialMap = React.memo(() => {
  const inputNodes = [45, 95, 145, 195];
  const hiddenNodes = [70, 120, 170];
  const outputNode = 120;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 20, padding: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flex: 1 }}>
        {/* Code side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--sw-purple)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Definição em PyTorch (OO)
          </div>
          <div style={{ 
            background: 'rgba(13, 11, 21, 0.6)', 
            borderRadius: 16, 
            border: '1px solid rgba(168, 85, 247, 0.3)',
            padding: 20,
            fontFamily: 'monospace',
            fontSize: 14,
            lineHeight: 1.6,
            color: '#e2e8f0',
            position: 'relative'
          }}>
            <div style={{ color: '#94a3b8' }}>model = nn.Sequential(</div>
            <div style={{ paddingLeft: 20, color: '#f472b6', background: 'rgba(244, 114, 182, 0.05)', borderRadius: 4 }}>
              nn.Linear(<span style={{ color: '#38bdf8' }}>4</span>, <span style={{ color: '#fb923c' }}>3</span>), <span style={{ color: '#64748b', fontSize: 12 }}># Camada Densa 1</span>
            </div>
            <div style={{ paddingLeft: 20, color: '#00e5ff', background: 'rgba(0, 229, 255, 0.05)', borderRadius: 4 }}>
              nn.ReLU(), <span style={{ color: '#64748b', fontSize: 12 }}># Ativação Oculta</span>
            </div>
            <div style={{ paddingLeft: 20, color: '#f472b6', background: 'rgba(244, 114, 182, 0.05)', borderRadius: 4 }}>
              nn.Linear(<span style={{ color: '#fb923c' }}>3</span>, <span style={{ color: '#a855f7' }}>1</span>), <span style={{ color: '#64748b', fontSize: 12 }}># Camada Densa 2</span>
            </div>
            <div style={{ paddingLeft: 20, color: '#00e5ff', background: 'rgba(0, 229, 255, 0.05)', borderRadius: 4 }}>
              nn.Sigmoid() <span style={{ color: '#64748b', fontSize: 12 }}># Ativação Saída</span>
            </div>
            <div style={{ color: '#94a3b8' }}>)</div>
          </div>

          <PanelCard minHeight={0} style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
             <div style={{ fontSize: 13, color: 'var(--sw-text-dim)', lineHeight: 1.5 }}>
               <strong>nn.Sequential</strong> é um contêiner que executa os módulos na ordem em que foram passados. É o jeito "fácil" de empilhar camadas sem escrever a lógica do <code>forward</code> manualmente.
             </div>
          </PanelCard>
        </div>

        {/* Visual side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--sw-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Arquitetura Resultante
          </div>
          <div style={{ 
            flex: 1, 
            background: 'rgba(7, 10, 18, 0.4)', 
            borderRadius: 16, 
            border: `1px solid ${sw.borderSubtle}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}>
            <svg viewBox="0 0 320 240" width="100%" height="100%">
              <defs>
                <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M 0 0 L 6 3 L 0 6 Z" fill="rgba(255,255,255,0.2)" />
                </marker>
              </defs>
              
              {/* Connections Layer 1 */}
              {inputNodes.map(y1 => hiddenNodes.map(y2 => (
                <line key={`l1-${y1}-${y2}`} x1="50" y1={y1} x2="160" y2={y2} stroke={sw.tintAccent} strokeWidth="0.5" strokeOpacity="0.3" />
              )))}

              {/* Connections Layer 2 */}
              {hiddenNodes.map(y1 => (
                <line key={`l2-${y1}`} x1="160" y1={y1} x2="270" y2={outputNode} stroke={sw.tintAccent} strokeWidth="0.5" strokeOpacity="0.3" />
              ))}

              {/* Input Nodes (4) */}
              {inputNodes.map(y => (
                <circle key={`in-${y}`} cx="50" cy={y} r="8" fill="var(--sw-cyan)" />
              ))}
              <text x="50" y="25" textAnchor="middle" fontSize="10" fill="var(--sw-cyan)" fontWeight="900">4 INPUTS</text>

              {/* Hidden Nodes (3) */}
              {hiddenNodes.map(y => (
                <circle key={`hid-${y}`} cx="160" cy={y} r="10" fill="var(--sw-blue)" stroke="rgba(255,255,255,0.2)" />
              ))}
              <rect x="150" y="210" width="20" height="20" rx="4" fill="rgba(0, 229, 255, 0.2)" stroke="var(--sw-cyan)" strokeWidth="1" />
              <text x="160" y="25" textAnchor="middle" fontSize="10" fill="var(--sw-blue)" fontWeight="900">HIDDEN (3)</text>
              <text x="160" y="225" textAnchor="middle" fontSize="8" fill="var(--sw-cyan)" fontWeight="900">ReLU</text>

              {/* Output Node (1) */}
              <circle cx="270" cy={outputNode} r="12" fill="var(--sw-purple)" stroke="white" strokeWidth="1.5" />
              <rect x="260" y="210" width="20" height="20" rx="4" fill="rgba(168, 85, 247, 0.2)" stroke="var(--sw-purple)" strokeWidth="1" />
              <text x="270" y="25" textAnchor="middle" fontSize="10" fill="var(--sw-purple)" fontWeight="900">OUTPUT (1)</text>
              <text x="270" y="225" textAnchor="middle" fontSize="8" fill="var(--sw-purple)" fontWeight="900">SIGMOID</text>

              {/* Arrows representing nn.Linear */}
              <text x="105" y="125" textAnchor="middle" fontSize="8" fill="var(--sw-pink)" fontWeight="700">nn.Linear(4, 3)</text>
              <text x="215" y="125" textAnchor="middle" fontSize="8" fill="var(--sw-pink)" fontWeight="700">nn.Linear(3, 1)</text>
            </svg>
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: 12, 
        padding: '16px 20px', 
        borderRadius: 12, 
        background: sw.tintStrong,
        border: `1px solid ${sw.borderSubtle}`,
        fontSize: 13,
        color: 'var(--sw-text-muted)'
      }}>
        <div style={{ color: 'var(--sw-pink)', fontWeight: 800 }}>Dica OO:</div>
        Cada linha como <code>nn.Linear</code> cria um <strong>Objeto</strong> com seus próprios pesos e bias internos. O <code>Sequential</code> apenas gerencia a fila de execução.
      </div>
    </div>
  );
});
