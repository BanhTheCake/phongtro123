/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        secondary: '#f73859',
        background: '#f5f5f5',
        primary: '#1266dd'
      },
      boxShadow: {
        low: 'rgb(149 157 165 / 20%) 0px 2px 8px 0px'
      }
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
