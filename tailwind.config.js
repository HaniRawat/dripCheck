/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00ff9d',
          dark: '#00cc7d',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          lighter: '#141414',
          card: '#1a1a1a',
          section: '#262626',
        },
        indigo: {
          light: '#a5b4fc',
          DEFAULT: '#818cf8',
          dark: '#6366f1',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'typing': 'typing 1s infinite ease-in-out',
        'title-fade': 'titleFade 1s ease-out',
        'fade-up': 'fadeUp 1s ease-out',
        'gradient-move': 'gradientMove 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        typing: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        titleFade: {
          'from': { opacity: 0, transform: 'translateY(-20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeUp: {
          'from': { opacity: 0, transform: 'translateY(20px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        gradientMove: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at center, #141414 0%, #0a0a0a 100%)',
      },
    },
  },
  plugins: [],
};