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
        danger: "#933232",
        "raisin-black": "#22232A",
      },
      boxShadow: {
        // 1: "#232232 -1px 2px",
        // 2: "#232232 -2px 4px 1px",
        1: "#22232A -1px 2px",
        2: "#22232A -2px 4px 1px",
        danger: "0 0 3px 1px #933232",
      },
    },
  },
  plugins: [],
};
