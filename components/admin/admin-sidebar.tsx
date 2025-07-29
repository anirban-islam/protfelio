"use client"

import { signOut } from "next-auth/react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  User,
  FileText,
  Code,
  Briefcase,
  FolderOpen,
  BarChart3,
  MessageSquare,
  Award,
  Share2,
  Mail,
  Users,
  LogOut,
  Settings,
  Download,
} from "lucide-react"

interface AdminSidebarProps {
  activeModule: string
  setActiveModule: (module: string) => void
}

export function AdminSidebar({ activeModule, setActiveModule }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "hero", label: "Hero Settings", icon: User },
    { id: "about", label: "About Me", icon: FileText },
    { id: "resume", label: "Resume Manager", icon: Download },
    { id: "tech-stack", label: "Tech Stack", icon: Code },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "statistics", label: "Statistics", icon: BarChart3 },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "recognitions", label: "Recognitions", icon: Award },
    { id: "social-links", label: "Social Links", icon: Share2 },
    { id: "contact-messages", label: "Contact Messages", icon: Mail },
    { id: "newsletter", label: "Newsletter", icon: Users },
    { id: "settings", label: "Theme Settings", icon: Settings },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Portfolio Management</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  onClick={() => setActiveModule(item.id)}
                  isActive={activeModule === item.id}
                  className="w-full justify-start"
                >
                  <IconComponent className="w-4 h-4 mr-3" />
                  {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="outline" onClick={() => signOut()} className="w-full justify-start">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
