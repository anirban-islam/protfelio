import { test, expect } from "@playwright/test"

test.describe("Admin Dashboard", () => {
  test("redirects to login when not authenticated", async ({ page }) => {
    await page.goto("/admin")

    await expect(page).toHaveURL("/admin/login")
    await expect(page.locator("text=Admin Login")).toBeVisible()
  })

  test("admin login works correctly", async ({ page }) => {
    await page.goto("/admin/login")

    await page.fill('input[type="email"]', "admin@anirban.dev")
    await page.fill('input[type="password"]', "admin123")
    await page.click('button:has-text("Sign In")')

    await expect(page).toHaveURL("/admin")
    await expect(page.locator("text=Admin Dashboard")).toBeVisible()
  })

  test("admin can manage projects", async ({ page }) => {
    // Login first
    await page.goto("/admin/login")
    await page.fill('input[type="email"]', "admin@anirban.dev")
    await page.fill('input[type="password"]', "admin123")
    await page.click('button:has-text("Sign In")')

    // Navigate to projects
    await page.click("text=Projects")
    await expect(page.locator("text=Projects Manager")).toBeVisible()

    // Add new project
    await page.click('button:has-text("Add Project")')
    await page.fill('input[placeholder="Project Title"]', "Test Project")
    await page.fill('textarea[placeholder="Description..."]', "Test Description")
    await page.fill('input[placeholder="https://example.com"]', "https://test.com")
    await page.click('button:has-text("Save Project")')

    await expect(page.locator("text=Project created!")).toBeVisible()
  })

  test("admin can manage testimonials", async ({ page }) => {
    // Login first
    await page.goto("/admin/login")
    await page.fill('input[type="email"]', "admin@anirban.dev")
    await page.fill('input[type="password"]', "admin123")
    await page.click('button:has-text("Sign In")')

    // Navigate to testimonials
    await page.click("text=Testimonials")
    await expect(page.locator("text=Testimonials Manager")).toBeVisible()

    // Add new testimonial
    await page.click('button:has-text("Add Testimonial")')
    await page.fill('input[placeholder="Client Name"]', "Test Client")
    await page.fill('input[placeholder="City, Country"]', "Test City, Test Country")
    await page.fill('textarea[placeholder="Client\'s feedback..."]', "Great work!")
    await page.click('button:has-text("Save Testimonial")')

    await expect(page.locator("text=Testimonial created!")).toBeVisible()
  })

  test("admin can view contact messages", async ({ page }) => {
    // Login first
    await page.goto("/admin/login")
    await page.fill('input[type="email"]', "admin@anirban.dev")
    await page.fill('input[type="password"]', "admin123")
    await page.click('button:has-text("Sign In")')

    // Navigate to contact messages
    await page.click("text=Contact Messages")
    await expect(page.locator("text=Contact Messages")).toBeVisible()
    await expect(page.locator('button:has-text("Export CSV")')).toBeVisible()
  })
})
