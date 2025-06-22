export const jonlorenzoRoyalTheme = {
  colors: {
    // Royal Dark Base
    royal: {
      50: "#1a1625",
      100: "#2d2438",
      200: "#40324b",
      300: "#53405e",
      400: "#664e71",
      500: "#795c84",
      600: "#8c6a97",
      700: "#9f78aa",
      800: "#b286bd",
      900: "#c594d0",
      950: "#d8a2e3",
    },
    // Illumination Gold
    illumination: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
      950: "#422006",
    },
    // Indigo Genius
    genius: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
      950: "#1e1b4b",
    },
    // Smart Accents
    smart: {
      cyan: "#06b6d4",
      emerald: "#10b981",
      violet: "#8b5cf6",
      rose: "#f43f5e",
      amber: "#f59e0b",
    },
  },
  effects: {
    illumination: {
      glow: "0 0 20px rgba(234, 179, 8, 0.3), 0 0 40px rgba(234, 179, 8, 0.2), 0 0 60px rgba(234, 179, 8, 0.1)",
      pulse: "0 0 30px rgba(234, 179, 8, 0.4), 0 0 60px rgba(234, 179, 8, 0.3), 0 0 90px rgba(234, 179, 8, 0.2)",
      royal: "0 0 25px rgba(121, 92, 132, 0.4), 0 0 50px rgba(121, 92, 132, 0.3)",
    },
    genius: {
      orb: "0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(99, 102, 241, 0.3), 0 0 90px rgba(99, 102, 241, 0.2)",
      reverberate:
        "0 0 40px rgba(99, 102, 241, 0.6), 0 0 80px rgba(99, 102, 241, 0.4), 0 0 120px rgba(99, 102, 241, 0.3)",
      trail: "0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(99, 102, 241, 0.2)",
    },
    smart: {
      border: "1px solid rgba(234, 179, 8, 0.3)",
      borderHover: "1px solid rgba(234, 179, 8, 0.6)",
      background: "rgba(26, 22, 37, 0.8)",
      backgroundHover: "rgba(26, 22, 37, 0.9)",
    },
  },
  gradients: {
    royal: "linear-gradient(135deg, #1a1625 0%, #2d2438 50%, #40324b 100%)",
    illumination: "linear-gradient(135deg, #eab308 0%, #facc15 50%, #fde047 100%)",
    genius: "linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)",
    royalIllumination: "linear-gradient(135deg, #1a1625 0%, #2d2438 30%, #eab308 70%, #facc15 100%)",
    smartGlow:
      "linear-gradient(135deg, rgba(26, 22, 37, 0.9) 0%, rgba(45, 36, 56, 0.8) 50%, rgba(234, 179, 8, 0.1) 100%)",
  },
  animations: {
    illuminationPulse: {
      "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
      "50%": { opacity: 1, transform: "scale(1.05)" },
    },
    geniusReverberate: {
      "0%": { transform: "scale(1)", boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)" },
      "25%": { transform: "scale(1.1)", boxShadow: "0 0 60px rgba(99, 102, 241, 0.7)" },
      "50%": { transform: "scale(1.2)", boxShadow: "0 0 90px rgba(99, 102, 241, 0.9)" },
      "75%": { transform: "scale(1.1)", boxShadow: "0 0 60px rgba(99, 102, 241, 0.7)" },
      "100%": { transform: "scale(1)", boxShadow: "0 0 30px rgba(99, 102, 241, 0.5)" },
    },
    royalFloat: {
      "0%, 100%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-10px)" },
    },
    smartGlow: {
      "0%, 100%": { boxShadow: "0 0 20px rgba(234, 179, 8, 0.3)" },
      "50%": { boxShadow: "0 0 40px rgba(234, 179, 8, 0.6)" },
    },
  },
}

export type JonlorenzoRoyalTheme = typeof jonlorenzoRoyalTheme
