"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { news, type NewsCategory } from "@/data/news";
import SectionHeading from "@/components/shared/SectionHeading";
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
  });
}

export default function Noticias() {
  const [active, setActive] = useState<(typeof categories)[number]>("TODAS");

  const filtered = useMemo(() => {
    return active === "TODAS" ? news : news.filter((n) => n.category === active);
  }, [active]);

  const [featured, ...rest] = filtered;
  const smallNews = rest.slice(0, 4);

  return (
    <section className="bg-white py-20 sm:py-28" id="noticias">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Sala de prensa"
            title="Lo que está pasando en Puerto Cortés"
            subtitle="Cobertura editorial de obras, comunidad y vida municipal."
          />
          <Link
            href="/noticias"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-pc-green-400 hover:text-pc-green-700 sm:flex"
          >
            Ver todas las noticias
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "relative rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors",
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
            className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            {featured && (
              <Link
                href="/noticias"
                className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl"
              >
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10 p-7">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-3 py-1 text-xs font-bold tracking-wide",
                      "bg-white/90 text-pc-green-800"
                    )}
                  >
                    {featured.category}
                  </span>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-white text-balance sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-sm text-white/75">
                    {featured.excerpt}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-xs font-medium text-white/60">
                    <Calendar className="size-3.5" />
                    {formatDate(featured.date)}
                  </p>
                </div>
              </Link>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {smallNews.map((item) => (
                <Link
                  key={item.id}
                  href="/noticias"
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white transition hover:shadow-lg"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span
                      className={cn(
                        "w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide",
                        categoryColor[item.category]
                      )}
                    >
                      {item.category}
                    </span>
                    <h4 className="mt-2 line-clamp-2 font-heading text-sm font-bold text-foreground/90 group-hover:text-pc-green-700">
                      {item.title}
                    </h4>
                    <p className="mt-auto pt-2 text-[11px] text-muted-foreground">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </Link>
              ))}
              {smallNews.length === 0 && (
                <p className="col-span-2 self-center text-center text-sm text-muted-foreground">
                  No hay más noticias en esta categoría por ahora.
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <Link
          href="/noticias"
          className="mx-auto mt-8 flex w-fit items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground sm:hidden"
        >
          Ver todas las noticias
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
