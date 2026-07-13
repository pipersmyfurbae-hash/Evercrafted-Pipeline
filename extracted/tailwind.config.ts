import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        ec: {
          green: '#4A6741',
          'green-light': '#6B8F67',
          'green-pale': '#EEF2ED',
          black: '#1A1A1A',
          charcoal: '#2E2E2E',
          ink: '#4A4A4A',
          paper: '#F2EFE9',
          'off-white': '#F9F7F4',
          gold: '#C4963A',
          'gold-dim': '#8A6820',
          border: '#E8E8E8',
          'border-dark': '#D0D0D0',
        }
      },
    },
  },
  plugins: [],
}
export default config
