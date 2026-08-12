"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, ChevronRight } from "lucide-react";
import { tourismCategories } from "@/data/tourism";
import { cn } from "@/lib/utils";
import HistoryArticle from "@/components/sections/HistoryArticle";
import CityStats from "@/components/sections/CityStats";
import LiveTraditions from "@/components/sections/LiveTraditions";
import MiniStories from "@/components/sections/MiniStories";
import ExploreMap from "@/components/sections/ExploreMap";

export default function TourismStory() {
  const [active, setActive] = useState(tourismCategories[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    for (const cat of tourismCategories) {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero turístico */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-pc-navy-950">
        <Image
          src="/images/hero/hero-ciudad-mar.jpg"
          alt="Vista de Puerto Cortés hacia el mar Caribe"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pc-navy-950 via-pc-navy-950/60 to-pc-blue-950/40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <nav className="mb-5 flex items-center gap-1.5 text-xs text-white/50">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-white/80">Puerto Cortés</span>
          </nav>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-pc-amber-300 uppercase backdrop-blur-sm"
          >
            <Compass className="size-3.5" />
            Destino Puerto Cortés
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="max-w-2xl font-heading text-4xl font-extrabold tracking-tight text-white text-balance sm:text-6xl"
          >
            Mar, historia y sabor caribeño
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-4 max-w-xl text-base text-white/75 sm:text-lg"
          >
            El primer puerto de Honduras: siete formas de conocer la ciudad donde
            el Caribe, la cultura y la vida porteña se encuentran.
          </motion.p>
        </div>
      </section>

      {/* Navegación por categorías */}
      <div className="sticky top-[72px] z-30 border-b border-border bg-white/95 backdrop-blur-md md:top-[104px]">
        <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-3 scrollbar-none sm:px-6 lg:px-8">
          {tourismCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors",
                active === cat.id
                  ? "bg-pc-green-700 text-white"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted"
              )}
            >
              <cat.icon className="size-3.5" />
              {cat.title}
            </a>
          ))}
        </div>
      </div>

      <HistoryArticle />

      {/* Bloques editoriales por categoría */}
      {tourismCategories.map((cat, i) => {
        const reverse = i % 2 === 1;
        return (
          <section
            key={cat.id}
            id={cat.id}
            className={cn(
              "scroll-mt-36 py-16 sm:py-20",
              i % 2 === 0 ? "bg-white" : "bg-pc-sand-50"
            )}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div
                className={cn(
                  "grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14",
                  reverse && "lg:[&>*:first-child]:order-2"
                )}
              >
                <motion.div
                  initial={{ opacity: 0, x: reverse ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative h-72 overflow-hidden rounded-3xl sm:h-96"
                >
                  {cat.image ? (
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className={cn("absolute inset-0 flex items-center justify-center bg-gradient-to-br", cat.gradient)}>
                      <cat.icon className="size-28 text-white/20" strokeWidth={1} />
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: reverse ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-pc-green-100 px-3.5 py-1 text-xs font-semibold tracking-wide text-pc-green-700 uppercase">
                    <cat.icon className="size-3.5" />
                    {cat.tagline}
                  </span>
                  <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
                    {cat.title}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                    {cat.longText}
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      <CityStats />
      <LiveTraditions />
      <MiniStories />
      <ExploreMap />

      {/* Cierre */}
      <section className="relative overflow-hidden bg-pc-navy-950 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-pc-amber-300 uppercase">
            Orgullo porteño
          </span>
          <h2 className="font-heading text-3xl font-bold text-balance sm:text-4xl">
            Puerto Cortés te espera
          </h2>
          <p className="mt-3 text-base text-white/70 sm:text-lg">
            Ven a conocer la ciudad donde el Caribe, la historia y la vida municipal se encuentran.
          </p>
          <Link
            href="/tramites#te-escucha"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pc-amber-400 to-pc-coral-500 px-6 py-3 text-sm font-bold text-pc-navy-900 transition hover:shadow-xl"
          >
            Comparte tu experiencia
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
