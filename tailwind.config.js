/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    colors:{
      'bootyBrown': "#7a5901"
    },
    fontSize:{
      mamoth : "16rem"
    },
    },
  },
  plugins: [],
}

