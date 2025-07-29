import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DebugPage() {
  const session = await getServerSession(authOptions)

  // Server-side environment variable check
  const envCheck = {
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
    MONGODB_URI: !!process.env.MONGODB_URI,
    CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
  }

  const defaultCredentials = {
    email: process.env.ADMIN_EMAIL || "admin@anirban.dev",
    password: "admin123", // Don't expose actual password
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl">NextAuth Debug Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Authentication Status */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Authentication Status:</h3>
            <div className={`p-3 rounded-lg ${session ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {session ? "✅ Authenticated" : "❌ Not Authenticated"}
            </div>
          </div>

          {/* Session Data */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Session Data:</h3>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>

          {/* Environment Variables Check */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Environment Variables (Server-side):</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(envCheck).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded">
                  <span className="font-mono text-sm">{key}:</span>
                  <span className={value ? "text-green-600" : "text-red-600"}>{value ? "✅ Set" : "❌ Missing"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Default Credentials */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Default Admin Credentials:</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p>
                <strong>Email:</strong> {defaultCredentials.email}
              </p>
              <p>
                <strong>Password:</strong> {defaultCredentials.password}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4">
            <a
              href="/admin/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Login
            </a>
            <a
              href="/admin"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Go to Dashboard
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
