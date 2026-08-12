"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { news, type NewsCategory } from "@/data/news";
import { cn } from "@/lib/utils";

const categories: (NewsCategory | "TODAS")[] = [
  "TODAS",
  "OBRAS",
  "COMUNIDAD",
  "MUNICIPALIDAD",
  "DEPORTE",
  "CULTURA",
  "TURISMO",
];

const categoryColor: Record<NewsCategory, string> = {
  OBRAS: "bg-pc-amber-500/15 text-pc-amber-600",
  COMUNIDAD: "bg-pc-coral-500/15 text-pc-coral-600",
  MUNICIPALIDAD: "bg-pc-green-100 text-pc-green-700",
  DEPORTE: "bg-pc-blue-100 text-pc-blue-700",
  CULTURA: "bg-purple-100 text-purple-700",
  TURISMO: "bg-teal-100 text-teal-700",
};

function formatDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("es-HN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function NoticiasGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("TODAS");

  const filtered = useMemo(
    () => (active === "TODAS" ? news : news.filter((n) => n.category === active)),
    [active]
  );

  // La grilla se filtra en el cliente, así que el navegador puede intentar
  // saltar al #hash antes de que el contenido termine de hidratarse. Se
  // reintenta el scroll una vez montado.
  useEffect(() => {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    el?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2" id="prensa">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors",
                active === cat
                  ? "bg-pc-green-700 text-white"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item) => (
              <Link
                key={item.id}
                id={item.id}
                href="/noticias"
                className="group scroll-mt-28 flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-white transition hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={cn(
                      "w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide",
                      categoryColor[item.category]
                    )}
                  >
                    {item.category}
                  </span>
                  <h3 className="mt-2.5 line-clamp-2 font-heading text-base font-bold text-foreground/90 group-hover:text-pc-green-700">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
                    {item.excerpt}
                  </p>
                  <p className="mt-auto flex items-center gap-1.5 pt-4 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" />
                    {formatDate(item.date)}
                  </p>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
                No hay noticias en esta categoría por ahora.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
