/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        rise: {
          '0%': {transform: 'translateY(50px)', opacity: 0},
          '100%': {transform: 'translateY(0)', opacity: 1}
        },
      },
      animation: {
        rise: 'rise 0.5s ease-out',
      }
    },
  },
  plugins: [],
}

