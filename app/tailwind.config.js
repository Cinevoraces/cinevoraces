const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'pages/**/*.{js,ts,jsx,tsx}',
    'components/**/*.{js,ts,jsx,tsx}',
    'app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily:{
      'sans': ['Montserrat', 'sans-serif'],
    },
    extend: {
      colors:{
        'orange-primary':'#FC9A3F',
        'orange-secondary':'#FC783F',
        'purple':'#C99AF8',
        'yellow':'#FCCA15',
        'green':'#85F086',
        'dark-gray':'#202029',
        'medium-gray':'#393945',
        'light-gray': '#8A8A92',
        'card-bg-one': '#434356',
        'card-bg-two': '#565676',
        'card-bg-three': '#393945',
        'white':'#F2F2F3'
      },
      animation: {
        'slidein': 'slidein 400ms ease-in',
        'slideout': 'slidein 400ms ease-out reverse',
      },
      transitionProperty: {
        'width': 'width',
      },
      transitionDuration: {
        '400': '400ms',
      },
      keyframes: {
        'slidein': {
          '0%': { transform: 'translate(-10rem)'},
          '100%': { transform: 'translate(0)'},
        },
        'slideout': {
          '0%': { transform: 'translate(0)'},
          '100%': { transform: 'translate(10rem)'},
        },
      },
      backgroundImage:{}
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(({ addVariant, e }) => {
      addVariant('fourth-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`fourth-child${separator}${className}`)}:nth-child(4)`
        })
      })
    }),
    plugin(({ addVariant, e }) => {
      addVariant('fifth-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`fifth-child${separator}${className}`)}:nth-child(5)`
        })
      })
    }),
    plugin(({ addVariant, e }) => {
      addVariant('sixth-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`sixth-child${separator}${className}`)}:nth-child(6)`
        })
      })
    }),
    plugin(({ addVariant, e }) => {
      addVariant('threeModulusZero-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`threeModulusZero-child${separator}${className}`)}:nth-child(3n)`
        })
      })
    }),
    plugin(({ addVariant, e }) => {
      addVariant('threeModulusOne-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`threeModulusOne-child${separator}${className}`)}:nth-child(3n + 1)`
        })
      })
    }),
    plugin(({ addVariant, e }) => {
      addVariant('threeModulusTwo-child', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`threeModulusTwo-child${separator}${className}`)}:nth-child(3n + 2)`
        })
      })
    }),
  ],
};
