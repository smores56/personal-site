const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,svelte}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  darkMode: "selector",
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
        "light": {
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
        "dark": {
          primary: "#c4a7e7",
          secondary: "#ea9a97",
          accent: "#c4a7e7",
          neutral: "#2a273f",
          "base-100": "#232136",
          info: "#3e8fb0",
          success: "#9ccfd8",
          warning: "#f6c177",
          error: "#eb6f92",
        },
      },
    ],
  },
};
