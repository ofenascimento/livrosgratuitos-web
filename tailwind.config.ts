import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        main: {
          100: "#aa9ef6",
          200: "#9984f3",
          300: "#8769f0",
          400: "#7B66FF",
          500: "#7650ed",
          600: "#6436ea",
          700: "#522ce1",
        },
        sepia: "#faf2e7",
      },
      colors: {
        main: {
          100: "#aa9ef6",
          200: "#9984f3",
          300: "#8769f0",
          400: "#7B66FF",
          500: "#7650ed",
          600: "#6436ea",
          700: "#522ce1",
        },
        dark: {
          background: "#1C2939",
        },
        sepia: "#faf2e7",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
        raleway: ["var(--font-raleway)"],
        lora: ["var(--font-lora)"],
        merriweather: ["var(--font-merriweather)", "serif"],
      },
      width: {
        "9/10": "90%",
      },
      animation: {
        border: "border 4s ease infinite",
      },
      keyframes: {
        border: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
