/** @type {import('tailwindcss').Config} **/
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
      },
      fontFamily: {
        hub: ['"Inter"', "sans-serif"],
      },
    },
  },
};
