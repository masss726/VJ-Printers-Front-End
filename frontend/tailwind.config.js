/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair-display': ['"Playfair Display"', 'serif'],
        'poppins': ['"Poppins"', 'sans-serif'],
        'lato': ['"Lato"', 'sans-serif'],
        'lobster': ['"Lobster"', 'cursive'],
      },
      colors: {
        primary: '#FF6B35',
        secondary: '#004E89',
        accent: '#F7B801',
      },
    },
  },
  plugins: [],
}
