module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,svg}",
    "./blog/**/*.{md,mdx}",
    "./docs/**/*.{md,mdx}",
    "./static/**/*.svg",
  ],
  corePlugins: {
    preflight: false,
  },
  darkMode: ["class", "[data-theme='dark']"], // map tailwind darkMode to docusaurus
  theme: {
    extend: {
      lineHeight: {
        11.5: "2.875rem",
      },
    },
  },
  plugins: [],
};
