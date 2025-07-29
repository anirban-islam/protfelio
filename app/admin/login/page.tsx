import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { AdminLogin } from "@/components/admin/admin-login"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  // If already logged in, redirect to admin dashboard
  if (session) {
    redirect("/admin")
  }

  return <AdminLogin />
}
