import { test, expect } from "@playwright/test"

test.describe("Contact Form", () => {
  test("submits contact form successfully", async ({ page }) => {
    await page.goto("/contact")

    await page.fill('input[placeholder="First name"]', "John")
    await page.fill('input[placeholder="Last name"]', "Doe")
    await page.fill('input[placeholder="e-mail"]', "john@example.com")
    await page.fill('input[placeholder="mobile"]', "+1234567890")
    await page.fill('textarea[placeholder="Drop your message here"]', "Test message")

    await page.click('button:has-text("Send")')

    await expect(page.locator("text=Message sent successfully")).toBeVisible()
  })

  test("validates required fields", async ({ page }) => {
    await page.goto("/contact")

    await page.click('button:has-text("Send")')

    await expect(page.locator("text=Please fill in all required fields")).toBeVisible()
  })

  test("validates email format", async ({ page }) => {
    await page.goto("/contact")

    await page.fill('input[placeholder="First name"]', "John")
    await page.fill('input[placeholder="Last name"]', "Doe")
    await page.fill('input[placeholder="e-mail"]', "invalid-email")
    await page.fill('textarea[placeholder="Drop your message here"]', "Test message")

    await page.click('button:has-text("Send")')

    await expect(page.locator("text=Please enter a valid email")).toBeVisible()
  })
})
