"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface AboutData {
  bio: string
  mission: string
  goals: string[]
  currentlyLearning: string[]
}

export function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutData>({
    bio: "👋 Hi! I'm Anirban Islam Emon, a dedicated Computer Science & Engineering (CSE) student and a passionate Full-Stack Developer with a strong focus on building modern, scalable, and high-performance web applications.",
    mission:
      "My mission is simple — Build impactful products that deliver exceptional value to users and businesses while improving continuously as a developer.",
    goals: [
      "Build scalable web applications",
      "Learn new technologies continuously",
      "Help businesses grow through technology",
    ],
    currentlyLearning: ["Next.js 14", "TypeScript", "GraphQL"],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const response = await fetch("/api/about")
      if (response.ok) {
        const data = await response.json()
        setAboutData(data)
      } else {
        console.error("Failed to fetch about data")
      }
    } catch (error) {
      console.error("Error fetching about data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-purple-600">👋</span>
            <span>About me</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 animate-pulse">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600">👋</span>
          <span>About me</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2"></h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2"></p>

          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">{aboutData.bio}</p>

          {/* <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
            🚀 I specialize in crafting seamless digital experiences using:
            <br />• Next.js — For fast, production-ready, and SEO-friendly frontends
            <br />• MongoDB — For powerful and flexible database management
            <br />• Modern Web Technologies — React, Express.js, Node.js, REST APIs, and more
          </p> */}
        </div>

        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">🎯 My Mission</h4>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">{aboutData.mission}</p>
        </div>

        {aboutData.goals && aboutData.goals.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">🎯 Goals</h4>
            <div className="space-y-1 mb-4">
              {aboutData.goals.map((goal, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-purple-600 text-sm">•</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {aboutData.currentlyLearning && aboutData.currentlyLearning.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">🚀 Currently Learning</h4>
            <div className="flex flex-wrap gap-2">
              {aboutData.currentlyLearning.map((item, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
