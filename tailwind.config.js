/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        card: "var(--card)",
        ink: "var(--ink)",
        mute: "var(--mute)",
        pink: "var(--pink)",
        aqua: "var(--aqua)",
        sun: "var(--sun)",
        periwinkle: "var(--periwinkle)",
        shadowCol: "var(--shadow)",
      },
      fontFamily: {
        sans: ["'Bricolage Grotesque'", "system-ui", "-apple-system", "sans-serif"],
        display: ["'Bricolage Grotesque'", "system-ui", "-apple-system", "sans-serif"],
        handwriting: ["'Caveat'", "cursive", "handwriting"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        box: "5px 5px 0 var(--shadow)",
        boxHover: "7px 7px 0 var(--shadow)",
        btn: "4px 4px 0 var(--shadow)",
        btnHover: "6px 6px 0 var(--shadow)",
        btnActive: "2px 2px 0 var(--shadow)",
      },
      borderRadius: {
        box: "22px",
      },
    },
  },
  plugins: [],
};
