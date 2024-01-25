/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // boxShadow: {
      //   "custom-xl": "0 0 24px 4px black",
      // },
      screens: {
        "3xl": "2000px",
      },
      borderWidth: {
        1: "0.5px",
      },
    },
  },
  plugins: [],
};
