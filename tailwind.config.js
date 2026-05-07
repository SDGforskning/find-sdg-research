/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx,md}',
    './content/**/*.{js,ts,jsx,tsx,mdx,md}',
    './components/**/*.{js,ts,jsx,tsx}',
    './theme.config.tsx',
    './mdx-components.tsx'
  ],
  theme: {
    extend: {
    }
  },
  plugins: [],
  darkMode: 'class'
}