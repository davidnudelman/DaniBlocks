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
        'grid': '12px',
        'cell': '4px',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'bounce-short': 'bounce-short 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
      keyframes: {
        'bounce-short': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
