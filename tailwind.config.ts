import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0B0A08', // warm near-black, not pure black
          raised: '#131210',
          border: 'rgba(240, 236, 228, 0.09)',
          'border-strong': 'rgba(240, 236, 228, 0.18)',
        },
        ink: {
          DEFAULT: '#F0ECE4', // warm off-white
          muted: '#A8A39A',
          faint: '#6E6A62',
        },
        signal: {
          DEFAULT: '#C9A876', // restrained brass/amber accent
          dim: '#8C7550',
          bright: '#E4C896',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '1180px',
      },
      transitionTimingFunction: {
        signature: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
