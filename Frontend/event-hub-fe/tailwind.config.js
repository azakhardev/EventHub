/** @type {import('tailwindcss').Config} **/
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0 5px rgba(255,255,255,0.9)",
          "0 0 15px rgba(255,255,255,0.8)",
          "0 0 30px rgba(255,255,255,0.7)",
        ],
      },
      backgroundImage: {
        "line-gradient": "linear-gradient(to right, #212121, #F3F4F6)",
      },
      colors: {
        primary: "var(--color-primary)",
        "primary-dark": "var(--color-primary-dark)",
        "primary-light": "var(--color-primary-light)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        onSurface: "var(--color-on-surface)",
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "button-hover": "var(--color-button-hover)",
        accent: "var(--color-accent)",
        icon: "var(--color-icon)",
        border: "var(--color-border)",
        card: "var(--color-card)",
        dialog: "var(--color-dialog)",
      },
      fontFamily: {
        hub: ['"Inter"', "sans-serif"],
      },
      keyframes: {
        wiggle15: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-15deg)" },
          "70%": { transform: "rotate(15deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        wiggle15: "wiggle15 0.5s ease-in-out",
      },
    },
  },
};
