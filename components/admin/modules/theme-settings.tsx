"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"
import { Save, Palette, Monitor, Sun, Moon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ThemeSettings() {
  const { theme, setTheme, systemTheme } = useTheme()
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    defaultTheme: theme || "system",
    enableSystemTheme: true,
    enableTransitions: true,
  })

  const handleSave = async () => {
    try {
      // Save theme settings to localStorage or API
      localStorage.setItem("theme-settings", JSON.stringify(settings))

      toast({
        title: "Settings saved!",
        description: "Theme settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save theme settings.",
        variant: "destructive",
      })
    }
  }

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Theme Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">Customize the appearance and theme preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5" />
              <span>Theme Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="defaultTheme">Default Theme</Label>
              <Select
                value={settings.defaultTheme}
                onValueChange={(value) => {
                  setSettings({ ...settings, defaultTheme: value })
                  setTheme(value)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select default theme" />
                </SelectTrigger>
                <SelectContent>
                  {themeOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="systemTheme">Follow System Theme</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Automatically switch between light and dark mode based on system preference
                </p>
              </div>
              <Switch
                id="systemTheme"
                checked={settings.enableSystemTheme}
                onCheckedChange={(checked) => setSettings({ ...settings, enableSystemTheme: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="transitions">Enable Transitions</Label>
                <p className="text-sm text-gray-600 dark:text-gray-300">Smooth transitions when switching themes</p>
              </div>
              <Switch
                id="transitions"
                checked={settings.enableTransitions}
                onCheckedChange={(checked) => setSettings({ ...settings, enableTransitions: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-background">
                <h3 className="font-semibold text-foreground mb-2">Current Theme: {theme}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  This is how your portfolio will look with the current theme settings.
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {themeOptions.map((option) => {
                    const IconComponent = option.icon
                    return (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={`p-3 rounded-lg border transition-colors ${
                          theme === option.value ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
                        }`}
                      >
                        <IconComponent className="h-5 w-5 mx-auto mb-1" />
                        <p className="text-xs">{option.label}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p>
                  <strong>Current system theme:</strong> {systemTheme}
                </p>
                <p>
                  <strong>Active theme:</strong> {theme}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
