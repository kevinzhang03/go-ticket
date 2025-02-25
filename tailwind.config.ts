import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B4B6BA',
        },
        grey: {
          100: '#EEEEEE',
        },
        'active-gold': {
          DEFAULT: '#7F7739',
          dark: '#383419',
          light: '#807739',
        },
        'active-green': {
          DEFAULT: '#1F590D',
          dark: '#0D3D00',
          light: '#2A7A12',
        },
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s linear infinite',
        'pulse-text-gold': 'pulse-text-gold 2s linear infinite',
        'pulse-green': 'pulse-green 2s linear infinite',
        'pulse-text-green': 'pulse-text-green 2s linear infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { backgroundColor: '#383419' },
          '50%': { backgroundColor: '#807739' },
        },
        'pulse-text-gold': {
          '0%, 100%': { color: '#383419' },
          '50%': { color: '#FFFFFF' },
        },
        'pulse-green': {
          '0%, 100%': { backgroundColor: '#0D3D00' },
          '50%': { backgroundColor: '#2A7A12' },
        },
        'pulse-text-green': {
          '0%, 100%': { color: '#0D3D00' },
          '50%': { color: '#FFFFFF' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
