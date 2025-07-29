"use client"

import { Edit, Loader2, Plus, Save, Star, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface Testimonial {
  id: string
  name: string
  location: string
  city: string
  comment: string
  rating: number
  avatar: string
  date: string
  company?: string
  position?: string
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [loading, setLoading] = useState(true)

  const emptyTestimonial: Omit<Testimonial, "id"> = {
    name: "",
    location: "",
    city:"",
    comment: "",
    rating: 5,
    avatar: "",
    date: new Date().toLocaleDateString(),
    company: "",
    position: "",
  }

  const [formData, setFormData] = useState(emptyTestimonial)
  const { toast } = useToast()

   useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials")
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      } else {
        throw new Error("Failed to fetch testimonials")
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const url = editingTestimonial
        ? `/api/admin/testimonials/${editingTestimonial}`
        : "/api/admin/testimonials"
      const method = editingTestimonial ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      console.log("Response:", formData)
      if (!response.ok) throw new Error("Failed to save testimonial")

      await fetchTestimonials()
      resetForm()

      toast({
        title: "Success",
        description: editingTestimonial ? "Testimonial updated!" : "Testimonial created!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      })
    }
  }


  const handleDelete = async (id: string) => {
    console.log(id)
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const response = await fetch(`/api/admin/testimonials/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          fetchTestimonials()
          toast({
            title: "Success",
            description: "Testimonial deleted!",
          })
        } else {
          throw new Error("Failed to delete testimonial")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete testimonial",
          variant: "destructive",
        })
      }
    }
  }

  const resetForm = () => {
    setFormData(emptyTestimonial)
    setEditingTestimonial(null)
    setIsCreating(false)
  }

  const startEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData(testimonial)
    setIsCreating(true)
  }

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive ? () => setFormData({ ...formData, rating: star }) : undefined}
          />
        ))}
      </div>
    )
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage client testimonials and reviews</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTestimonial ? "Edit Testimonial" : "Create New Testimonial"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter client name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Country"
                />
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input
                  id="company"
                  value={formData.company || ""}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position (Optional)</Label>
                <Input
                  id="position"
                  value={formData.position || ""}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Job position"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Testimonial</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Client's feedback..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              {renderStars(formData.rating, true)}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Testimonial
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  {testimonial.position && testimonial.company && (
                    <p className="text-sm text-gray-600">
                      {testimonial.position} at {testimonial.company}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                  <p className="text-xs text-gray-400 mt-1">{testimonial.date}</p>
                </div>
              </div>

              {renderStars(testimonial.rating)}

              <blockquote className="text-gray-700 dark:text-gray-300 text-sm mt-3 mb-4 italic">
                "{testimonial.comment}"
              </blockquote>

              <div className="flex justify-end space-x-2">
                {/* <Button size="sm" variant="outline" onClick={() => startEdit(testimonial)}>
                  <Edit className="w-3 h-3" />
                </Button> */}
                <Button size="sm" variant="destructive" onClick={() => handleDelete(testimonial._id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No testimonials yet. Add your first testimonial!
          </p>
        </div>
      )}
    </div>
  )
}
