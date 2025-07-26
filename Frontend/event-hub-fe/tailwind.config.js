/** @type {import('tailwindcss').Config} **/
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primaryDark: "var(--color-primary-dark)",
        primaryLight: "var(--color-primary-light)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        onSurface: "var(--color-on-surface)",
        text: "var(--color-text)",
        textMuted: "var(--color-text-muted)",
        buttonHover: "var(--color-button-hover)",
        accent: "var(--color-accent)",
        icon: "var(--color-icon)",
        border: "var(--color-border)",
        card: "var(--color-card)",
      },
      fontFamily: {
        hub: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
