import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Jonlorenzo Royal Theme Colors
        royal: {
          50: "rgb(var(--royal-50))",
          100: "rgb(var(--royal-100))",
          200: "rgb(var(--royal-200))",
          300: "rgb(var(--royal-300))",
          400: "rgb(var(--royal-400))",
          500: "rgb(var(--royal-500))",
          600: "rgb(var(--royal-600))",
          700: "rgb(var(--royal-700))",
          800: "rgb(var(--royal-800))",
          900: "rgb(var(--royal-900))",
          950: "rgb(var(--royal-950))",
        },
        illumination: {
          50: "rgb(var(--illumination-50))",
          100: "rgb(var(--illumination-100))",
          200: "rgb(var(--illumination-200))",
          300: "rgb(var(--illumination-300))",
          400: "rgb(var(--illumination-400))",
          500: "rgb(var(--illumination-500))",
          600: "rgb(var(--illumination-600))",
          700: "rgb(var(--illumination-700))",
          800: "rgb(var(--illumination-800))",
          900: "rgb(var(--illumination-900))",
          950: "rgb(var(--illumination-950))",
        },
        genius: {
          50: "rgb(var(--genius-50))",
          100: "rgb(var(--genius-100))",
          200: "rgb(var(--genius-200))",
          300: "rgb(var(--genius-300))",
          400: "rgb(var(--genius-400))",
          500: "rgb(var(--genius-500))",
          600: "rgb(var(--genius-600))",
          700: "rgb(var(--genius-700))",
          800: "rgb(var(--genius-800))",
          900: "rgb(var(--genius-900))",
          950: "rgb(var(--genius-950))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "illumination-pulse": {
          "0%, 100%": {
            opacity: "calc(var(--illumination-opacity) * 0.6)",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "var(--illumination-opacity)",
            transform: "scale(1.05)",
          },
        },
        "genius-reverberate": {
          "0%": {
            transform: "scale(1)",
            boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)",
          },
          "25%": {
            transform: "scale(1.1)",
            boxShadow: "0 0 60px rgba(99, 102, 241, 0.7)",
          },
          "50%": {
            transform: "scale(1.2)",
            boxShadow: "0 0 90px rgba(99, 102, 241, 0.9)",
          },
          "75%": {
            transform: "scale(1.1)",
            boxShadow: "0 0 60px rgba(99, 102, 241, 0.7)",
          },
          "100%": {
            transform: "scale(1)",
            boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)",
          },
        },
        "royal-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "smart-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(234, 179, 8, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(234, 179, 8, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "illumination-pulse": "illumination-pulse 3s ease-in-out infinite",
        "genius-reverberate": "genius-reverberate 1.5s ease-in-out infinite",
        "royal-float": "royal-float 6s ease-in-out infinite",
        "smart-glow": "smart-glow 2s ease-in-out infinite",
      },
      boxShadow: {
        "royal-illumination": "0 0 25px rgba(121, 92, 132, 0.4), 0 0 50px rgba(234, 179, 8, 0.3)",
        "genius-orb":
          "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3), 0 0 90px rgba(99, 102, 241, 0.2)",
        "illumination-glow":
          "0 0 20px rgba(234, 179, 8, 0.3), 0 0 40px rgba(234, 179, 8, 0.2), 0 0 60px rgba(234, 179, 8, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
