'use client'
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { accessToken } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!accessToken) {
      router.push('/login')
    }
  }, [accessToken, router])

  if (!accessToken) {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-6">
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold mb-2">Welcome to SalesPro</h2>
          <p className="text-muted-foreground">Your leads and department management dashboard.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Recent Leads</h3>
            <p className="text-sm text-muted-foreground">No leads yet</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Departments</h3>
            <p className="text-sm text-muted-foreground">No departments yet</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  )
}
