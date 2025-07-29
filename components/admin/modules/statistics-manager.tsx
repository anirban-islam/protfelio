"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Save, Loader2, TrendingUp, Users, Calendar, Code } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StatsData {
  projectsCompleted: number
  happyClients: number
  yearsExperience: number
  technologiesMastered: number
}

export default function StatisticsManager() {
  const [stats, setStats] = useState<StatsData>({
    projectsCompleted: 50,
    happyClients: 30,
    yearsExperience: 5,
    technologiesMastered: 25,
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/statistics")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        console.error("Failed to fetch statistics")
      }
    } catch (error) {
      console.error("Error fetching statistics:", error)
      toast({
        title: "Error",
        description: "Failed to fetch statistics",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/admin/statistics", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: data.message || "Statistics updated successfully!",
        })
      } else {
        throw new Error(data.error || "Failed to update statistics")
      }
    } catch (error: any) {
      console.error("Error updating statistics:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update statistics",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field: keyof StatsData, value: string) => {
    const numValue = Number.parseInt(value) || 0
    setStats((prev) => ({ ...prev, [field]: numValue }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const statItems = [
    {
      key: "projectsCompleted" as keyof StatsData,
      label: "Projects Completed",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      key: "happyClients" as keyof StatsData,
      label: "Happy Clients",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      key: "yearsExperience" as keyof StatsData,
      label: "Years of Experience",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      key: "technologiesMastered" as keyof StatsData,
      label: "Technologies Mastered",
      icon: Code,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">Update your portfolio statistics and achievements</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Statistics
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statItems.map((item) => {
          const IconComponent = item.icon
          return (
            <Card key={item.key}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${item.bgColor}`}>
                    <IconComponent className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <span>{item.label}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor={item.key}>Value</Label>
                  <Input
                    id={item.key}
                    type="number"
                    min="0"
                    value={stats[item.key]}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    placeholder="Enter number"
                  />
                  <p className="text-xs text-gray-500">Enter the number value (e.g., 50 for "50+")</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((item) => {
              const IconComponent = item.icon
              return (
                <div key={item.key} className="text-center p-4 border rounded-lg">
                  <div className={`inline-flex p-3 rounded-full ${item.bgColor} mb-2`}>
                    <IconComponent className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats[item.key]}+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.label}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
