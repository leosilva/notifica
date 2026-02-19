"use client"

import { useAuth } from "@/contexts/auth-context"
import { LoginPage } from "@/components/login-page"
import { StudentDashboard } from "@/components/student-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"
import { Loader2 } from "lucide-react"

export default function Home() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  if (user.type === "student") {
    return <StudentDashboard />
  }

  return <AdminDashboard />
}
