// filepath: /home/arnab/projects/salespro/src/app/(auth)/login/layout.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | SalesPro",
  description: "Login to your SalesPro account",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}