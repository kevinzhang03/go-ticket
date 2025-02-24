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
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s linear infinite',
        'pulse-text-gold': 'pulse-text-gold 2s linear infinite',
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
      },
    },
  },
  plugins: [],
} satisfies Config;
