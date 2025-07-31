"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Download, Loader2, Mail, Phone, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

interface ContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  message: string
  date: string
  isRead: boolean
}

export default function ContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/contact-messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contact-messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      })

      if (response.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch(`/api/admin/contact-messages/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          fetchMessages()
          setSelectedMessage(null)
          toast({
            title: "Success",
            description: "Message deleted!",
          })
        } else {
          throw new Error("Failed to delete message")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete message",
          variant: "destructive",
        })
      }
    }
  }

  const exportMessages = () => {
    const csvContent = [
      ["Date", "Name", "Email", "Mobile", "Message", "Status"],
      ...filteredMessages.map((msg) => [
        msg.date,
        `${msg.firstName} ${msg.lastName}`,
        msg.email,
        msg.mobile,
        msg.message.replace(/"/g, '""'),
        msg.isRead ? "Read" : "Unread",
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contact-messages-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const filteredMessages = messages.filter((message) =>
    `${message.firstName} ${message.lastName} ${message.email} ${message.message}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage contact form submissions</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportMessages} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {filteredMessages.length} of {messages.length} messages
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Messages ({filteredMessages.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedMessage?.id === message.id ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""
                } ${!message.isRead ? "border-l-4 border-l-blue-500" : ""}`}
                onClick={() => {
                  setSelectedMessage(message)
                  if (!message.isRead) {
                    markAsRead(message._id)
                  }
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm">
                    {message.firstName} {message.lastName}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {!message.isRead && (
                      <Badge variant="secondary" className="text-xs">
                        New
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">{message.date}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{message.email}</p>
                <p className="text-xs text-gray-500 truncate">{message.message}</p>
              </div>
            ))}

            {filteredMessages.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {searchTerm ? "No messages found matching your search." : "No messages yet."}
              </div>
            )}
          </CardContent>
        </Card>

        {selectedMessage && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>Message Details</CardTitle>
                <Button size="sm" variant="destructive" onClick={() => deleteMessage(selectedMessage._id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">
                  {selectedMessage.firstName} {selectedMessage.lastName}
                </h3>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{selectedMessage.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>{selectedMessage.mobile}</span>
                </div>
                <p className="text-sm text-gray-500">{selectedMessage.date}</p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Message:</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => window.open(`mailto:${selectedMessage.email}`)}>
                  <Mail className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>
                <Button size="sm" variant="outline" onClick={() => window.open(`tel:${selectedMessage.mobile}`)}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
