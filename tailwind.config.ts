import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0b0f14',
          soft: '#0f141b'
        },
        panel: {
          DEFAULT: '#141a22',
          hover: '#1a2230'
        },
        text: {
          DEFAULT: '#e6eeff',
          soft: '#a3b6e6',
          mute: '#7a8fb6'
        },
        primary: {
          DEFAULT: '#4cc2ff'
        },
        accent: {
          DEFAULT: '#7c5cff'
        },
        success: {
          DEFAULT: '#26d07c'
        }
      },
      boxShadow: {
        soft: '0 8px 35px rgba(0,0,0,.4)'
      },
      borderRadius: {
        '2xl': '1.25rem'
      }
    }
  },
  plugins: []
} satisfies Config
