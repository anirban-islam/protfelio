"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderOpen, MessageSquare, Mail, TrendingUp, Award, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DashboardStats {
  projects: number
  testimonials: number
  messages: number
  subscribers: number
  recentMessages: Array<{
    id: string
    name: string
    email: string
    message: string
    date: string
    isRead: boolean
  }>
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    testimonials: 0,
    messages: 0,
    subscribers: 0,
    recentMessages: [],
  })
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const [projectsRes, testimonialsRes, messagesRes, subscribersRes] = await Promise.all([
        fetch("/api/admin/projects").catch(() => ({ json: () => [] })),
        fetch("/api/admin/testimonials").catch(() => ({ json: () => [] })),
        fetch("/api/admin/contact-messages").catch(() => ({ json: () => [] })),
        fetch("/api/admin/newsletter-subscribers").catch(() => ({ json: () => [] })),
      ])

      const [projects, testimonials, messages, subscribers] = await Promise.all([
        projectsRes.json?.() || [],
        testimonialsRes.json?.() || [],
        messagesRes.json?.() || [],
        subscribersRes.json?.() || [],
      ])

      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        messages: Array.isArray(messages) ? messages.length : 0,
        subscribers: Array.isArray(subscribers) ? subscribers.length : 0,
        recentMessages: Array.isArray(messages) ? messages.slice(0, 5) : [],
      })
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      toast({
        title: "Error",
        description: "Failed to fetch dashboard statistics",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Total Projects",
      value: stats.projects,
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
      href: "/admin?tab=projects",
    },
    {
      title: "Testimonials",
      value: stats.testimonials,
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
      href: "/admin?tab=testimonials",
    },
    {
      title: "Contact Messages",
      value: stats.messages,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
      href: "/admin?tab=messages",
    },
    {
      title: "Newsletter Subscribers",
      value: stats.subscribers,
      icon: Mail,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
      href: "/admin?tab=newsletter",
    },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's what's happening.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5" />
              <span>Recent Messages</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentMessages.length > 0 ? (
                stats.recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{message.name}</p>
                        {!message.isRead && (
                          <Badge variant="secondary" className="text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{message.email}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{message.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{message.date}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No messages yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-transparent"
                onClick={() => (window.location.href = "/admin?tab=projects")}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <FolderOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">Add New Project</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Showcase your latest work</p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-transparent"
                onClick={() => (window.location.href = "/admin?tab=testimonials")}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">Add Testimonial</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Share client feedback</p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4 bg-transparent"
                onClick={() => (window.location.href = "/admin?tab=messages")}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">View Messages</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Check client inquiries</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
