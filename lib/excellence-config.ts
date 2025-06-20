export const EXCELLENCE_CONFIG = {
  // Visual Excellence
  theme: {
    primary: {
      50: "#eef2ff",
      100: "#e0e7ff",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      900: "#312e81",
    },
    gradients: {
      primary: "from-indigo-600 via-purple-600 to-pink-600",
      secondary: "from-purple-500 via-pink-500 to-red-500",
      accent: "from-blue-500 via-indigo-500 to-purple-500",
      success: "from-green-400 to-emerald-600",
      warning: "from-yellow-400 to-orange-600",
      danger: "from-red-400 to-rose-600",
    },
    animations: {
      duration: {
        fast: "150ms",
        normal: "300ms",
        slow: "500ms",
      },
      easing: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },

  // Performance Excellence
  performance: {
    caching: {
      enabled: true,
      ttl: 300000, // 5 minutes
    },
    optimization: {
      lazyLoading: true,
      imageOptimization: true,
      bundleSplitting: true,
    },
    monitoring: {
      enabled: true,
      sampleRate: 0.1,
    },
  },

  // Security Excellence
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
    cors: {
      origin: process.env.NODE_ENV === "production" ? ["https://yourdomain.com"] : true,
      credentials: true,
    },
    headers: {
      contentSecurityPolicy: true,
      hsts: true,
      noSniff: true,
    },
  },

  // Feature Excellence
  features: {
    realTimeUpdates: true,
    offlineSupport: true,
    pushNotifications: true,
    analytics: true,
    a11y: true,
    i18n: true,
  },
} as const
