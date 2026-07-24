
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
       fontFamily: {
        logo:["Space Grotesk", "sans-serif"],
        sans:["Geist", "sans-serif"]
      },
    },
  },
  plugins: [],
}





