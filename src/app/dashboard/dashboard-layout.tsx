'use client'
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
export function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { accessToken, setAuthData } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      if (!accessToken) {
        router.push('/login')
      } else {
        setIsLoading(false)
      }
    }
  }, [accessToken, router, mounted])

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null
  }

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load your dashboard.</p>
        </div>
      </div>
    )
  }

  if (!accessToken) {
    return null
  }

  const handleLogout = () => {
    setAuthData({
      accessToken: null,
      idToken: null
    })
    router.push('/login')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
                        src="/Salespro.svg"
                        alt="SalesPro"
                        width={200}
                        height={80}
                        className="ml-2"
                      />
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 pt-16 pb-0 pl-0">
          <nav className="flex-1 space-y-1 px-2 py-4 bg-muted/40">
            <div className="space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/leads"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary"
              >
                Leads
              </Link>
              <Link
                href="/dashboard/departments"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-primary/10 hover:text-primary"
              >
                Departments
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:pl-64 flex-1">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
