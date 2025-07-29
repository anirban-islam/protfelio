"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface HeroData {
  name: string
  title: string
  location: string
  languages: string
  profession: string
  university: string
  isAvailable: boolean
  profileImage: string
  resumeUrl: string
}

export function HeroSection() {
  const [hero, setHero] = useState<HeroData | null>(null)

  useEffect(() => {
    fetchHero()
  }, [])

  const fetchHero = async () => {
    try {
      const response = await fetch("/api/admin/hero")
      if (response.ok) {
        const data = await response.json()
        setHero(data)
        // console.log("✅ Hero data:", data)
      }
    } catch (error) {
      console.error("❌ Failed to fetch hero data:", error)
    }
  }

  return (
    <Card className="p-6">
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={hero?.profileImage || "/placeholder.svg"}
                alt={hero?.name || "Profile image"}
                width={60}
                height={60}
                className="rounded-xl object-cover"
              />
              {hero?.isAvailable && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            <div>
              {hero?.isAvailable && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 mb-2"
                >
                  Available to work
                </Badge>
              )}
            </div>
          </div>

          {hero?.resumeUrl ? (
            <Button asChild variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
              <a href={hero.resumeUrl} download target="_blank" rel="noopener noreferrer">
                <span>Resume</span>
                <Download className="w-4 h-4" />
              </a>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              disabled
              className="flex items-center space-x-2 bg-transparent opacity-50"
            >
              <span>Resume</span>
              <Download className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{hero?.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">{hero?.title}</p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1">
              <span className="text-blue-600">📍</span>
              <span>{hero?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-blue-600">🌐</span>
              <span>{hero?.languages}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1">
              <span className="text-purple-600">👨‍💻</span>
              <span>{hero?.profession}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-blue-600">🎓</span>
              <span>{hero?.university}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
