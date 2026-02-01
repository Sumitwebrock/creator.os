import type { Metadata } from "next";
import { SidebarNav } from "../sidebar-nav";
import "../globals.css";

export const metadata: Metadata = {
  title: "CreatorOS – Workspace",
  description:
    "CreatorOS workspace shell with persona engine, growth strategist, sponsor match, and creator network.",
};

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="creatoros-shell">
      <aside className="creatoros-nav">
        <div>
          <div className="creatoros-logo">
            <span className="creatoros-logo-mark" />
            <span>CREATOROS</span>
          </div>
          <SidebarNav />
        </div>
      </aside>
      <div className="creatoros-main">
        <header className="creatoros-topbar">
          <div className="creatoros-topbar-left">
            <span className="creatoros-pill">CreatorOS workspace</span>
            <span className="creatoros-topbar-title">Studio – Main workspace</span>
          </div>
          <div className="creatoros-topbar-right">
            <span className="creatoros-status-pill creatoros-status-pill-active">
              Workspace live
            </span>
            <button className="creatoros-avatar" aria-label="Workspace account">
              CO
            </button>
          </div>
        </header>
        <main className="creatoros-main-inner">{children}</main>
      </div>
    </div>
  );
}
