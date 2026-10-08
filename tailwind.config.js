

export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        graphite: {
          DEFAULT: '#0F1113',
          light: '#1A1D1F',
          lighter: '#2A2D2F',
        },
        'soft-red': {
          DEFAULT: '#E63946',
          dark: '#C62E3A',
        }
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      }
    }
  },
  plugins: []
};
