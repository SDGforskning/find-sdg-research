/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx,md}',
    './components/**/*.{js,ts,jsx,tsx}',
    './theme.config.tsx'
  ],
  theme: {
    extend: {
      colors: {
        sdg1: 'rgb(229,36,59)',
        sdg2: 'rgb(221,166,58)',
        sdg3: 'rgb(76,159,56)',
        sdg4: 'rgb(197,25,45)',
        sdg5: 'rgb(255,58,33)',
        sdg6: 'rgb(38,189,226)',
        sdg7: 'rgb(252,195,11)',
        sdg8: 'rgb(162,25,66)',
        sdg9: 'rgb(253,105,37)',
        sdg10: 'rgb(221,19,103)',
        sdg11: 'rgb(253,157,36)',
        sdg12: 'rgb(191,139,46)',
        sdg13: 'rgb(63,126,68)',
        sdg14: 'rgb(10,151,217)',
        sdg15: 'rgb(86,192,43)',
        sdg16: 'rgb(0,104,157)',
        sdg17: 'rgb(25,72,106)',
      },
    }
  },
  plugins: [],
  darkMode: 'class'
}