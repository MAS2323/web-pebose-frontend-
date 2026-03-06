/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pebose: {
          primary: "#5D1A1A",
          secondary: "#6B7B5F",
          dark: "#3d1212",
        },
      },
    },
  },
  plugins: [],
};
