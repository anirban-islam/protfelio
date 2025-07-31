"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Download, Loader2, Mail, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

interface Subscriber {
  id: string
  email: string
  subscribedAt: string
  isActive: boolean
}

export default function NewsletterSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/admin/newsletter-subscribers")
      if (response.ok) {
        const data = await response.json()
        setSubscribers(data)
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error)
      toast({
        title: "Error",
        description: "Failed to fetch subscribers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteSubscriber = async (id: string) => {
    if (confirm("Are you sure you want to delete this subscriber?")) {
      try {
        const response = await fetch(`/api/admin/newsletter-subscribers/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          fetchSubscribers()
          toast({
            title: "Success",
            description: "Subscriber deleted!",
          })
        } else {
          throw new Error("Failed to delete subscriber")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete subscriber",
          variant: "destructive",
        })
      }
    }
  }

  const exportSubscribers = () => {
    const csvContent = [
      ["Email", "Subscribed Date", "Status"],
      ...filteredSubscribers.map((sub) => [sub.email, sub.subscribedAt, sub.isActive ? "Active" : "Inactive"]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Newsletter Subscribers</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your newsletter subscriber list</p>
        </div>
        <Button onClick={exportSubscribers}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredSubscribers.length} of {subscribers.length} subscribers
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Subscribers ({filteredSubscribers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredSubscribers.map((subscriber) => (
              <div
                key={subscriber.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{subscriber.email}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Subscribed: {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge variant={subscriber.isActive ? "default" : "secondary"}>
                    {subscriber.isActive ? "Active" : "Inactive"}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => window.open(`mailto:${subscriber.email}`)}>
                    <Mail className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteSubscriber(subscriber._id)}>
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredSubscribers.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                {searchTerm ? "No subscribers found matching your search." : "No subscribers yet."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {subscribers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{subscribers.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Subscribers</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {subscribers.filter((s) => s.isActive).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Subscribers</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {
                    subscribers.filter((s) => {
                      const subDate = new Date(s.subscribedAt)
                      const thirtyDaysAgo = new Date()
                      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                      return subDate >= thirtyDaysAgo
                    }).length
                  }
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">New This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
