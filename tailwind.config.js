/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sw: {
          void: 'var(--sw-void)',
          deep: 'var(--sw-deep)',
          surface: 'var(--sw-surface)',
          'surface-light': 'var(--sw-surface-light)',
          pink: 'var(--sw-pink)',
          cyan: 'var(--sw-cyan)',
          purple: 'var(--sw-purple)',
          yellow: 'var(--sw-yellow)',
          text: 'var(--sw-text)',
          'text-dim': 'var(--sw-text-dim)',
          'text-muted': 'var(--sw-text-muted)',
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono', monospace"],
        sans: ["'Space Grotesk', system-ui, -apple-system, sans-serif"],
      },
    },
  },
  plugins: [],
}
