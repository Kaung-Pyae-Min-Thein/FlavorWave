/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" 
  ],
  theme: {
    extend: {
      colors: {
        primary: "#43a047",
        fade: "#6f6f6fab"
      },
      // fontFamily: {
      //   orelega: ["Orelega One", "serif"],
      //   poppins: ["Poppins", "sans-serif"],
      //   inter: ["Inter", "sans-serif"],

      // },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


