"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Save, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface HeroData {
  name: string
  title: string
  location: string
  languages: string
  profession: string
  university: string
  isAvailable: boolean
  profileImage: string
  resumeUrl: string
  bio: string
}

export default function HeroSettings() {
  const [heroData, setHeroData] = useState<HeroData>({
    name: "Anirban Islam Emon",
    title: "I'm a Developer",
    location: "Bangladesh",
    languages: "Bangla, English",
    profession: "Computer Engineer",
    university: "Varendra University",
    isAvailable: true,
    profileImage: "",
    resumeUrl: "",
    bio: "Hi! I'm Anirban Islam Emon, a dedicated Computer Science & Engineering (CSE) student and a passionate Full-Stack Developer.",
  })

  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchHeroData()
  }, [])

  const fetchHeroData = async () => {
    try {
      const response = await fetch("/api/admin/hero")
      if (response.ok) {
        const data = await response.json()
        setHeroData(data)
      }
    } catch (error) {
      console.error("Error fetching hero data:", error)
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(heroData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Hero settings updated successfully!",
        })
      } else {
        throw new Error("Failed to update hero settings")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update hero settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your profile information and availability status</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={heroData.name}
                onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title/Tagline</Label>
              <Input
                id="title"
                value={heroData.title}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                placeholder="Your professional title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={heroData.location}
                onChange={(e) => setHeroData({ ...heroData, location: e.target.value })}
                placeholder="Your location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              <Input
                id="languages"
                value={heroData.languages}
                onChange={(e) => setHeroData({ ...heroData, languages: e.target.value })}
                placeholder="Languages you speak"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <Input
                id="profession"
                value={heroData.profession}
                onChange={(e) => setHeroData({ ...heroData, profession: e.target.value })}
                placeholder="Your profession"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Input
                id="university"
                value={heroData.university}
                onChange={(e) => setHeroData({ ...heroData, university: e.target.value })}
                placeholder="Your university"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input
                id="resumeUrl"
                value={heroData.resumeUrl}
                onChange={(e) => setHeroData({ ...heroData, resumeUrl: e.target.value })}
                placeholder="https://example.com/resume.pdf"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="availability"
                checked={heroData.isAvailable}
                onCheckedChange={(checked) => setHeroData({ ...heroData, isAvailable: checked })}
              />
              <Label htmlFor="availability">Available for work</Label>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="bio">About You</Label>
              <Textarea
                id="bio"
                value={heroData.bio}
                onChange={(e) => setHeroData({ ...heroData, bio: e.target.value })}
                placeholder="Write a brief bio about yourself..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload profile image</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
            </div>
            <Input
              type="url"
              placeholder="Or enter image URL"
              value={heroData.profileImage}
              onChange={(e) => setHeroData({ ...heroData, profileImage: e.target.value })}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
