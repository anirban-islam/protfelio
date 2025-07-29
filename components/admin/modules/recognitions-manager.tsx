"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Recognition {
  id: string
  title: string
  description: string
  icon: string
  color: string
  date: string
  issuer?: string
  credentialUrl?: string
}

export default function RecognitionsManager() {
  const [recognitions, setRecognitions] = useState<Recognition[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingRecognition, setEditingRecognition] = useState<Recognition | null>(null)
  const [loading, setLoading] = useState(true)

  const emptyRecognition: Omit<Recognition, "id"> = {
    title: "",
    description: "",
    icon: "🏆",
    color: "bg-purple-100 text-purple-700",
    date: new Date().toISOString().split("T")[0],
    issuer: "",
    credentialUrl: "",
  }

  const [formData, setFormData] = useState(emptyRecognition)
  const { toast } = useToast()

  const colorOptions = [
    { label: "Purple", value: "bg-purple-100 text-purple-700" },
    { label: "Blue", value: "bg-blue-100 text-blue-700" },
    { label: "Green", value: "bg-green-100 text-green-700" },
    { label: "Yellow", value: "bg-yellow-100 text-yellow-700" },
    { label: "Red", value: "bg-red-100 text-red-700" },
    { label: "Indigo", value: "bg-indigo-100 text-indigo-700" },
  ]

  useEffect(() => {
    fetchRecognitions()
  }, [])

  const fetchRecognitions = async () => {
    try {
      const response = await fetch("/api/admin/recognitions")
      if (response.ok) {
        const data = await response.json()
        setRecognitions(data)
      }
    } catch (error) {
      console.error("Error fetching recognitions:", error)
      toast({
        title: "Error",
        description: "Failed to fetch recognitions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const url = editingRecognition ? `/api/admin/recognitions/${editingRecognition.id}` : "/api/admin/recognitions"
      const method = editingRecognition ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchRecognitions()
        resetForm()
        toast({
          title: "Success",
          description: editingRecognition ? "Recognition updated!" : "Recognition created!",
        })
      } else {
        throw new Error("Failed to save recognition")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save recognition",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this recognition?")) {
      try {
        const response = await fetch(`/api/admin/recognitions/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          fetchRecognitions()
          toast({
            title: "Success",
            description: "Recognition deleted!",
          })
        } else {
          throw new Error("Failed to delete recognition")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete recognition",
          variant: "destructive",
        })
      }
    }
  }

  const resetForm = () => {
    setFormData(emptyRecognition)
    setEditingRecognition(null)
    setIsCreating(false)
  }

  const startEdit = (recognition: Recognition) => {
    setEditingRecognition(recognition)
    setFormData(recognition)
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recognitions Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your awards and achievements</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Recognition
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingRecognition ? "Edit Recognition" : "Create New Recognition"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Best Developer Award"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon (Emoji)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🏆"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description of the achievement..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issuer">Issuer (Optional)</Label>
                <Input
                  id="issuer"
                  value={formData.issuer || ""}
                  onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                  placeholder="e.g., Google, Microsoft"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentialUrl">Credential URL (Optional)</Label>
              <Input
                id="credentialUrl"
                value={formData.credentialUrl || ""}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                placeholder="https://example.com/credential"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color Theme</Label>
              <select
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                {colorOptions.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Recognition
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recognitions.map((recognition) => (
          <Card key={recognition.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${recognition.color}`}>
                  {recognition.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{recognition.title}</h3>
                  {recognition.issuer && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">by {recognition.issuer}</p>
                  )}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{recognition.description}</p>
                  <p className="text-xs text-gray-500">{new Date(recognition.date).toLocaleDateString()}</p>
                </div>
              </div>

              {recognition.credentialUrl && (
                <div className="mb-4">
                  <Button size="sm" variant="outline" asChild>
                    <a href={recognition.credentialUrl} target="_blank" rel="noopener noreferrer">
                      View Credential
                    </a>
                  </Button>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(recognition)}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(recognition.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recognitions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No recognitions yet. Add your first recognition!</p>
        </div>
      )}
    </div>
  )
}
