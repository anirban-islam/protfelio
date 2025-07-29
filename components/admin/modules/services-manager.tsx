"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Save, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Service {
  id: string
  title: string
  description: string
  isActive: boolean
  icon: string
  price?: string
  features?: string[]
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  const emptyService: Omit<Service, "id"> = {
    title: "",
    description: "",
    isActive: true,
    icon: "💼",
    price: "",
    features: [],
  }

  const [formData, setFormData] = useState(emptyService)
  const [featureInput, setFeatureInput] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/admin/services")
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      }
    } catch (error) {
      console.error("Error fetching services:", error)
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const url = editingService ? `/api/admin/services/${editingService.id}` : "/api/admin/services"
      const method = editingService ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchServices()
        resetForm()
        toast({
          title: "Success",
          description: editingService ? "Service updated!" : "Service created!",
        })
      } else {
        throw new Error("Failed to save service")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save service",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await fetch(`/api/admin/services/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          fetchServices()
          toast({
            title: "Success",
            description: "Service deleted!",
          })
        } else {
          throw new Error("Failed to delete service")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete service",
          variant: "destructive",
        })
      }
    }
  }

  const resetForm = () => {
    setFormData(emptyService)
    setEditingService(null)
    setIsCreating(false)
    setFeatureInput("")
  }

  const startEdit = (service: Service) => {
    setEditingService(service)
    setFormData(service)
    setIsCreating(true)
  }

  const addFeature = () => {
    if (featureInput.trim() && !formData.features?.includes(featureInput.trim())) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()],
      })
      setFeatureInput("")
    }
  }

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((f) => f !== feature) || [],
    })
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your service offerings</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingService ? "Edit Service" : "Create New Service"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Front End Development"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon (Emoji)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="💼"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the service..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (Optional)</Label>
              <Input
                id="price"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., Starting at $500"
              />
            </div>

            <div className="space-y-2">
              <Label>Features (Optional)</Label>
              <div className="flex space-x-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a feature"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature}>
                  Add
                </Button>
              </div>
              {formData.features && formData.features.length > 0 && (
                <div className="space-y-1">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{feature}</span>
                      <Button size="sm" variant="ghost" onClick={() => removeFeature(feature)} className="h-6 w-6 p-0">
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Service is active</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Service
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-3xl">{service.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        service.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{service.description}</p>
                  {service.price && <p className="text-sm font-medium text-blue-600 mb-2">{service.price}</p>}
                  {service.features && service.features.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700 mb-1">Features:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                        {service.features.length > 3 && <li>• +{service.features.length - 3} more...</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(service)}>
                  <Edit className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No services yet. Add your first service!</p>
        </div>
      )}
    </div>
  )
}
