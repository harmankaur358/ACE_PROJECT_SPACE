"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import ClientPortalNav from "@/components/ClientPortalNav";

type ClientLayoutProps = {
  children: ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <ClientPortalNav
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen((current) => !current)}
      />

      <main
        className={`min-h-screen pt-16 transition-all duration-200 ${
          isSidebarOpen ? "pl-64" : "pl-16"
        }`}
      >
        {children}
      </main>
    </div>
  );
}