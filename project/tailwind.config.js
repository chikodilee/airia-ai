/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF5A5F', // Airbnb-style coral
          50: '#FFEEEE',
          100: '#FFDCDC',
          200: '#FFB8B9',
          300: '#FF9395',
          400: '#FF7478',
          500: '#FF5A5F',
          600: '#FF3339',
          700: '#FF0D14',
          800: '#E60009',
          900: '#C30008',
          950: '#8A0006',
        },
        secondary: {
          DEFAULT: '#00A699', // Teal accent
          50: '#E6FFFD',
          100: '#B3FFF9',
          200: '#80FFF5',
          300: '#4DFFF0',
          400: '#1AFFEC',
          500: '#00E6D6',
          600: '#00A699',
          700: '#00665F',
          800: '#003330',
          900: '#001A18',
          950: '#000D0C',
        },
        neutral: {
          DEFAULT: '#484848', // Dark gray for text
          50: '#F8F8F8',
          100: '#EBEBEB',
          200: '#D6D6D6',
          300: '#C2C2C2',
          400: '#ADADAD',
          500: '#999999',
          600: '#757575',
          700: '#616161',
          800: '#484848',
          900: '#212121',
          950: '#121212',
        },
      },
      fontFamily: {
        sans: [
          '"Circular"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 6px 16px rgba(0, 0, 0, 0.12)',
        hover: '0 8px 20px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};