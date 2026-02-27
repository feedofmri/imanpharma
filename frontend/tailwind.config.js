/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f7f1',
          100: '#e1efe0',
          200: '#c5e2c3',
          300: '#9dcca1',
          400: '#75b572',
          500: '#6ca668',
          600: '#52854f',
          700: '#436941',
          800: '#385336',
          900: '#2f442e',
          950: '#172516',
          DEFAULT: '#6CA668',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
