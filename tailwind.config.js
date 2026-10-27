/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          teal: '#7cc4c4',
          orange: '#e98a35',
          lavender: '#a99bf0',
          'lavender-light': '#f3f1ff',
          'lavender-dark': '#8c7ae6',
        },
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(to right, #7cc4c4, #e98a35)',
        'accent-gradient-hover': 'linear-gradient(to right, #6eb7b7, #dc7e2b)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'soft-lg': '0 10px 25px -3px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
        'accent-glow': '0 0 25px rgba(124, 196, 196, 0.25)',
      },
      borderRadius: {
        '2rem': '2rem',
      }
    },
  },
  plugins: [],
}
