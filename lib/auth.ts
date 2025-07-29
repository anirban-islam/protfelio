import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          return null
        }

        // Check against environment variables with fallbacks
        const adminEmail = process.env.ADMIN_EMAIL || "admin@anirban.dev"
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

        console.log("Auth attempt:", {
          providedEmail: credentials.email,
          expectedEmail: adminEmail,
          emailMatch: credentials.email === adminEmail,
          passwordMatch: credentials.password === adminPassword,
        })

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          console.log("Authentication successful")
          return {
            id: "admin",
            email: adminEmail,
            name: "Admin User",
            role: "admin",
          }
        }

        console.log("Authentication failed")
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
  debug: process.env.NODE_ENV === "development",
}
