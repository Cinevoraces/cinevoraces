/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'orange-primary':'#FC9A3F',
      'orange-secondary':'#FC783F',
      'purple':'#C99AF8',
      'yellow':'#FCCA15',
      'dark-gray':'#202029',
      'medium-gray':'#393945',
      'white':'#F2F2F3',
      'light-gray':'#85F086'
    },
    fontFamily:{
      'Montserrat': 'Montserrat',
    },
    extend: {},
  },
  plugins: [],
};
