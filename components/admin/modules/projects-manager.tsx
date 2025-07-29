"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Edit, ExternalLink, Github, Loader2, Plus, Save, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"

interface Project {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  url: string
  githubUrl: string
  featured: boolean
  status: "completed" | "in-progress" | "planned"
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)

  const emptyProject: Omit<Project, "id"> = {
    title: "",
    description: "",
    image: "",
    techStack: [],
    url: "",
    githubUrl: "",
    featured: false,
    status: "completed",
  }

  const [formData, setFormData] = useState(emptyProject)
  const [techInput, setTechInput] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const url = editingProject ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects"
      const method = editingProject ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchProjects()
        resetForm()
        toast({
          title: "Success",
          description: editingProject ? "Project updated!" : "Project created!",
        })
      } else {
        throw new Error("Failed to save project")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/admin/projects/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          fetchProjects()
          toast({
            title: "Success",
            description: "Project deleted!",
          })
        } else {
          throw new Error("Failed to delete project")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        })
      }
    }
  }

  const resetForm = () => {
    setFormData(emptyProject)
    setEditingProject(null)
    setIsCreating(false)
    setTechInput("")
  }

  const addTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()],
      })
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
    })
  }

  const startEdit = (project: Project) => {
    setEditingProject(project)
    setFormData(project)
    setIsCreating(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProject ? "Edit Project" : "Create New Project"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter project title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Project["status"] })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="url">Live Demo URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Project Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <div className="flex space-x-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Add technology"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                />
                <Button type="button" onClick={addTech}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTech(tech)}>
                    {tech} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
              <Label htmlFor="featured">Featured project</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video bg-gray-200 overflow-hidden">
              {project.image ? (
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <Badge variant={project.featured ? "default" : "secondary"}>
                  {project.featured ? "Featured" : "Regular"}
                </Badge>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {project.techStack.slice(0, 3).map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.techStack.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.techStack.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {project.url && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(project)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No projects yet. Create your first project!</p>
        </div>
      )}
    </div>
  )
}
