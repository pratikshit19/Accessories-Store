/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
        colors: {
        primary: "#000000",
        secondary: "#f3f4f6",
        accent: "#4f46e5", // Indigo
        highlight: "#ef4444", // Red
        bgcolor: "#040D12"
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}

