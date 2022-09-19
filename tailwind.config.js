/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            // sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            sans: ["Quicksand", "sans-serif"]
        },
    },
},
plugins: [require('@tailwindcss/forms')],
}
