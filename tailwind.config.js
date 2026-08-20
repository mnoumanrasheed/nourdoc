/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#102f35',
        teal: '#13798b',
        aqua: '#35b5bd',
        mist: '#eaf5f3',
        sand: '#f4f0e8',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 80px rgba(16, 47, 53, 0.10)',
      },
    },
  },
  plugins: [],
}
