"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Twitter, Linkedin, Mail, Github, Instagram, Youtube, ExternalLink } from "lucide-react"

interface SocialLink {
  _id: string
  platform: string
  username: string
  url: string
  isActive: boolean
}

export function SocialSection() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    fetchSocialLinks()
  }, [])

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch("/api/admin/social-links")
      if (response.ok) {
        const data = await response.json()
        setSocialLinks(data.filter((link: SocialLink) => link.isActive))
      }
    } catch (error) {
      // Fallback to default social links
      setSocialLinks([
        {
          _id: "1",
          platform: "Facebook",
          username: "Anirban Islam Emon",
          url: "https://www.facebook.com/anirbanislam",
          isActive: true,
        },
        {
          _id: "2",
          platform: "Twitter",
          username: "Anirban Islam Emon",
          url: "https://x.com/anirbanislamemon",
          isActive: true,
        },
        {
          _id: "3",
          platform: "LinkedIn",
          username: "Anirban Islam Emon",
          url: "https://linkedin.com/in/anirbanislam",
          isActive: true,
        },
        {
          _id: "4",
          platform: "Email",
          username: "dev.anirbanislam@gmail.com",
          url: "mailto:dev.anirbanislam@gmail.com",
          isActive: true,
        },
        {
          _id: "5",
          platform: "GitHub",
          username: "Anirban Islam Emon",
          url: "https://github.com/anirban-islam",
          isActive: true,
        },
      ])
    }
  }

  const getPlatformIcon = (platform: string) => {
    const iconProps = { className: "w-5 h-5 text-gray-600 dark:text-gray-300" }

    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook {...iconProps} />
      case "twitter":
        return <Twitter {...iconProps} />
      case "linkedin":
        return <Linkedin {...iconProps} />
      case "github":
        return <Github {...iconProps} />
      case "email":
        return <Mail {...iconProps} />
      case "instagram":
        return <Instagram {...iconProps} />
      case "youtube":
        return <Youtube {...iconProps} />
      default:
        return <ExternalLink {...iconProps} />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span className="text-purple-600 dark:text-purple-400">👥</span>
          <span className="text-gray-900 dark:text-white">My Social handles</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {socialLinks.map((link) => (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors group"
          >
            {getPlatformIcon(link.platform)}
            <div className="flex-1">
              <h4 className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {link.username}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{link.url}</p>
            </div>
            <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </CardContent>
    </Card>
  )
}
