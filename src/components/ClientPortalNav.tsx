"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FilePlus2,
  Files,
  Home,
} from "lucide-react";

type ClientPortalNavProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const links = [
  {
    href: "/client",
    label: "Home",
    icon: Home,
  },
  {
    href: "/client/nominations/new",
    label: "New Nomination",
    icon: FilePlus2,
  },
  {
    href: "/client/nominations",
    label: "My Nominations",
    icon: ClipboardList,
  },
  {
    href: "/client/drafts",
    label: "Drafts",
    icon: Files,
  },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/client") {
    return pathname === "/client";
  }

  if (href === "/client/nominations/new") {
    return pathname === "/client/nominations/new";
  }

  if (href === "/client/nominations") {
    return (
      pathname === "/client/nominations" ||
      (pathname.startsWith("/client/nominations/") &&
        pathname !== "/client/nominations/new")
    );
  }

  if (href === "/client/drafts") {
    return pathname === "/client/drafts" || pathname.startsWith("/client/drafts/");
  }

  return pathname === href;
}

export default function ClientPortalNav({
  isOpen,
  onToggle,
}: ClientPortalNavProps) {
  const pathname = usePathname();

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-slate-200 bg-white">
        <div className="flex min-h-16 w-full items-center justify-between px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
              RRC Polytech
            </p>
            <h1 className="text-lg font-bold text-slate-950">
              ACE Project Space
            </h1>
          </div>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] border-r border-slate-200 bg-white transition-all duration-200 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          className="absolute -right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
          aria-label={isOpen ? "Collapse navigation" : "Expand navigation"}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <nav className="flex flex-col gap-1 px-2 py-6" aria-label="Client">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = isActiveLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.label}
                className={`flex min-h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${
                  isOpen ? "justify-start" : "justify-center"
                } ${
                  isActive
                    ? "bg-red-50 text-red-700"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                {isOpen ? <span>{link.label}</span> : null}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}