"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Trash2, Edit, Upload, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Technology {
  _id: string
  name: string
  category: string
  proficiency: number
  logo: string
  workAs: string
  color: string
}

const categories = ["Frontend", "Backend", "Database", "DevOps", "Mobile", "Other"]
const categoryColors = {
  Frontend: "#3B82F6",
  Backend: "#10B981",
  Database: "#F59E0B",
  DevOps: "#EF4444",
  Mobile: "#8B5CF6",
  Other: "#6B7280",
}

export default function TechStackManager() {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    proficiency: 50,
    logo: "",
    workAs: "",
    color: "#3B82F6",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchTechnologies()
  }, [])

  const fetchTechnologies = async () => {
    try {
      const response = await fetch("/api/admin/tech-stack")
      if (response.ok) {
        const data = await response.json()
        setTechnologies(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch technologies",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingId ? `/api/admin/tech-stack/${editingId}` : "/api/admin/tech-stack"

      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Technology ${editingId ? "updated" : "created"} successfully`,
        })
        resetForm()
        fetchTechnologies()
      } else {
        throw new Error("Failed to save technology")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingId ? "update" : "create"} technology`,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (tech: Technology) => {
    setEditingId(tech._id)
    setFormData({
      name: tech.name,
      category: tech.category,
      proficiency: tech.proficiency,
      logo: tech.logo,
      workAs: tech.workAs,
      color: tech.color,
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this technology?")) return

    try {
      const response = await fetch(`/api/admin/tech-stack/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Technology deleted successfully",
        })
        fetchTechnologies()
      } else {
        throw new Error("Failed to delete technology")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete technology",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setFormData((prev) => ({ ...prev, logo: data.url }))
        toast({
          title: "Success",
          description: "Logo uploaded successfully",
        })
      } else {
        throw new Error("Failed to upload logo")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      name: "",
      category: "Frontend",
      proficiency: 50,
      logo: "",
      workAs: "",
      color: "#3B82F6",
    })
  }

  const handleCategoryChange = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      category,
      color: categoryColors[category as keyof typeof categoryColors],
    }))
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
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? "Edit Technology" : "Add New Technology"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Technology Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., React, Node.js"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="workAs">Work As</Label>
              <Input
                id="workAs"
                value={formData.workAs}
                onChange={(e) => setFormData((prev) => ({ ...prev, workAs: e.target.value }))}
                placeholder="e.g., Frontend Framework, Database"
              />
            </div>

            <div>
              <Label htmlFor="proficiency">Proficiency: {formData.proficiency}%</Label>
              <Slider
                value={[formData.proficiency]}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, proficiency: value[0] }))}
                max={100}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Logo</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={formData.logo}
                    onChange={(e) => setFormData((prev) => ({ ...prev, logo: e.target.value }))}
                    placeholder="Logo URL or upload file"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                    <Button type="button" variant="outline" disabled={uploading}>
                      {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {formData.logo && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={formData.logo || "/placeholder.svg"}
                      alt="Logo preview"
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <span className="text-sm text-muted-foreground">Logo preview</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Update Technology" : "Add Technology"}</Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>⚡ Tech Arsenal ({technologies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technologies.map((tech) => (
              <Card key={tech._id} className="relative">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {tech.logo && (
                        <Image
                          src={tech.logo || "/placeholder.svg"}
                          alt={tech.name}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                      )}
                      <h3 className="font-semibold">{tech.name}</h3>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(tech)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(tech._id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <Badge
                    variant="secondary"
                    style={{ backgroundColor: tech.color + "20", color: tech.color }}
                    className="mb-2"
                  >
                    {tech.category}
                  </Badge>

                  {tech.workAs && <p className="text-sm text-muted-foreground mb-2">{tech.workAs}</p>}

                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Proficiency</span>
                      <span>{tech.proficiency}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${tech.proficiency}%`,
                          backgroundColor: tech.color,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {technologies.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No technologies added yet. Add your first technology above!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
