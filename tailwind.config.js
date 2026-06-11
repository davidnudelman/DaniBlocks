/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        candy: {
          pink: '#FF6B9D',
          yellow: '#FFC947',
          mint: '#A8E6CF',
          coral: '#FF8B94',
          lavender: '#B5A9FF',
          bg: '#FFF0F5',
          grid: '#FFE4EE',
          hover: '#FF4B8C',
          star: '#FFD700',
          empty: '#E0E0E0',
        },
      },
      borderRadius: {
        'grid': '2rem',
        'cell': '0.75rem',
      },
      animation: {
        'bounce-slow': 'bounce-slow 3s infinite',
        'bounce-short': 'bounce-short 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'fade-in-up': 'fade-in-up 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards',
        'pop-in': 'pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        'bounce-short': {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.05)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.5)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
