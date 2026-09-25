/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}", "./workbench/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pulse: {
          bg: "var(--pulse-bg)",
          surface: "var(--pulse-surface)",
          border: "var(--pulse-border)",
          fg: "var(--pulse-fg)",
          muted: "var(--pulse-muted)",
          accent: "var(--pulse-accent)",
          sidebar: "var(--pulse-sidebar)",
        },
      },
    },
  },
  plugins: [],
};
