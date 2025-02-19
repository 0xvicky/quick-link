import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      keyframes: {
        enter: {
          "0%": {opacity: "0", transform: "translateY(-10px)"},
          "100%": {opacity: "1", transform: "translateY(0)"}
        },
        exit: {
          "0%": {opacity: "1", transform: "translateY(0)"},
          "100%": {opacity: "0", transform: "translateY(-10px)"}
        }
      },
      animation: {
        enter: "enter 0.5s ease-out forwards",
        exit: "exit 0.5s ease-in forwards"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  plugins: []
};
export default config;
