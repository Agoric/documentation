import { FuturisticCommandCenter } from "@/components/navigation/futuristic-command-center"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <FuturisticCommandCenter />

      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Welcome Message */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-6 max-w-2xl mx-auto px-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Neural Command Center
          </h1>
          <p className="text-xl text-purple-300/80 leading-relaxed">
            Welcome to the future of digital interaction. Use the floating navigation orb or press{" "}
            <kbd className="px-3 py-1 bg-purple-800/50 rounded-lg text-cyan-300 font-mono">⌘K</kbd> to access all realms
            instantly.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-purple-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Neural Network Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span>AI Assistant Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
