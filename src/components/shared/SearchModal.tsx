"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  FileText,
  Wrench,
  Newspaper,
  FileStack,
  HardHat,
  Palmtree,
  ArrowRight,
  X,
  CornerDownLeft,
} from "lucide-react";
import {
  searchMock,
  popularSearches,
  bestMatch,
  type SearchResultGroup,
} from "@/data/search";
import { cn } from "@/lib/utils";

const groupIcons: Record<SearchResultGroup, React.ElementType> = {
  TRÁMITES: FileText,
  SERVICIOS: Wrench,
  OBRAS: HardHat,
  NOTICIAS: Newspaper,
  "PUERTO CORTÉS": Palmtree,
  DOCUMENTOS: FileStack,
};

export default function SearchModal({
  open,
  onClose,
  initialQuery = "",
}: {
  open: boolean;
  onClose: () => void;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    if (open) setQuery(initialQuery);
  }, [open, initialQuery]);

  const results = useMemo(() => searchMock(query), [query]);
  const totalResults = Object.values(results).reduce((n, r) => n + r.length, 0);
  const topMatch = useMemo(() => bestMatch(query), [query]);

  function goToTopMatch() {
    if (topMatch) {
      router.push(topMatch.href);
      onClose();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    goToTopMatch();
  }

  // El Dialog de Base UI puede interceptar el keydown antes de que llegue al
  // submit nativo del <form>, así que Enter se maneja aquí directamente.
  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      goToTopMatch();
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="top-[8%] max-w-2xl translate-y-0 gap-0 overflow-hidden rounded-3xl border-0 p-0 shadow-2xl sm:max-w-2xl"
      >
        <DialogTitle className="sr-only">¿Qué estás buscando?</DialogTitle>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-b border-border px-5 py-4 sm:px-6"
        >
          <Search className="size-5 shrink-0 text-pc-green-600" aria-hidden />
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground">
              ¿Qué estás buscando?
            </p>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Buscar trámite, servicio, obra, noticia..."
              aria-label="Buscar trámite, servicio, obra, noticia o documento"
              className="w-full bg-transparent font-heading text-lg font-semibold text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground/70"
            />
          </div>
          {query && topMatch && (
            <button
              type="submit"
              className="hidden shrink-0 items-center gap-1.5 rounded-full bg-pc-green-100 px-3 py-1.5 text-xs font-semibold text-pc-green-800 transition hover:bg-pc-green-200 sm:flex"
            >
              Ir
              <CornerDownLeft className="size-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar búsqueda"
            className="rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto px-3 py-3 sm:px-4">
          {!query && (
            <div className="px-2 py-3">
              <p className="mb-2.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Búsquedas populares
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Link
                    key={term.label}
                    href={term.href}
                    onClick={onClose}
                    className="rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-sm text-foreground/80 transition hover:border-pc-green-300 hover:bg-pc-green-50 hover:text-pc-green-800"
                  >
                    {term.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={query}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-5 pb-2"
            >
              {(Object.keys(results) as SearchResultGroup[]).map((group) => {
                const items = results[group];
                if (items.length === 0) return null;
                const Icon = groupIcons[group];
                return (
                  <div key={group} className="px-2">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      <Icon className="size-3.5" />
                      {group}
                    </p>
                    <ul className="space-y-1">
                      {items.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition hover:bg-pc-green-50"
                          >
                            <span className="text-sm font-medium text-foreground/90 group-hover:text-pc-green-800">
                              {item.title}
                            </span>
                            <ArrowRight className="size-4 shrink-0 -translate-x-1 text-pc-green-600 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {query && totalResults === 0 && (
                <div className="px-3 py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No encontramos resultados para{" "}
                    <span className="font-medium text-foreground">
                      &ldquo;{query}&rdquo;
                    </span>
                    .
                  </p>
                  <p className="mt-4 mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Prueba con
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {popularSearches.slice(0, 5).map((term) => (
                      <Link
                        key={term.label}
                        href={term.href}
                        onClick={onClose}
                        className="rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-sm text-foreground/80 transition hover:border-pc-green-300 hover:bg-pc-green-50 hover:text-pc-green-800"
                      >
                        {term.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className={cn(
            "flex items-center justify-between border-t border-border bg-muted/40 px-5 py-2.5 text-[11px] text-muted-foreground sm:px-6"
          )}
        >
          <span className="flex items-center gap-3">
            <span>ESC para cerrar</span>
            {topMatch && (
              <span className="hidden items-center gap-1 sm:flex">
                <CornerDownLeft className="size-3" />
                para ir a &ldquo;{topMatch.title}&rdquo;
              </span>
            )}
          </span>
          <span>Puerto Cortés Digital</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
