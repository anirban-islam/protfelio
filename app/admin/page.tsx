import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  return <AdminDashboard />
}
