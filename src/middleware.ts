import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const setupSteps = ["pipeline", "fields", "team"];

export async function middleware(request: NextRequest) {
  // Setup flow middleware
  if (request.nextUrl.pathname.startsWith("/setup/")) {
    // Skip middleware for the main setup page
    if (request.nextUrl.pathname === "/setup") {
      return NextResponse.next();
    }

    // Extract the current step from the URL
    const currentStep = request.nextUrl.pathname.split("/")[2];
    if (!currentStep) return NextResponse.redirect(new URL("/setup", request.url));

    // Get completed steps from cookies or default to empty array
    const completedSteps = request.cookies.get("completed_steps")?.value
      ? JSON.parse(request.cookies.get("completed_steps")?.value || "[]")
      : [];

    const currentStepIndex = setupSteps.indexOf(currentStep);
    if (currentStepIndex === -1) {
      // Invalid step, redirect to setup
      return NextResponse.redirect(new URL("/setup", request.url));
    }

    // If trying to access a future step, redirect to the first incomplete step
    if (currentStepIndex > 0 && !completedSteps.includes(setupSteps[currentStepIndex - 1])) {
      const nextIncompleteStep = setupSteps.find((step, index) => 
        index <= currentStepIndex && !completedSteps.includes(step)
      ) || setupSteps[0];
      
      return NextResponse.redirect(new URL(`/setup/${nextIncompleteStep}`, request.url));
    }
  }

  // Dashboard protection middleware
  if (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname.startsWith("/setup")) {
    const token = request.cookies.get("auth_token")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Only check setup completion for dashboard routes
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      const completedSteps = request.cookies.get("completed_steps")?.value
        ? JSON.parse(request.cookies.get("completed_steps")?.value || "[]")
        : [];

      // Check if setup is complete
      const isSetupComplete = setupSteps.every(step => completedSteps.includes(step));

      if (!isSetupComplete) {
        // Redirect to setup if not complete
        const firstIncompleteStep = setupSteps.find(step => !completedSteps.includes(step));
        const redirectUrl = firstIncompleteStep 
          ? `/setup/${firstIncompleteStep}`
          : "/setup";
          
        return NextResponse.redirect(new URL(redirectUrl, request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/setup/:path*",
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|login|auth/callback).*)",
  ],
};
