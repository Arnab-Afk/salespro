"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReactNode } from "react";
import { useAuth } from "@/context/auth-context";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [fade, setFade] = useState(true);
  const { setAuthData } = useAuth();
  const handleLogout = () => {
  document.cookie = "authToken=; Max-Age=0; path=/;";    
  setAuthData({accessToken:null , idToken : null});
  setFade(false);
    setTimeout(() => {
      router.push("/login");
    }, 400);
  };

  return (
    <div className={`flex-1 p-8 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      {children}
    </div>
  );
}
