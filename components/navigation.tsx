"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Moon, Sun, Menu } from "lucide-react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Testimonials", href: "/testimonials" },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Anirban
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
                )}
              </Link>
            ))}

            {/* Start Project Button - Routes to /contact */}
            <Link href="/contact">
              <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-8 py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Start Project ✨
              </Button>
            </Link>
          </div>

          {/* Right Side - Theme Toggle */}
          <div className="hidden lg:flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}

                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full mt-4">
                      Start Project ✨
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
