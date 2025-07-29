"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, Settings, Users, FileText, BarChart3, ImageIcon, Mail, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

// Import admin modules
import HeroSettings from "./modules/hero-settings"
import ProjectsManager from "./modules/projects-manager"
import TestimonialsManager from "./modules/testimonials-manager"
import AboutSettings from "./modules/about-settings"
import StatisticsManager from "./modules/statistics-manager"
import TechStackManager from "./modules/tech-stack-manager"
import ServicesManager from "./modules/services-manager"
import RecognitionsManager from "./modules/recognitions-manager"
import SocialLinksManager from "./modules/social-links-manager"
import ContactMessages from "./modules/contact-messages"
import NewsletterSubscribers from "./modules/newsletter-subscribers"
import DashboardOverview from "./modules/dashboard-overview"

export function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      router.push("/admin/login")
      return
    }
  }, [session, status, router])

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/admin/login")
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome back, {session.user?.name || session.user?.email}
            </p>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-12 gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="tech-stack" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Tech</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="recognitions" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Awards</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Social</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="newsletter" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Newsletter</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <HeroSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Section Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <AboutSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projects Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials Management</CardTitle>
              </CardHeader>
              <CardContent>
                <TestimonialsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <Card>
              <CardHeader>
                <CardTitle>Statistics Management</CardTitle>
              </CardHeader>
              <CardContent>
                <StatisticsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tech-stack">
            <Card>
              <CardHeader>
                <CardTitle>Tech Stack Management</CardTitle>
              </CardHeader>
              <CardContent>
                <TechStackManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>Services Management</CardTitle>
              </CardHeader>
              <CardContent>
                <ServicesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recognitions">
            <Card>
              <CardHeader>
                <CardTitle>Recognitions Management</CardTitle>
              </CardHeader>
              <CardContent>
                <RecognitionsManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Links Management</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialLinksManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactMessages />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers</CardTitle>
              </CardHeader>
              <CardContent>
                <NewsletterSubscribers />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
