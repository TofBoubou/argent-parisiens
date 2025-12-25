import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charte graphique Sarah Knafo Paris - 4 couleurs officielles uniquement
        primary: "#22496A",      // Bleu Paris
        accent: "#E1386E",       // Rose Framboise
        cream: "#FCEFD0",        // Crème Vanille
        yellow: "#FBCD41",       // Jaune Soleil
      },
      fontFamily: {
        display: ['Puffin Display', 'sans-serif'],
        sans: ['Puffin Display', 'sans-serif'],
        subtitle: ['Myriad Variable Concept', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
