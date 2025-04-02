/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(pagination|table|checkbox|form|spacer).js"
  ],
  theme: {
    extend: {},
  },
};
