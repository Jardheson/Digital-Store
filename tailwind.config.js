/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C92071",
        secondary: "#B5B6F2", // Example from image palette inference
        dark: "#1F1F1F",
        light: "#F5F5F5",
        "gray-text": "#474747",
        "light-gray": "#F9F8FE"
      }
    },
  },
  plugins: [],
}
