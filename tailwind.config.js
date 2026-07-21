// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
],
  theme: {
    extend: {
      fontFamily: {
        'figtree': ['Figtree', 'system-ui', '-apple-system', 'sans-serif'],
        'sans': ['Figtree', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      colors: {
        'primary-bg': '#1a0033',
        'secondary-bg': '#0d1b2a', 
        'tertiary-bg': '#000000',
        'accent-purple': '#9a82f3',
        'accent-gradient-start': '#8b5cf6',
        'accent-gradient-end': '#ec4899',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'primary-gradient': 'linear-gradient(135deg, #1a0033 0%, #0d1b2a 50%, #000000 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #0a0015 0%, #1a0033 50%, #000000 100%)',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};