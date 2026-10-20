/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: {
          DEFAULT: '#fbfaf7',
          50: '#ffffff',
          100: '#fbfaf7',
          200: '#f3efe6',
          300: '#e6e0d4',
        },
        parchment: {
          DEFAULT: '#f3efe6',
          card: '#faf8f3',
        },
        ink: {
          DEFAULT: '#191817',
          light: '#2d2b29',
          muted: '#6b665f',
          subtle: '#8c857b',
        },
        hairline: {
          DEFAULT: '#e6e0d4',
          dark: '#d1c9b8',
        },
        hazard: {
          red: '#991b1b',
          redBg: '#fee2e2',
          redBorder: '#fecaca',
          amber: '#b45309',
          amberBg: '#fffbeb',
          amberBorder: '#fde68a',
        },
        leverage: {
          green: '#15803d',
          greenBg: '#f0fdf4',
          greenBorder: '#bbf7d0',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Charter', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(25, 24, 23, 0.04), 0 1px 2px rgba(25, 24, 23, 0.02)',
        'briefing': '0 4px 12px rgba(25, 24, 23, 0.06), 0 1px 3px rgba(25, 24, 23, 0.04)',
      }
    },
  },
  plugins: [],
}
