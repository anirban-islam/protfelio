"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Subscribed! 🎉",
          description: data.message || "Thank you for subscribing to my newsletter!",
        })
        setEmail("")
        setSubscribed(true)

        // Reset subscribed state after 3 seconds
        setTimeout(() => setSubscribed(false), 3000)
      } else {
        throw new Error(data.error || "Failed to subscribe")
      }
    } catch (error: any) {
      console.error("Newsletter subscription error:", error)
      toast({
        title: "Subscription failed",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="relative overflow-hidden">
      {subscribed && (
        <div className="absolute inset-0 bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center z-10 backdrop-blur-sm">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-1">Subscribed!</h3>
            <p className="text-purple-600 dark:text-purple-300 text-sm">Welcome to the newsletter!</p>
          </div>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
          Get design tips & guides straight to your inbox for free!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Your email address"
            className="w-full transition-all duration-200 focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
