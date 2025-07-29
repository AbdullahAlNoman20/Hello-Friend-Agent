/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ All frontend files
  ],
  theme: {
    extend: {
      // ✨ Custom animations
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },

      // 🎨 Optional: extend colors, fonts, shadows
      colors: {
        primary: "#ea580c", // orange-600
        secondary: "#16a34a", // green-600
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
    },
  },

  // 🌼 DaisyUI integration
  plugins: [require("daisyui")],
  daisyui: {
  themes: ["light", "dark", "cupcake", "emerald", "synthwave"],
},
};
