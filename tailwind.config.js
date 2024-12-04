/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-700': '#484848',
        'gray-500': '#9A9A9A',
        'gray-300': '#C2C6CC',
        'gray-100': '#E0E2E6'
      }
    },
  },
  plugins: [],
}

