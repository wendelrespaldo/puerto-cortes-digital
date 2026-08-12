"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Phone, Search, UserRound } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { mainNav } from "@/data/nav";
import { useSearch } from "@/components/shared/SearchProvider";
import { cn } from "@/lib/utils";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { openSearch } = useSearch();

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" className="w-[88%] gap-0 p-0 sm:max-w-sm">
        <SheetHeader className="flex-row items-center gap-2.5 border-b border-border p-4">
          <Image
            src="/images/logo/escudo-pc.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <SheetTitle className="font-heading text-sm font-bold text-pc-green-800">
            Puerto Cortés Digital
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-3 py-3">
          <button
            onClick={() => {
              onClose();
              openSearch();
            }}
            className="mb-3 flex w-full items-center gap-2 rounded-2xl border border-pc-green-200 bg-pc-green-50 px-4 py-3 text-sm font-medium text-pc-green-800"
          >
            <Search className="size-4.5" />
            Buscar trámite, servicio, noticia...
          </button>

          <nav className="space-y-1">
            {mainNav.map((item) => (
              <div key={item.label} className="rounded-xl">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex-1 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground/90"
                  >
                    {item.label}
                  </Link>
                  {item.megaMenu && (
                    <button
                      aria-label={`Expandir ${item.label}`}
                      onClick={() =>
                        setExpanded((prev) => (prev === item.label ? null : item.label))
                      }
                      className="rounded-full p-2.5 text-muted-foreground"
                    >
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform",
                          expanded === item.label && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </div>
                {item.megaMenu && expanded === item.label && (
                  <div className="mb-2 space-y-3 rounded-2xl bg-muted/50 p-3">
                    {item.megaMenu.groups.map((group) => (
                      <div key={group.title}>
                        <p className="mb-1 px-1 text-[11px] font-semibold tracking-wide text-pc-green-700 uppercase">
                          {group.title}
                        </p>
                        <ul>
                          {group.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-foreground/80"
                              >
                                <link.icon className="size-4 text-pc-green-600" />
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="space-y-3 border-t border-border p-4">
          <Link
            href="/tramites#portal"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full bg-pc-green-700 px-4 py-3 text-sm font-semibold text-white"
          >
            <UserRound className="size-4" />
            Portal ciudadano
          </Link>
          <a
            href="tel:+50427552560"
            className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground"
          >
            <Phone className="size-4" />
            (504) 2755-2560
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
