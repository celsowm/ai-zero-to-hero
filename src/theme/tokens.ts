/**
 * Theme tokens — single source of truth for all inline style values.
 * Maps 1:1 to CSS custom properties defined in index.css.
 *
 * Usage: import { sw } from '@/theme/tokens';
 *   style={{ background: sw.surface, border: `1px solid ${sw.borderSubtle}` }}
 */

export const sw = {
  // ── Backgrounds ──
  void: '#0b0b12',
  deep: '#100e1a',
  surface: '#1a1628',
  surfaceLight: '#241f36',

  // ── Accent colors ──
  pink: '#ff2e97',
  cyan: '#00e5ff',
  purple: '#a855f7',
  yellow: '#fbbf24',
  green: '#10b981',
  red: '#ef4444',
  amber: '#f59e0b',

  // ── Text ──
  text: '#e8e4f0',
  textDim: '#b0a8c4',
  textMuted: '#6b6280',

  // ── Borders (rgba surface tints) ──
  borderSubtle: 'rgba(255,255,255,0.06)',
  borderMedium: 'rgba(255,255,255,0.08)',
  borderMediumStrong: 'rgba(255,255,255,0.07)',
  borderActive: 'rgba(0, 229, 255, 0.4)',
  borderActiveCyan: 'rgba(0, 229, 255, 0.25)',
  borderActivePink: 'rgba(255, 46, 151, 0.25)',
  borderActivePurple: 'rgba(168, 85, 247, 0.25)',

  // ── Surface tints (backgrounds) ──
  tint: 'rgba(255,255,255,0.02)',
  tintStrong: 'rgba(255,255,255,0.03)',
  tintStronger: 'rgba(255,255,255,0.04)',
  tintOverlay: 'rgba(255,255,255,0.05)',
  tintAccent: 'rgba(255,255,255,0.12)',
  tintAccentStrong: 'rgba(255,255,255,0.14)',
  tintActive: 'rgba(255,255,255,0.18)',
  tintState: 'rgba(255,255,255,0.24)',

  // ── Glass shell ──
  shellBackground: 'radial-gradient(circle at 18% 18%, rgba(0, 229, 255, 0.08), transparent 32%), radial-gradient(circle at 82% 14%, rgba(168, 85, 247, 0.08), transparent 28%), linear-gradient(180deg, rgba(8, 12, 24, 0.96), rgba(7, 10, 20, 0.98))',
  shellBorderRadius: '18px',
  shellBorder: `1px solid rgba(255,255,255,0.06)`,
  shellShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 24px 42px rgba(0,0,0,0.24)',

  // ── Card/panel ──
  cardBg: 'rgba(255,255,255,0.02)',
  cardBorderRadius: '12px',
  cardBorderRadiusLg: '14px',
  cardBorderRadiusXl: '16px',

  // ── Inner panel (PanelCard) ──
  panelBackground: 'linear-gradient(180deg, rgba(20, 18, 31, 0.92), rgba(14, 13, 24, 0.94))',
  panelBorder: '1px solid rgba(255,255,255,0.06)',
  panelBorderRadius: '16px',
  panelShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',

  // ── Shadows (reusable combos) ──
  shadowDeep: '0 24px 42px rgba(0,0,0,0.24)',
  shadowDeeper: '0 24px 44px rgba(0,0,0,0.28)',
  shadowSoft: '0 20px 40px rgba(0,0,0,0.2)',
  insetHighlight: 'inset 0 1px 0 rgba(255,255,255,0.03)',
  insetHighlightStrong: 'inset 0 1px 0 rgba(255,255,255,0.04)',

  // ── Glow ──
  glowCyan: '0 0 18px rgba(0, 229, 255, 0.55)',
  glowPink: '0 0 18px rgba(255, 46, 151, 0.55)',
  glowPurple: '0 0 18px rgba(168, 85, 247, 0.55)',
  glowGreen: '0 0 12px rgba(16, 185, 129, 0.6)',
  glowRed: '0 0 24px rgba(239, 68, 68, 0.35)',

  // ── Grid/axis lines ──
  gridLine: 'rgba(255,255,255,0.04)',
  gridLineAlt: 'rgba(255,255,255,0.05)',
  axisLine: 'rgba(255,255,255,0.15)',
  axisLineStrong: 'rgba(255,255,255,0.34)',

  // ── Secondary palette ──
  sky: '#38bdf8',
  skyDim: '#0ea5e9',
  indigo: '#6366f1',
  emerald: '#34d399',
  lime: '#84cc16',
  orange: '#fb923c',
  rose: '#fb7185',

  // ── Typography ──
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
  fontSans: "'Space Grotesk', 'Inter', sans-serif",

  // ── Font sizes ──
  fsEyebrow: '11px',
  fsSmall: '12px',
  fsBody: '13.5px',
  fsValue: '14px',
  fsTitle: '18px',
  fsTitleLg: '20px',

  // ── Letter spacing ──
  lsEyebrow: '0.14em',
  lsSmall: '0.12em',

  // ── Legend dot ──
  dotSize: '8px',
  dotGlow: (color: string) => `0 0 18px ${color}55` as const,

  // ── Transition ──
  transitionFast: 'all 180ms ease',
} as const;

export type SwTokens = typeof sw;
