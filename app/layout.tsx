import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Anirban Islam Emon | Full Stack Web Developer (Next.js, React, MongoDB)",
  description:
    "Welcome to the portfolio of Anirban Islam Emon, a professional full-stack web developer from Bangladesh, specializing in building dynamic, responsive, and scalable web applications using Next.js, React, Node.js, MongoDB, and other modern web technologies.",
  keywords:
    "Anirban Islam Emon, Full Stack Developer, Web Developer in Bangladesh, Next.js Developer, React Developer, Node.js, MongoDB, JavaScript, TypeScript, Frontend Developer, Backend Developer, Portfolio Website, MERN Stack Developer, Software Engineer, Fullstack Projects, Tailwind CSS",
  authors: [{ name: "Anirban Islam Emon", url: "https://dev-anirban.netlify.app/" }],
  creator: "Anirban Islam Emon",
  publisher: "Anirban Islam Emon",
  openGraph: {
    title: "Anirban Islam Emon | Full Stack Web Developer",
    description:
      "Explore Anirban's developer portfolio showcasing modern full-stack projects built with Next.js, React, and MongoDB. Learn more about his skills, experience, and how to connect.",
    type: "website",
    url: "https://dev-anirban.netlify.app/",
    siteName: "Anirban Islam Emon - Developer Portfolio",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWkJSoZHaz-X1Zpw6zua4Q7411ytnGtzzPtA&s", // Replace with actual OG image path
        width: 1200,
        height: 630,
        alt: "Anirban Islam Emon - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anirban Islam Emon | Full Stack Developer",
    description:
      "Official portfolio of Anirban Islam Emon, a Bangladeshi full-stack web developer with expertise in React, Next.js, Node.js & MongoDB.",
    site: "anirban_islam", // replace if applicable
    creator: "@Anirban_islam", // replace if applicable
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWkJSoZHaz-X1Zpw6zua4Q7411ytnGtzzPtA&s"], // Replace with actual image
  },
  generator: "Next.js",
  applicationName: "Anirban Developer Portfolio",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://dev-anirban.netlify.app"),
};


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
