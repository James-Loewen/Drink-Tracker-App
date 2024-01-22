/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito"],
        display: ["Poppins"],
      },
      colors: {
        teal: "#216a6f",
        gold: {
          default: "#daa520",
          500: "#daa520",
          800: "#9e6c00",
        },
      },
      boxShadow: {
        1: "#232232 -1px 2px",
        2: "#232232 -2px 4px 1px",
      },
    },
  },
  plugins: [],
};
