import type React from "react"
import Image from "next/image"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-700">
      <div className="relative">
        <Image
          src="/jonlorenzo-coin.png"
          alt="Jon'Lorenzo Caprelli - Digital Creator of Global Economics"
          width={400}
          height={400}
          className="animate-pulse drop-shadow-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-yellow-300/20 rounded-full animate-ping"></div>
      </div>
    </div>
  )
}
