export const regalTheme = {
  colors: {
    // Primary Regal Colors
    imperial: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef",
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75",
      950: "#4a044e",
    },
    // Gold Accents
    aurum: {
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
    // Roman Purple
    purpura: {
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
    // Marble White
    marble: {
      50: "#ffffff",
      100: "#fefefe",
      200: "#fefefe",
      300: "#fdfdfd",
      400: "#fcfcfc",
      500: "#fafafa",
      600: "#f5f5f5",
      700: "#e5e5e5",
      800: "#d4d4d4",
      900: "#a3a3a3",
      950: "#525252",
    },
  },
  gradients: {
    imperial: "from-imperial-600 via-purpura-600 to-imperial-700",
    aurum: "from-aurum-400 via-aurum-500 to-aurum-600",
    regal: "from-purpura-900 via-imperial-800 to-purpura-900",
    marble: "from-marble-50 via-marble-100 to-marble-200",
    authority: "from-aurum-400 via-imperial-500 to-purpura-600",
  },
  shadows: {
    imperial: "0 25px 50px -12px rgba(168, 85, 247, 0.25)",
    aurum: "0 25px 50px -12px rgba(251, 191, 36, 0.25)",
    regal: "0 35px 60px -12px rgba(107, 33, 168, 0.4)",
  },
}

export type RegalTheme = typeof regalTheme
