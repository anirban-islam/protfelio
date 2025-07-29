import { test, expect } from "@playwright/test"

test.describe("Homepage", () => {
  test("loads homepage successfully", async ({ page }) => {
    await page.goto("/")

    await expect(page).toHaveTitle(/Anirban Islam Emon/)
    await expect(page.locator("h1")).toContainText("Anirban Islam Emon")
  })

  test("displays hero section correctly", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible()
    await expect(page.locator("text=Available to work")).toBeVisible()
    await expect(page.locator("text=Bangladesh")).toBeVisible()
    await expect(page.locator("text=Computer Engineer")).toBeVisible()
  })

  test("shows statistics correctly", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("text=55+")).toBeVisible()
    await expect(page.locator("text=Projects")).toBeVisible()
    await expect(page.locator("text=50+")).toBeVisible()
    await expect(page.locator("text=Happy clients")).toBeVisible()
  })

  test("displays tech stack", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("text=Tech Arsenal!")).toBeVisible()
    await expect(page.locator("text=Next.js")).toBeVisible()
    await expect(page.locator("text=React")).toBeVisible()
  })

  test("shows projects section", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("text=Projects I have completed!")).toBeVisible()
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(6)
  })

  test("displays testimonials", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("text=Testimonials")).toBeVisible()
    await expect(page.locator("text=Sarah Johnson")).toBeVisible()
  })

  test("newsletter signup works", async ({ page }) => {
    await page.goto("/")

    await page.fill('input[placeholder="Your email address"]', "test@example.com")
    await page.click('button:has-text("Subscribe")')

    await expect(page.locator("text=Subscribed successfully")).toBeVisible()
  })
})
