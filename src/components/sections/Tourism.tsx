"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Compass } from "lucide-react";
import { tourismCategories, type TourismCategory } from "@/data/tourism";
import { cn } from "@/lib/utils";

// Composición editorial asimétrica: cada categoría ocupa una celda distinta
// de una grilla de 5 columnas × 2 filas en desktop.
const placement: Record<string, string> = {
  turismo: "lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-2",
  playas: "lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-1",
  puerto: "lg:col-start-4 lg:col-span-1 lg:row-start-1 lg:row-span-1",
  gastronomia: "lg:col-start-5 lg:col-span-1 lg:row-start-1 lg:row-span-1",
  cultura: "lg:col-start-3 lg:col-span-1 lg:row-start-2 lg:row-span-1",
  naturaleza: "lg:col-start-4 lg:col-span-2 lg:row-start-2 lg:row-span-1",
};

function CategoryTile({ cat, big = false }: { cat: TourismCategory; big?: boolean }) {
  return (
    <Link
      href={`/turismo#${cat.id}`}
      className={cn(
        "group relative flex h-48 flex-col justify-end overflow-hidden rounded-3xl",
        big && "h-72 lg:h-full"
      )}
    >
      {cat.image ? (
        <Image
          src={cat.image}
          alt={cat.title}
          fill
          sizes={big ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 20vw, 50vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className={cn("absolute inset-0 bg-gradient-to-br", cat.gradient)}>
          <cat.icon className="absolute -right-4 -top-4 size-28 text-white/10" strokeWidth={1} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent transition-opacity group-hover:from-black/90" />
      <cat.icon className="absolute right-4 top-4 size-4 text-white/70" />
      <div className={cn("relative z-10 p-5", big && "p-7")}>
        {big && (
          <span className="mb-2 inline-block rounded-full bg-pc-amber-400 px-3 py-1 text-xs font-bold text-pc-navy-900">
            {cat.tagline}
          </span>
        )}
        <h3 className={cn("font-heading font-bold text-white", big ? "text-2xl sm:text-3xl" : "text-base")}>
          {cat.title}
        </h3>
        {big && (
          <p className="mt-2 max-w-sm text-sm text-white/75">{cat.description}</p>
        )}
      </div>
    </Link>
  );
}

export default function Tourism() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const shown = ["turismo", "playas", "puerto", "gastronomia", "cultura", "naturaleza"]
    .map((id) => tourismCategories.find((c) => c.id === id))
    .filter((c): c is TourismCategory => !!c);
  const [main, ...rest] = shown;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-pc-blue-900 via-pc-navy-950 to-pc-green-950 py-20 sm:py-28"
      id="puerto-cortes-destino"
    >
      <motion.div
        style={{ y: blobY }}
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 size-96 rounded-full bg-pc-blue-400/10 blur-3xl"
      />
      <motion.div
        style={{ y: blobY }}
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-pc-amber-400/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-pc-amber-300 uppercase">
              <Compass className="size-3.5" />
              Destino Puerto Cortés
            </span>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white text-balance sm:text-5xl">
              Mar, historia y sabor caribeño
            </h2>
            <p className="mt-3 text-base text-white/70 sm:text-lg">
              El primer puerto de Honduras: donde la ciudad se encuentra con el Caribe.
            </p>
          </motion.div>
          <Link
            href="/turismo"
            className="group hidden shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-pc-amber-400 to-pc-coral-500 px-6 py-3 text-sm font-bold text-pc-navy-900 shadow-lg shadow-pc-amber-900/20 transition hover:shadow-xl sm:flex"
          >
            Descubrir Puerto Cortés
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-2 lg:gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className={cn("sm:col-span-2", placement[main.id])}
          >
            <CategoryTile cat={main} big />
          </motion.div>

          {rest.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className={placement[cat.id]}
            >
              <CategoryTile cat={cat} />
            </motion.div>
          ))}
        </div>

        <Link
          href="/turismo"
          className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-pc-amber-400 to-pc-coral-500 px-6 py-3 text-sm font-bold text-pc-navy-900 sm:hidden"
        >
          Descubrir Puerto Cortés
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
