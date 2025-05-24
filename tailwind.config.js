/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "0.625rem",
        sm: "0.25rem",
        md: "0.4375rem",
        lg: "0.625rem",
        xl: "1rem",
      },
      fontFamily: {
        sans: ['"Mona Sans"', "sans-serif"],
      },
      colors: {
        success: {
          100: "#49de50",
          200: "#42c748",
        },
        destructive: {
          100: "#f75353",
          200: "#c44141",
        },
        primary: {
          100: "#dddfff",
          200: "#cac5fe",
        },
        light: {
          100: "#d6e0ff",
          400: "#6870a6",
          600: "#4f557d",
          800: "#24273a",
        },
        dark: {
          100: "#020408",
          200: "#27282f",
          300: "#242633",
        },
      },
      backgroundImage: {
        'bg-pattern': "url('/pattern.png')",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(5px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], 

  darkMode: "class",
};
