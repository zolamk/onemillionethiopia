const colors = require("tailwindcss/colors");

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  jit: true,
  theme: {
    extend: {},
    minWidth: {
      '420': '420px'
    },
    fill: theme => ({
      'pale-sky': theme('colors.pale-sky.100'),
      'ethiopia-green': theme('colors.ethiopia-green.50')
    }),
    stroke: theme => ({
      'pale-sky': theme('colors.pale-sky.300')
    }),
    colors: {
      transparent: "transparent",
      'ethiopia-green': { DEFAULT: '#078247', '50': '#4BF5A3', '100': '#38F499', '200': '#11F285', '300': '#0BCF71', '400': '#09A95C', '500': '#078247', '600': '#044D2A', '700': '#01180D', '800': '#000000', '900': '#000000' },
      'pale-sky': { DEFAULT: '#6B7280', '50': '#CDD0D5', '100': '#C2C5CC', '200': '#ACB0BA', '300': '#969BA7', '400': '#7F8694', '500': '#6B7280', '600': '#515761', '700': '#383C43', '800': '#1E2024', '900': '#050506' },
      white: colors.white
    }
  },
  variants: {
    extend: {
      backgroundOpacity: ['disabled'],
      cursor: ['disabled'],
      borderWidth: ['last', 'focus-within', 'first']
    }
  },
  plugins: [],
}
