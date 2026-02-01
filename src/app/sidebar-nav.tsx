"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type WorkspaceTab = "growth" | "persona" | "sponsors" | "network" | null;

const navItems: { href: string; label: string; tab: WorkspaceTab }[] = [
  { href: "/dashboard", label: "Dashboard", tab: null },
  { href: "/dashboard?tab=persona", label: "Persona Engine", tab: "persona" },
  { href: "/dashboard?tab=growth", label: "Growth Strategist", tab: "growth" },
  { href: "/dashboard?tab=sponsors", label: "Sponsorship Match", tab: "sponsors" },
  { href: "/dashboard?tab=network", label: "Creator Network", tab: "network" },
  // Library: shows message history wired to Creator Network conversations.
  { href: "/library", label: "Library", tab: null },
];

export function SidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams?.get("tab");

  return (
    <nav className="creatoros-nav-links" aria-label="Primary">
      {navItems.map((item) => {
        const isDashboardRoute = item.href.startsWith("/dashboard");
        const isDashboard = pathname === "/dashboard";

        const isActive = isDashboardRoute
          ? (item.tab === null
              ? isDashboard && (currentTab === null || currentTab === undefined)
              : isDashboard && currentTab === item.tab)
          : pathname === item.href;

        const className = isActive
          ? "creatoros-nav-link creatoros-nav-link-active"
          : "creatoros-nav-link";

        return (
          <Link key={item.label} className={className} href={item.href}>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
