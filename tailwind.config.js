/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        julius: ['"Julius Sans One"', 'sans-serif'],
        audiowide: ['Audiowide', 'cursive'],
        seoulnamsan: ['"SeoulNamsan"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
