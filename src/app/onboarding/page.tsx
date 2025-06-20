import { CompanySetupForm } from "@/components/onboarding/company-setup-form";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-3xl space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-3xl font-bold">Setup your company</h1>
          <p className="text-muted-foreground">
            Let&apos;s get your business set up in SalesPro
          </p>
        </div>
        <CompanySetupForm />
      </div>
    </div>
  );
}
