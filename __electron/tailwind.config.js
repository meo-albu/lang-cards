const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./renderer/pages/**/*.{js,ts,jsx,tsx}', './renderer/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
      },
      colors: {
        primary: colors.yellow[500]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}