/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      'sky': {
        '50': '#f0f9ff',
        '100': '#e0f2fe',
        '200': '#bae6fd',
        '300': '#7dd3fc',
        '400': '#38bdf8',
        '500': '#0ea5e9',
        '600': '#0284c7',
        '700': '#0369a1',
        '800': '#075985',
        '900': '#0c4a6e',
        '950': '#082f49',
    },
    'white': '#fff',
    'black': '#000',
  },
    extend: {},
  },
  plugins: [
    function ({ addBase }) {
    addBase({
      // Nombre de la clase personalizada que deseas agregar
      '.text-custom': {
        fontSize: '50px',
      },
    })
  },],
}

