/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#351B59',
        secondary: '#8D69BF',
        terceary: '#0D0126',
        cuaternary: '#BFBFBF',
        quinary: '#262626',
      },
      fontFamily: {
        font1: ['Spicy Rice', 'serif'],
        font2: ['Montserrat Alternates', 'sans-serif'], 
        font3: ['DynaPuff', 'system-ui'],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '5rem',
      },
    },
  },
  plugins: [],
}
