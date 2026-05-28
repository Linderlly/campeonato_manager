/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: '#00F5FF',
        gamer: '#0f172a',
        victory: '#22c55e',
        danger: '#ef4444',
        gold: '#FFD700',
      },
      boxShadow: {
        neon: '0 0 15px #00F5FF',
        gold: '0 0 25px #FFD700',
      }
    },
  },
  plugins: [],
}