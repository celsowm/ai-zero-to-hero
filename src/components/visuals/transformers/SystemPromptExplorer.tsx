import React, { useState, useMemo } from 'react';
import type { SystemPromptExplorerCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface SystemPromptExplorerProps {
  copy: SystemPromptExplorerCopy;
}

type SystemPreset = 'none' | 'default' | 'teacher' | 'expert' | 'concise' | 'creative';

// Simulated responses for each system prompt preset
const simulatedResponses: Record<SystemPreset, { pt: string; en: string }> = {
  none: {
    pt: 'API significa Application Programming Interface. É um conjunto de definições e protocolos que permite que diferentes sistemas de software se comuniquem entre si.',
    en: 'API stands for Application Programming Interface. It is a set of definitions and protocols that allows different software systems to communicate with each other.',
  },
  default: {
    pt: 'Uma API (Application Programming Interface) é como um intermediário que permite que diferentes programas conversem entre si. Pense nela como um garçom: você faz o pedido, o garçom leva à cozinha e traz sua comida. A API recebe sua requisição, processa e devolve a resposta.',
    en: 'An API (Application Programming Interface) is like a middleman that allows different programs to talk to each other. Think of it like a waiter: you place your order, the waiter takes it to the kitchen and brings back your food. The API receives your request, processes it, and returns the response.',
  },
  teacher: {
    pt: 'Imagine que você quer pedir uma pizza, mas não quer cozinhar. Você liga para a pizzaria — esse telefonema é a API. A API é a ponte entre você (um programa) e a pizzaria (outro programa). Ela define o que você pode pedir (cardápio), como pedir (formato) e o que receberá em troca. Em computação, APIs permitem que apps troquem dados sem saber os detalhes internos um do outro.',
    en: 'Imagine you want to order a pizza but don\'t want to cook. You call the pizza place — that phone call is the API. The API is the bridge between you (one program) and the pizza place (another program). It defines what you can order (menu), how to order (format), and what you\'ll get back. In computing, APIs allow apps to exchange data without knowing each other\'s internal details.',
  },
  expert: {
    pt: 'Uma API é um conjunto de endpoints REST (ou GraphQL/gRPC) que expõe funcionalidades de um serviço via HTTP. Define contratos de requisição/resposta usando JSON, autenticação (OAuth2, API keys), rate limiting e versionamento. Permite desacoplamento entre cliente e servidor — o servidor pode mudar a implementação interna sem afetar os consumidores, desde que o contrato da API seja mantido.',
    en: 'An API is a set of REST endpoints (or GraphQL/gRPC) that exposes service functionality over HTTP. It defines request/response contracts using JSON, authentication (OAuth2, API keys), rate limiting, and versioning. It enables decoupling between client and server — the server can change internal implementation without affecting consumers, as long as the API contract is maintained.',
  },
  concise: {
    pt: 'API (Application Programming Interface) é um conjunto de regras que permite que diferentes programas de computador se comuniquem. Ela define os métodos e formatos de dados que um programa deve usar para solicitar serviços de outro.',
    en: 'API (Application Programming Interface) is a set of rules that allows different computer programs to communicate. It defines the methods and data formats one program must use to request services from another.',
  },
  creative: {
    pt: 'Uma API é o tradutor silencioso entre dois mundos que falam línguas diferentes. É a ponte invisível que conecta o desejo do usuário à resposta do sistema — como um maestro que traduz a partitura em música. Ela não é o destino, é o caminho. Não é a resposta, é a pergunta bem formulada.',
    en: 'An API is the silent translator between two worlds speaking different languages. It\'s the invisible bridge connecting the user\'s desire to the system\'s response — like a conductor translating sheet music into sound. It is not the destination, it is the path. Not the answer, but the well-formulated question.',
  },
};

const presets: Array<{ key: SystemPreset; label: string; icon: string }> = [
  { key: 'none', label: 'Sem System', icon: '' },
  { key: 'default', label: 'Padrão', icon: '🤖' },
  { key: 'teacher', label: 'Professor', icon: '\u200d🏫' },
  { key: 'expert', label: 'Especialista', icon: '' },
  { key: 'concise', label: 'Conciso', icon: '⚡' },
  { key: 'creative', label: 'Criativo', icon: '' },
];

export const SystemPromptExplorer = React.memo(({ copy }: SystemPromptExplorerProps) => {
  const [selectedPreset, setSelectedPreset] = useState<SystemPreset>('default');

  const systemPromptText = useMemo(() => {
    if (selectedPreset === 'none') return copy.noSystemLabel;
    return copy.systemPrompts[selectedPreset];
  }, [selectedPreset, copy]);

  const responseText = useMemo(() => {
    // Detect language from the first character of user question
    const isPt = copy.userQuestion.includes('é') || copy.userQuestion.includes('ê') || copy.userQuestion.includes('í');
    return simulatedResponses[selectedPreset][isPt ? 'pt' : 'en'];
  }, [selectedPreset, copy.userQuestion]);

  const insight = useMemo(() => {
    return copy.insights[selectedPreset === 'none' ? 'default' : selectedPreset];
  }, [selectedPreset, copy.insights]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      padding: '20px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      fontFamily: "'Inter', sans-serif",
      color: '#fff',
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: 800, color: sw.cyan }}>{copy.title}</div>
        <div style={{ fontSize: '11px', color: sw.textMuted, marginTop: '4px' }}>{copy.subtitle}</div>
      </div>

      {/* Preset buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        justifyContent: 'center',
      }}>
        {presets.map((preset) => (
          <button
            key={preset.key}
            onClick={() => setSelectedPreset(preset.key)}
            style={{
              padding: '8px 14px',
              background: selectedPreset === preset.key ? `${sw.purple}33` : 'rgba(30,41,59,0.6)',
              border: `1.5px solid ${selectedPreset === preset.key ? sw.purple : sw.borderSubtle}`,
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              color: selectedPreset === preset.key ? sw.purple : sw.textMuted,
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '14px' }}>{preset.icon}</span>
            {preset.label}
          </button>
        ))}
      </div>

      {/* System prompt + Response panel */}
      <div style={{ display: 'flex', gap: '12px', flex: 1, minHeight: 0 }}>
        {/* System prompt panel */}
        <div style={{
          flex: '0.45',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: sw.purple,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            {copy.systemLabel}
          </div>
          <div style={{
            flex: 1,
            padding: '14px',
            background: selectedPreset === 'none' ? 'rgba(30,41,59,0.4)' : 'rgba(168,85,247,0.08)',
            borderRadius: '12px',
            border: `1px solid ${selectedPreset === 'none' ? sw.borderSubtle : 'rgba(168,85,247,0.3)'}`,
            fontSize: '12px',
            color: selectedPreset === 'none' ? sw.textMuted : sw.text,
            lineHeight: 1.6,
            fontStyle: selectedPreset === 'none' ? 'italic' : 'normal',
          }}>
            {systemPromptText}
          </div>
        </div>

        {/* Arrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          color: sw.textMuted,
        }}>
          →
        </div>

        {/* Response panel */}
        <div style={{
          flex: '0.55',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 700,
            color: sw.cyan,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}>
            {copy.responseLabel}
          </div>
          <div style={{
            flex: 1,
            padding: '14px',
            background: 'rgba(0,229,255,0.06)',
            borderRadius: '12px',
            border: `1px solid rgba(0,229,255,0.2)`,
            fontSize: '12px',
            color: sw.text,
            lineHeight: 1.6,
          }}>
            {responseText}
          </div>
        </div>
      </div>

      {/* User question + Insight */}
      <div style={{
        padding: '12px',
        background: 'rgba(15,23,42,0.6)',
        borderRadius: '12px',
        border: `1px solid ${sw.borderSubtle}`,
        display: 'flex',
        gap: '16px',
      }}>
        <div style={{ flex: '0.4' }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            color: sw.yellow,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '4px',
          }}>
            Pergunta do Usuário
          </div>
          <div style={{
            fontSize: '13px',
            color: sw.text,
            fontWeight: 600,
          }}>
            "{copy.userQuestion}"
          </div>
        </div>
        <div style={{
          width: '1px',
          background: sw.borderSubtle,
        }} />
        <div style={{ flex: '0.6' }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            color: sw.green,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '4px',
          }}>
            Insight
          </div>
          <div style={{
            fontSize: '11px',
            color: sw.textMuted,
            lineHeight: 1.5,
          }}>
            {insight}
          </div>
        </div>
      </div>
    </div>
  );
});
