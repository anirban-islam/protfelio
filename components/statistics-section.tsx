"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Calendar, Code } from "lucide-react"

interface Stats {
  projectsCompleted: number
  happyClients: number
  yearsExperience: number
  technologiesMastered: number
}

export function StatisticsSection() {
  const [stats, setStats] = useState<Stats>({
    projectsCompleted: 50,
    happyClients: 30,
    yearsExperience: 5,
    technologiesMastered: 25,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        console.error("Failed to fetch stats")
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statisticsData = [
    {
      icon: TrendingUp,
      value: `${stats.projectsCompleted}+`,
      label: "Projects Completed",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      icon: Users,
      value: `${stats.happyClients}+`,
      label: "Happy Clients",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      icon: Calendar,
      value: `${stats.yearsExperience}+`,
      label: "Years Experience",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      icon: Code,
      value: `${stats.technologiesMastered}+`,
      label: "Technologies",
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-4">
            <CardContent className="p-0 text-center animate-pulse">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {statisticsData.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
            <CardContent className="p-0 text-center">
              <div className={`inline-flex p-2 rounded-full ${stat.bgColor} mb-2`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
