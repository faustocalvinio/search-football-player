/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
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

