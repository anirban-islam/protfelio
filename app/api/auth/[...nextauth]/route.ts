import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check against environment variables for demo
        const adminEmail = process.env.ADMIN_EMAIL || "admin@anirban.dev"
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: "1",
            email: adminEmail,
            name: "Admin",
            role: "admin",
          }
        }

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
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST }
