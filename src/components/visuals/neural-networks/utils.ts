import { sw } from '../../../theme/tokens';

export const fmt = (value: number, digits = 4) => value.toFixed(digits);

export function metricRowTitle(label: string, value: string) {
  const explanations: Record<string, string> = {
    z1: 'Pre-ativacao do neuronio oculto h1.',
    z2: 'Pre-ativacao do neuronio oculto h2.',
    z3: 'Pre-ativacao do neuronio oculto h3.',
    h1: 'Ativacao sigmoid do neuronio oculto h1.',
    h2: 'Ativacao sigmoid do neuronio oculto h2.',
    h3: 'Ativacao sigmoid do neuronio oculto h3.',
    z_out: 'Soma ponderada antes da sigmoid final.',
    y_hat: 'Probabilidade prevista pela rede.',
    alvo: 'Classe correta da amostra atual.',
    target: 'Correct class for the current sample.',
    erro_out: 'Erro bruto entre previsao e alvo.',
    output_error: 'Raw difference between prediction and target.',
    loss: 'Erro quadratico da amostra atual.',
    delta_out: 'Gradiente local do neuronio de saida.',
    'delta_h[0]': 'Gradiente local do neuronio oculto h1.',
    'delta_h[1]': 'Gradiente local do neuronio oculto h2.',
    'delta_h[2]': 'Gradiente local do neuronio oculto h3.',
  };

  const explanation = explanations[label] ?? 'Valor calculado no passo atual.';
  return `${label}: ${value}\n${explanation}`;
}

export function getNodeYs(count: number, top: number, bottom: number): number[] {
  if (count === 1) {
    return [(top + bottom) / 2];
  }

  const step = (bottom - top) / (count - 1);
  return Array.from({ length: count }, (_, index) => top + step * index);
}

export function buttonStyle(border: string = sw.borderMediumStrong, background: string = sw.tintOverlay, color: string = sw.text) {
  return {
    padding: '6px 12px',
    borderRadius: 8,
    border: `1px solid ${border}`,
    background,
    color,
    fontSize: 11,
    fontWeight: 700,
    cursor: 'pointer',
  } as const;
}
