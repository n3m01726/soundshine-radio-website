/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Karla", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        main: "#eaeaea",
        widget: "#fff",
        white: "#fff",
        title: "#212121",
        text: "#212121",
        accent: {
          yellow: "#ffef26",
          gold: "#fec800",
          orange: "#f19135",
          coral: "#e85e31",
          red: "#e3312d",
        },
        footerTitle: "#e3312d",
        link: "#212121",
        linkHover: "#e3312d",
        header: "#fff",
        border: "#eaeaea",
        displayBorder: "#fff",
        displayH3: "#fff",
        footer: "#f8f8f8",
      },
    },
  },
  plugins: [],
};

