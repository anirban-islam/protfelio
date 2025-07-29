"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Message)",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject.trim() || "General Inquiry",
          message: formData.message.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Message sent! 🎉",
          description: data.message || "Thank you for your message. I'll get back to you soon!",
        })
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
        setSubmitted(true)

        // Reset submitted state after 3 seconds
        setTimeout(() => setSubmitted(false), 3000)
      } else {
        throw new Error(data.error || "Failed to send message")
      }
    } catch (error: any) {
      console.error("Contact form error:", error)
      toast({
        title: "Oops! Something went wrong 😕",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Card id="contact-form" className="relative overflow-hidden">
      {submitted && (
        <div className="absolute inset-0 bg-green-50 dark:bg-green-900/20 flex items-center justify-center z-10 backdrop-blur-sm">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Message Sent!</h3>
            <p className="text-green-600 dark:text-green-300">I'll get back to you soon.</p>
          </div>
        </div>
      )}

      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600 dark:text-purple-400">💬</span>
          <span className="text-gray-900 dark:text-white">Get In Touch</span>
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-300">Share your project idea directly with me</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Input
                name="email"
                type="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="phone"
              type="tel"
              placeholder="Phone Number (Optional)"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={loading}
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
            />
            <Input
              name="subject"
              placeholder="Subject (Optional)"
              value={formData.subject}
              onChange={handleInputChange}
              disabled={loading}
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
            />
          </div>

          <Textarea
            name="message"
            placeholder="Tell me about your project... *"
            className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
            value={formData.message}
            onChange={handleInputChange}
            required
            disabled={loading}
          />

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
