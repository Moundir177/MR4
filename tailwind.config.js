/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4F6BFF',
          DEFAULT: '#3F51B5',
          dark: '#303F9F',
        },
        secondary: {
          light: '#FF5983',
          DEFAULT: '#FF4081',
          dark: '#F50057',
        },
        accent: {
          light: '#FFD180',
          DEFAULT: '#FFAB40',
          dark: '#FF9100',
        },
        neutral: '#F5F5F5',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
        arabic: ['var(--font-amiri)', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 