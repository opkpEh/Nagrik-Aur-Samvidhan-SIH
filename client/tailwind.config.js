/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", // Fixed the path
  ],
  theme: {
    extend: {
      colors: {
        beige: '#F5F5DC',
        tan: '#D2B48C',
        caputMortuum: '#4B2E2B',
        burgundy: '#800020',
        jet: '#333333',
      },
    },
  },
  plugins: [],
}