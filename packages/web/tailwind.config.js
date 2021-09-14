/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        orange: colors.orange,
        white: colors.white,
        black: colors.black,
        gray: colors.gray,
        green: colors.lime,
      },
      backgroundImage: {
        header: "url('/header.png')",
        body: "url('/body.png')",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      opacity: ['disabled'],
      cursor: ['disabled', 'hover'],
    },
  },
  plugins: [],
};
