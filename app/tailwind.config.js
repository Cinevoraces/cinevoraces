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
        'white':'#F2F2F3'
      },
      backgroundImage:{}
    },
    variants: {
      extend: {
        '4thchild': ':nth-child(4)'
      }
    }
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
    })
  ],
};
