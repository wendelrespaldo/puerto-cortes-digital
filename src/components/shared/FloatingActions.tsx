"use client";

import Link from "next/link";
import { FileText, Megaphone, Phone, Search } from "lucide-react";
import { useSearch } from "@/components/shared/SearchProvider";

const items = [
  { label: "Buscar", icon: Search, action: "search" as const },
  { label: "Trámites", icon: FileText, href: "/tramites" },
  { label: "Denunciar", icon: Megaphone, href: "/tramites#denuncias" },
  { label: "Contactar", icon: Phone, href: "/municipalidad#contacto" },
];

export default function FloatingActions() {
  const { openSearch } = useSearch();

  return (
    <>
      {/* Desktop: floating vertical bar */}
      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 rounded-full border border-border bg-white/90 p-2 shadow-xl shadow-black/5 backdrop-blur-md lg:flex">
        {items.map((item) =>
          item.action === "search" ? (
            <button
              key={item.label}
              onClick={() => openSearch()}
              aria-label={item.label}
              title={item.label}
              className="group flex size-11 items-center justify-center rounded-full text-pc-green-700 transition hover:bg-pc-green-600 hover:text-white"
            >
              <item.icon className="size-5" />
            </button>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className="group flex size-11 items-center justify-center rounded-full text-pc-green-700 transition hover:bg-pc-green-600 hover:text-white"
            >
              <item.icon className="size-5" />
            </Link>
          )
        )}
      </div>

      {/* Mobile: bottom bar */}
      <nav
        aria-label="Acciones rápidas"
        className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-border bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md lg:hidden"
      >
        {items.map((item) =>
          item.action === "search" ? (
            <button
              key={item.label}
              onClick={() => openSearch()}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-pc-green-800"
            >
              <item.icon className="size-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-foreground/70"
            >
              <item.icon className="size-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          )
        )}
      </nav>
    </>
  );
}
