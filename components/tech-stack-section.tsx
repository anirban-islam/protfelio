"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"

interface TechItem {
  _id: string
  name: string
  category: string
  color: string
  proficiency: number
  logo?: string
  workAs?: string
}

export function TechStackSection() {
  const [techStack, setTechStack] = useState<TechItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetchTechStack()
  }, [])

  const fetchTechStack = async () => {
    try {
      const response = await fetch("/api/tech-stack")
      if (response.ok) {
        const data = await response.json()
        setTechStack(data)
      } else {
        console.error("Failed to fetch tech stack")
        setTechStack([
          {
            _id: "1",
            name: "Next.js",
            category: "Frontend",
            color: "bg-black text-white dark:bg-white dark:text-black",
            proficiency: 90,
          },
          { _id: "2", name: "JavaScript", category: "Language", color: "bg-yellow-400 text-black", proficiency: 95 },
          { _id: "3", name: "React", category: "Frontend", color: "bg-blue-500 text-white", proficiency: 90 },
          { _id: "4", name: "Node.js", category: "Backend", color: "bg-green-500 text-white", proficiency: 85 },
          { _id: "5", name: "MongoDB", category: "Database", color: "bg-green-600 text-white", proficiency: 80 },
          { _id: "6", name: "TypeScript", category: "Language", color: "bg-blue-600 text-white", proficiency: 85 },
          { _id: "7", name: "Tailwind", category: "Styling", color: "bg-cyan-500 text-white", proficiency: 90 },
          {
            _id: "8",
            name: "GitHub",
            category: "Tools",
            color: "bg-gray-800 text-white dark:bg-gray-200 dark:text-black",
            proficiency: 85,
          },
        ])
      }
    } catch (error) {
      console.error("Error fetching tech stack:", error)
      setTechStack([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-purple-600 dark:text-purple-400">⚡</span>
            <span className="text-gray-900 dark:text-white">Tech Arsenal!</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 animate-pulse"
              >
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  const displayedTechStack = showAll ? techStack : techStack.slice(0, 8)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600 dark:text-purple-400">⚡</span>
          <span className="text-gray-900 dark:text-white">Tech Arsenal!</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {displayedTechStack.map((tech) => (
            <div
              key={tech._id}
              className="flex items-center space-x-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
            >
              {tech.logo ? (
                <Image
                  src={tech.logo || "/placeholder.svg"}
                  alt={tech.name}
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              ) : (
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${tech.color} shadow-sm`}
                >
                  {tech.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{tech.name}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{tech.category}</p>
                  <span className="text-xs text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {tech.proficiency}%
                  </span>
                </div>
                {tech.workAs && <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{tech.workAs}</p>}
              </div>
            </div>
          ))}
        </div>

        {techStack.length > 8 && (
          <button
            className="mt-4 text-sm text-blue-600 hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "See Less" : "See More"}
          </button>
        )}

        {techStack.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No technologies to display yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
