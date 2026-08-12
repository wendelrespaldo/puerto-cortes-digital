"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Phone, Search, UserRound, Menu, ChevronDown, Palmtree } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon } from "@/components/shared/SocialIcons";
import { mainNav } from "@/data/nav";
import { useSearch } from "@/components/shared/SearchProvider";
import MegaMenu from "@/components/layout/MegaMenu";
import TourismMegaMenu from "@/components/layout/TourismMegaMenu";
import MobileMenu from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openSearch } = useSearch();
  const pathname = usePathname();

  // El Header no se desmonta entre rutas (vive en el layout raíz), así que
  // cualquier mega menú o el panel móvil deben cerrarse al cambiar de página.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleEnter(label: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }
  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }

  const activeItem = mainNav.find((n) => n.label === openMenu);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="hidden bg-pc-navy-950 text-pc-sand-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <a href="tel:+50427552560" className="flex items-center gap-1.5 hover:text-white">
              <Phone className="size-3.5" />
              (504) 2755-2560
            </a>
            <Link href="/transparencia" className="hover:text-white">
              Transparencia
            </Link>
            <Link href="/municipalidad#gestion" className="hover:text-white">
              Gestión Municipal
            </Link>
            <Link href="/municipalidad#economico" className="hover:text-white">
              Desarrollo Económico
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="opacity-80 hover:opacity-100">
              <FacebookIcon className="size-3.5" />
            </a>
            <a href="#" aria-label="Instagram" className="opacity-80 hover:opacity-100">
              <InstagramIcon className="size-3.5" />
            </a>
            <a href="#" aria-label="X (Twitter)" className="opacity-80 hover:opacity-100">
              <XIcon className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div
        className={cn(
          "border-b transition-all duration-300",
          scrolled
            ? "border-border/80 bg-white/90 shadow-sm backdrop-blur-md"
            : "border-transparent bg-white"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center justify-between gap-4 py-2.5">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <Image
                src="/images/logo/escudo-pc.png"
                alt="Escudo de la Municipalidad de Puerto Cortés"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
                priority
              />
              <span className="hidden leading-tight sm:block">
                <span className="block font-heading text-sm font-bold text-pc-green-800">
                  Puerto Cortés
                </span>
                <span className="block text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  Portal Digital
                </span>
              </span>
            </Link>

            <nav
              onMouseLeave={handleLeave}
              className="hidden items-center gap-1 lg:flex"
            >
              {mainNav.map((item) => (
                <div key={item.label} onMouseEnter={() => item.megaMenu && handleEnter(item.label)}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      item.highlight
                        ? "text-pc-blue-700 hover:bg-pc-blue-50"
                        : "text-foreground/80 hover:bg-pc-green-50 hover:text-pc-green-800",
                      openMenu === item.label &&
                        (item.highlight ? "bg-pc-blue-50" : "bg-pc-green-50 text-pc-green-800")
                    )}
                  >
                    {item.highlight && <Palmtree className="size-3.5 text-pc-amber-500" />}
                    <span className={item.highlight ? "font-semibold" : undefined}>
                      {item.label}
                    </span>
                    {item.megaMenu && (
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform",
                          openMenu === item.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openSearch()}
                className="hidden items-center gap-2 rounded-full border border-pc-green-200 bg-pc-green-50 px-4 py-2 text-sm font-medium text-pc-green-800 transition hover:border-pc-green-400 hover:bg-pc-green-100 sm:flex"
              >
                <Search className="size-4" />
                Buscar
              </button>
              <button
                onClick={() => openSearch()}
                aria-label="Buscar"
                className="flex items-center justify-center rounded-full border border-pc-green-200 bg-pc-green-50 p-2.5 text-pc-green-800 sm:hidden"
              >
                <Search className="size-4.5" />
              </button>
              <Link
                href="/tramites#portal"
                className="hidden items-center gap-2 rounded-full bg-pc-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-pc-green-900/20 transition hover:bg-pc-green-800 md:flex"
              >
                <UserRound className="size-4" />
                Portal ciudadano
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menú"
                className="flex items-center justify-center rounded-full border border-border p-2.5 text-foreground lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {activeItem && (
            <div onMouseEnter={() => handleEnter(activeItem.label)} onMouseLeave={handleLeave}>
              {activeItem.highlight ? (
                <TourismMegaMenu onNavigate={() => setOpenMenu(null)} />
              ) : (
                <MegaMenu item={activeItem} onNavigate={() => setOpenMenu(null)} />
              )}
            </div>
          )}
        </AnimatePresence>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
