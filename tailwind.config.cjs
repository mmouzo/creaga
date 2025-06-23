/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        criaga: { // Custom theme name
          "primary": "#4A7856", // Earthy green
          "secondary": "#60A5FA", // Muted blue
          "accent": "#D97706", // Warm orange/brown
          "neutral": "#3D4451", // Default neutral
          "base-100": "#FFFFFF", // Base background (white)
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
      "light", // Keep light as a fallback or alternative if needed
    ],
  },
}
