/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
         openSans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
      },
    },
  },
  plugins: [],
}

