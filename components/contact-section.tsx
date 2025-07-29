"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Send, Check } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const email = "dev.anirbanislam@gmail.com"

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      toast({
        title: "Email copied!",
        description: "Email address has been copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the email manually",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>💬</span>
          <span>Contact me</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-lg font-semibold">Reach out to me for projects!</h3>
        <p className="text-sm text-purple-100">
          Let's collaborate together and build some amazing products that will not just look good, but will drive
          business and will generate more revenue!
        </p>

        <div className="space-y-3">
          <Button
            variant="secondary"
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20"
            onClick={copyEmail}
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy email"}
          </Button>

          <Link href="/contact" className="block">
            <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">
              <Send className="w-4 h-4 mr-2" />
              Hire me now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
