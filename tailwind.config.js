/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", './*'],
  theme: {
    extend: {
      colors: {
        'Monster-Orange': '#F8884C',
        'Monster-Green': '#8AC926',
        'Monster-Black': {
          100: '#120B16',
          200: '#1E1E1E'
        }
      }
    },

  },
  plugins: [],
}
