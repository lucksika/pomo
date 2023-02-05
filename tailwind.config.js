/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
      }
    },
    // fontFamily: {
    //   sans: [
    //     "Open Sans, sans-serif",
    //   ],
    // },
    colors: {
      'pomored': '#A00607',
      'pomodarkred': "#6A0405",
      'pomotext': '#3C2E0E',
      'pomocaption': "#BEA171",
      'pomobg': "#E9D5C0",
      "pomodisable": "#AEA6A6"
    },
    extend: {},
  },
  plugins: [],
}
