import { generateMetadata } from "@/lib/generate-metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata("settings");

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  );
}
