"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dashboard } from "../../../genz/components/Dashboard";
import { SettingsModal } from "../../../genz/components/SettingsModal";
import { Toaster } from "../../../genz/components/ui/sonner";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const initialTab = useMemo<"growth" | "persona" | "sponsors" | "network" | null>(() => {
    const tab = searchParams?.get("tab");
    if (tab === "persona" || tab === "sponsors" || tab === "network" || tab === "growth") {
      return tab;
    }
    // No tab in URL: show dashboard without any feature modal open.
    return null;
  }, [searchParams]);

  return (
    <div className="min-h-screen relative">
      <Dashboard
        onLogout={() => router.push("/")}
        initialTab={initialTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(17, 17, 27, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}
