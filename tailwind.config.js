/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // ativa o modo dark via classe 'dark'
  theme: {
    extend: {
      colors: {
        "primary": "#66c0f4",
        "background-light": "#f6f7f8",
        "background-dark": "#101b22",
        "surface": "#1b2838",
        "accent": "#171d25"
      },
      fontFamily: {
        "display": ["Inter"] // usa a fonte Inter
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}