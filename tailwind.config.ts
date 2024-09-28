import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark: {
          100: '#0b1527',
          200: '#0d1a2d',
          300: '#0f1e33',
          400: '#121f33',
        },
        blue: {
          100: '#3371ff',
        },
      },
    },
  },
  plugins: [],
};
export default config;
