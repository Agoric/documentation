export const ImperialDesignSystem = {
  colors: {
    // Primary Imperial Palette
    imperial: {
      gold: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
        950: "#451a03",
      },
      purple: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff",
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7",
        600: "#9333ea",
        700: "#7c3aed",
        800: "#6b21a8",
        900: "#581c87",
        950: "#3b0764",
      },
      bronze: {
        50: "#fefaf5",
        100: "#fdf2e9",
        200: "#fae1c7",
        300: "#f6ca9f",
        400: "#f0a76f",
        500: "#e8834a",
        600: "#d4622a",
        700: "#b8491f",
        800: "#9a3b1c",
        900: "#7f321a",
        950: "#44180a",
      },
      marble: {
        50: "#f8fafc",
        100: "#f1f5f9",
        200: "#e2e8f0",
        300: "#cbd5e1",
        400: "#94a3b8",
        500: "#64748b",
        600: "#475569",
        700: "#334155",
        800: "#1e293b",
        900: "#0f172a",
        950: "#020617",
      },
    },
    // Accent Colors
    accent: {
      emerald: "#10b981",
      sapphire: "#3b82f6",
      ruby: "#ef4444",
      diamond: "#f8fafc",
    },
  },

  typography: {
    imperial: {
      display: "Cinzel, serif",
      heading: "Playfair Display, serif",
      body: "Inter, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
  },

  effects: {
    glow: {
      gold: "0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)",
      purple: "0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)",
      bronze: "0 0 20px rgba(217, 119, 6, 0.5), 0 0 40px rgba(217, 119, 6, 0.3)",
    },
    shadow: {
      imperial: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(251, 191, 36, 0.1)",
      regal: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
  },

  patterns: {
    imperial: `
      radial-gradient(circle at 25% 25%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
      linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)
    `,
    marble: `
      linear-gradient(135deg, rgba(248, 250, 252, 0.1) 0%, rgba(226, 232, 240, 0.05) 50%, rgba(248, 250, 252, 0.1) 100%)
    `,
    ornate: `
      repeating-linear-gradient(
        45deg,
        rgba(251, 191, 36, 0.03) 0px,
        rgba(251, 191, 36, 0.03) 1px,
        transparent 1px,
        transparent 20px
      ),
      repeating-linear-gradient(
        -45deg,
        rgba(168, 85, 247, 0.03) 0px,
        rgba(168, 85, 247, 0.03) 1px,
        transparent 1px,
        transparent 20px
      )
    `,
  },
}

export const getImperialGradient = (variant: "gold" | "purple" | "bronze" | "marble") => {
  switch (variant) {
    case "gold":
      return "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(217, 119, 6, 0.1) 50%, rgba(251, 191, 36, 0.2) 100%)"
    case "purple":
      return "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(124, 58, 237, 0.1) 50%, rgba(168, 85, 247, 0.2) 100%)"
    case "bronze":
      return "linear-gradient(135deg, rgba(217, 119, 6, 0.2) 0%, rgba(180, 83, 9, 0.1) 50%, rgba(217, 119, 6, 0.2) 100%)"
    case "marble":
      return "linear-gradient(135deg, rgba(248, 250, 252, 0.1) 0%, rgba(226, 232, 240, 0.05) 50%, rgba(248, 250, 252, 0.1) 100%)"
    default:
      return "linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(251, 191, 36, 0.2) 100%)"
  }
}
