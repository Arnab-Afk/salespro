import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Onboarding | SalesPro",
  description: "Welcome to SalesPro! Let's get you started with a few quick questions.",
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  )
}
