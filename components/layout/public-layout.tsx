import type React from "react"
import { Navigation } from "@/components/navigation"
import { LeftAside } from "./left-aside"
import { RightAside } from "./right-aside"

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Aside - 25% */}
          <div className="lg:col-span-1">
            <LeftAside />
          </div>

          {/* Middle Content - 50% */}
          <div className="lg:col-span-2">{children}</div>

          {/* Right Aside - 25% */}
          <div className="lg:col-span-1">
            <RightAside />
          </div>
        </div>
      </div>
    </div>
  )
}
