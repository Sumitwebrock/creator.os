'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Homepage } from "../genz/components/Homepage";
import { PricingPage } from "../genz/components/PricingPage";
import { Modal } from "../genz/components/Modal";
import { LoginModal } from "../genz/components/LoginModal";
import { DemoModalContent } from "../genz/components/DemoModal";
import { Toaster } from "../genz/components/ui/sonner";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPricing, setShowPricing] = useState(false);
  const [initialDashboardTab, setInitialDashboardTab] =
    useState<"growth" | "persona" | "sponsors" | "network">("growth");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  function openLogin(tab: "growth" | "persona" | "sponsors" | "network" = "growth") {
    setInitialDashboardTab(tab);
    setIsLoginModalOpen(true);
  }

  function handleLoginSuccess() {
    setIsLoginModalOpen(false);
    // After a successful login from the landing page, always go to the main Dashboard
    router.push("/dashboard");
  }

  // If the layout links include mode=login or mode=signup, auto-open auth modal
  useEffect(() => {
    const mode = searchParams?.get("mode");
    if (mode === "login" || mode === "signup") {
      openLogin("growth");
    }
  }, [searchParams]);

  if (showPricing) {
    return (
      <div className="min-h-screen relative">
        <PricingPage
          onClose={() => setShowPricing(false)}
          onSelectPlan={() => openLogin("growth")}
        />
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

  return (
    <div className="min-h-screen relative">
      <Homepage
        onEnter={() => openLogin("growth")}
        onWatchDemo={() => setIsDemoModalOpen(true)}
        onLogin={() => openLogin("growth")}
        onFeatureClick={(tab) => openLogin(tab)}
        onOpenPricing={() => setShowPricing(true)}
      />

      <Modal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        title="Watch CreatorOS Demo"
      >
        <DemoModalContent onClose={() => setIsDemoModalOpen(false)} />
      </Modal>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />

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
