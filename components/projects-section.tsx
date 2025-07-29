"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600">🚀</span>
          <span>Projects I have completed!</span>
        </CardTitle>
        <p className="text-sm text-gray-600">Visit my work Gallery to get an Idea!</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={project._id || index}
              className="group cursor-pointer"
              onClick={() => window.open(project.url || "#", "_blank")}
            >
              <div className="relative overflow-hidden rounded-lg mb-2">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
              <h3 className="font-medium text-sm text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
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
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
