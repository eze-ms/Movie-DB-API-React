/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-bg': '#101124',
        'custom-hover': '#f26064',
        'custom-button': '#ffffff12',
      },
      colors: {
        'primary-orange': '#f26064'
      }
    },
  },
  plugins: [],
}
