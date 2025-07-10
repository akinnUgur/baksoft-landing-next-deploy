import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Typo düzeltildi
    "./src/generalUiComponents/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Next-themes ile kullanılacak
  theme: {
    extend: {
      colors: {
        // Light Mode Renkleri
        favorite: "#4A90E2",
        primary: "#F5F5F5",
        secondary: "#E0E0E0",
        third: "#D6D6D6",
        fourth: "#CCCCCC",
        fifth: "#666666",
        sixth: "#B0B0B0",
        seventh: "#444444",
        chord: "#004F80",
        text: "#1A1A1A",
        subtext: "#333333",
        "text-tertiary": "#4D4D4D",
        accent: "#007BB5",
        "accent-2": "#1A91D6",
        success: "#53E632",
        "music-icon": "#007BB5",
        "clock-icon": "#4D4D4D",

        // Dark Mode Renkleri (değiştirmedik)
        "primary-dark": "#0A0A0A",
        "secondary-dark": "#141414",
        "third-dark": "#1E1E1E",
        "fourth-dark": "#2A2A2A",
        "fifth-dark": "#383838",
        "sixth-dark": "#464646",
        "seventh-dark": "#555555",
        "text-dark": "#F0F0F0",
        "subtext-dark": "#DADADA",
        "text-tertiary-dark": "#C5C5C5",
        "accent-dark": "#009BE7",
        "accent-2-dark": "#23A9F2",
        "music-icon-dark": "#009BE7",
        "clock-icon-dark": "#B3B3B3",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
