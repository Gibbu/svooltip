/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  theme: {
    fontFamily: {
      body: ['Source Code Pro']
    },
    extend: {
      colors: {
        'turquoise': {
          DEFAULT: '#36E7A9',
          '50': '#DAFBEF',
          '100': '#C8F8E7',
          '200': '#A3F4D8',
          '300': '#7FF0C8',
          '400': '#5AEBB9',
          '500': '#36E7A9',
          '600': '#18CC8D',
          '700': '#129A6B',
          '800': '#0C6848',
          '900': '#063625'
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
