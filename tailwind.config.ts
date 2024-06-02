import type { Config } from "tailwindcss";

const config: Config = {
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
      fontSize: {
        title: "2.30rem",
      },
      backgroundColor: {
        main: "#7B66FF",
      },
      colors: {
        main: {
          100: "#aa9ef6",
          700: "#7B66FF",
        },

        dark: {
          background: "#1B2123",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
        raleway: ["var(--font-raleway)"],
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
