const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,svelte}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    themes: [
      {
        "rosepine-dawn": {
          primary: "#56949f",
          secondary: "#d7827e",
          accent: "#56949f",
          neutral: "#f0e8df",
          "base-100": "#fffaf3",
          info: "#286983",
          success: "#907aa9",
          warning: "#ea9d34",
          error: "#b4637a",
        },
      },
    ],
  },
};
