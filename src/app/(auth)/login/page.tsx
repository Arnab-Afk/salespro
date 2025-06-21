'use client'
import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div
        className="relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20,20,20,0.7),rgba(20,20,20,0.7)), url('https://images.pexels.com/photos/3780104/pexels-photo-3780104.png')"
        }}
      >
        <div className="relative z-20 flex items-center text-lg font-medium mt-[-20px]">
          <Image
            src="/darkmode-logo-login.svg"
            alt="SalesPro"
            width={200}
            height={80}
            className="mr-2"
          />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This platform has transformed how we manage leads and collaborate across departments. It&apos;s an essential tool for our sales success.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis, Sales Director</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
