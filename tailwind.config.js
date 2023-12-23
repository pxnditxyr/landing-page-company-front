/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'turquoise-blue': {
          '50': '#ecffff',
          '100': '#cffcfe',
          '200': '#a4f8fd',
          '300': '#4deef9',
          '400': '#21dfef',
          '500': '#05c2d5',
          '600': '#079bb3',
          '700': '#0d7b91',
          '800': '#146376',
          '900': '#165263',
          '950': '#083644',
        },
      }
    },
  },
  plugins: [],
}
