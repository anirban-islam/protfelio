"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AboutData {
  bio: string
  mission: string
  goals: string[]
  currentlyLearning: string[]
}

export default function AboutSettings() {
  const [aboutData, setAboutData] = useState<AboutData>({
    bio: "",
    mission: "",
    goals: [],
    currentlyLearning: [],
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newGoal, setNewGoal] = useState("")
  const [newLearning, setNewLearning] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const response = await fetch("/api/admin/about")
      if (response.ok) {
        const data = await response.json()
        setAboutData(data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch about data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aboutData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "About section updated successfully",
        })
      } else {
        throw new Error("Failed to update about data")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about data",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const addGoal = () => {
    if (newGoal.trim()) {
      setAboutData((prev) => ({
        ...prev,
        goals: [...prev.goals, newGoal.trim()],
      }))
      setNewGoal("")
    }
  }

  const removeGoal = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index),
    }))
  }

  const addLearning = () => {
    if (newLearning.trim()) {
      setAboutData((prev) => ({
        ...prev,
        currentlyLearning: [...prev.currentlyLearning, newLearning.trim()],
      }))
      setNewLearning("")
    }
  }

  const removeLearning = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      currentlyLearning: prev.currentlyLearning.filter((_, i) => i !== index),
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
          <CardTitle>About Section Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={aboutData.bio}
              onChange={(e) => setAboutData((prev) => ({ ...prev, bio: e.target.value }))}
              placeholder="Write your bio..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="mission">Mission Statement</Label>
            <Textarea
              id="mission"
              value={aboutData.mission}
              onChange={(e) => setAboutData((prev) => ({ ...prev, mission: e.target.value }))}
              placeholder="Your mission statement..."
              rows={3}
            />
          </div>

          <div>
            <Label>Goals</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Add a new goal..."
                  onKeyPress={(e) => e.key === "Enter" && addGoal()}
                />
                <Button onClick={addGoal} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutData.goals.map((goal, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {goal}
                    <button onClick={() => removeGoal(index)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label>Currently Learning</Label>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newLearning}
                  onChange={(e) => setNewLearning(e.target.value)}
                  placeholder="Add something you're learning..."
                  onKeyPress={(e) => e.key === "Enter" && addLearning()}
                />
                <Button onClick={addLearning} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {aboutData.currentlyLearning.map((item, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {item}
                    <button onClick={() => removeLearning(index)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
