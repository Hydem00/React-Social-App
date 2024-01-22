/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-xl": "0 0 24px 4px black",
      },
    },
  },
  plugins: [],
};
