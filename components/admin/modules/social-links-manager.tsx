"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Facebook, Twitter, Linkedin, Mail, Github, Instagram, Youtube, Globe } from "lucide-react"
import { Plus, Edit, Trash2, Save, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SocialLink {
  id: string
  platform: string
  username: string
  url: string
  isActive: boolean
}

export default function SocialLinksManager() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null)
  const [loading, setLoading] = useState(true)

  const emptyLink: Omit<SocialLink, "id"> = {
    platform: "GitHub",
    username: "",
    url: "",
    isActive: true,
  }

  const [formData, setFormData] = useState(emptyLink)
  const { toast } = useToast()

  const platforms = [
    { name: "GitHub", icon: Github, baseUrl: "https://github.com/" },
    { name: "LinkedIn", icon: Linkedin, baseUrl: "https://linkedin.com/in/" },
    { name: "Twitter", icon: Twitter, baseUrl: "https://twitter.com/" },
    { name: "Facebook", icon: Facebook, baseUrl: "https://facebook.com/" },
    { name: "Instagram", icon: Instagram, baseUrl: "https://instagram.com/" },
    { name: "YouTube", icon: Youtube, baseUrl: "https://youtube.com/@" },
    { name: "Email", icon: Mail, baseUrl: "mailto:" },
    { name: "Website", icon: Globe, baseUrl: "https://" },
  ]

  useEffect(() => {
    fetchSocialLinks()
  }, [])

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch("/api/admin/social-links")
      if (response.ok) {
        const data = await response.json()
        setSocialLinks(data)
      }
    } catch (error) {
      console.error("Error fetching social links:", error)
      toast({
        title: "Error",
        description: "Failed to fetch social links",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const url = editingLink ? `/api/admin/social-links/${editingLink.id}` : "/api/admin/social-links"
      const method = editingLink ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchSocialLinks()
        resetForm()
        toast({
          title: "Success",
          description: editingLink ? "Social link updated!" : "Social link created!",
        })
      } else {
        throw new Error("Failed to save social link")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save social link",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this social link?")) {
      try {
        const response = await fetch(`/api/admin/social-links/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          fetchSocialLinks()
          toast({
            title: "Success",
            description: "Social link deleted!",
          })
        } else {
          throw new Error("Failed to delete social link")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete social link",
          variant: "destructive",
        })
      }
    }
  }

  const resetForm = () => {
    setFormData(emptyLink)
    setEditingLink(null)
    setIsCreating(false)
  }

  const startEdit = (link: SocialLink) => {
    setEditingLink(link)
    setFormData(link)
    setIsCreating(true)
  }

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find((p) => p.name === platform)
    return platformData ? platformData.icon : Globe
  }

  const generateUrl = (platform: string, username: string) => {
    const platformData = platforms.find((p) => p.name === platform)
    if (!platformData || !username) return ""

    if (platform === "Email") {
      return `mailto:${username}`
    }

    return `${platformData.baseUrl}${username}`
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Social Links Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your social media profiles</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Social Link
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingLink ? "Edit Social Link" : "Create New Social Link"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Select
                  value={formData.platform}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      platform: value,
                      url: generateUrl(value, formData.username),
                    })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.name} value={platform.name}>
                        <div className="flex items-center space-x-2">
                          <platform.icon className="w-4 h-4" />
                          <span>{platform.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username/Handle</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => {
                    const username = e.target.value
                    setFormData({
                      ...formData,
                      username,
                      url: generateUrl(formData.platform, username),
                    })
                  }}
                  placeholder={formData.platform === "Email" ? "your@email.com" : "@username"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Full URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://platform.com/username"
              />
              <p className="text-xs text-gray-500">
                URL is auto-generated based on platform and username, but you can customize it.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Link is active</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Social Link
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialLinks.map((link) => {
          const IconComponent = getPlatformIcon(link.platform)
          return (
            <Card key={link.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <IconComponent className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-lg">{link.platform}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          link.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {link.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{link.username}</p>
                    <p className="text-xs text-gray-500 truncate">{link.url}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button size="sm" variant="outline" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      Visit
                    </a>
                  </Button>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(link)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(link.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {socialLinks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No social links yet. Add your first social link!</p>
        </div>
      )}
    </div>
  )
}
