"use client";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        {children}
      </div>
    </main>
  );
}
