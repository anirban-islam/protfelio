"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Solution {
  _id: string
  name: string
  isActive: boolean
  order: number
}

export function SolutionsManager() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const emptySolution = {
    name: "",
    isActive: true,
    order: 0,
  }

  const [formData, setFormData] = useState(emptySolution)

  useEffect(() => {
    fetchSolutions()
  }, [])

  const fetchSolutions = async () => {
    try {
      const response = await fetch("/api/admin/solutions")
      const data = await response.json()
      setSolutions(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch solutions",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const url = editingSolution ? `/api/admin/solutions/${editingSolution._id}` : "/api/admin/solutions"
      const method = editingSolution ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchSolutions()
        resetForm()
        toast({
          title: "Success",
          description: editingSolution ? "Solution updated!" : "Solution created!",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save solution",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this solution?")) {
      try {
        const response = await fetch(`/api/admin/solutions/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          fetchSolutions()
          toast({
            title: "Success",
            description: "Solution deleted!",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete solution",
          variant: "destructive",
        })
      }
    }
  }

  const resetForm = () => {
    setFormData(emptySolution)
    setEditingSolution(null)
    setIsCreating(false)
  }

  const startEdit = (solution: Solution) => {
    setEditingSolution(solution)
    setFormData(solution)
    setIsCreating(true)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Solutions Manager</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your service offerings</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Solution
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingSolution ? "Edit Solution" : "Create New Solution"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Solution Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Web App Development"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Solution
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {solutions.map((solution) => (
          <Card key={solution._id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{solution.name}</h3>
                  <div className="mt-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        solution.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {solution.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(solution)}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(solution._id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
