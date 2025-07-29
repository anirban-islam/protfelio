import type React from "react"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Anirban Islam Emon - Full Stack Developer",
  description:
    "Portfolio website of Anirban Islam Emon, a passionate full-stack developer specializing in Next.js, React, and modern web technologies.",
  keywords: "Full Stack Developer, Next.js, React, Web Development, Portfolio",
  authors: [{ name: "Anirban Islam Emon" }],
  openGraph: {
    title: "Anirban Islam Emon - Full Stack Developer",
    description: "Portfolio website of Anirban Islam Emon, a passionate full-stack developer",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
