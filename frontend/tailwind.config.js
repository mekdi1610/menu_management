// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      fontSize: {
        "custom-lg": "32px",
      },
      colors: {
        "custom-green": "#9FF443",
        "custom-gray": "#F9FAFB",
      },
      width: {
        "custom-dropdown": "349px",
        "custom-button": "133px",
        "custom-list": "310px",
        "custom-top-header": "1176px",
      },
      height: {
        "custom-botton": "38px",
        "custom-list": "710px",
        "custom-top-header": "84px",
        "custom-sidebar": "1032px"
      },
    },
  },
  plugins: [],
};
