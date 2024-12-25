/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF0000',
        secondary: '#00FF00',
        third: '#0000FF',
      },
    },
  },
  plugins: [],
}