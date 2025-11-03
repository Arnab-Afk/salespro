import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Authentication - SalesPro",
    template: "%s - SalesPro",
  },
  description: "Authentication pages for SalesPro",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
