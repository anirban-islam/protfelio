"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

interface Project {
  _id: string
  title: string
  description: string
  image: string
  techStack: string[]
  url: string
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({})
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/admin/projects")
        const data = await res.json()
        setProjects(data)
      } catch (error) {
        console.error("Failed to load projects:", error)
      }
    }

    fetchProjects()
  }, [])

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const isProjectPage = pathname === "/projects"
  const visibleProjects = isProjectPage ? projects : projects.slice(0, 4)

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600">🚀</span>
          <span>Projects I have completed!</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Visit my work Gallery to get an Idea!</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {visibleProjects.map((project, index) => {
            const isExpanded = expanded[project._id]
            const shortDesc = project.description.slice(0, 100)

            return (
              <div
                key={project._id || index}
                className="group cursor-pointer shadow-md rounded-lg p-3 bg-white dark:bg-gray-900 hover:shadow-lg transition-shadow duration-200"
                onClick={() => window.open(project.url || "#", "_blank")}
              >
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </div>
                </div>

                <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-1">
                  {project.title}
                </h3>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {isExpanded ? project.description : `${shortDesc}...`}
                  {project.description.length > 100 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleExpand(project._id)
                      }}
                      className="ml-1 text-blue-500 hover:underline"
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  )}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {!isProjectPage && projects.length > 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => router.push("/projects")}
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              View More →
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
