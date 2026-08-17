"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize,
  Minimize,
  MapPin,
  Radio,
  Landmark,
  ArrowUpRight,
} from "lucide-react";
import {
  records,
  categoryMeta,
  statusMeta,
  transferBudget,
  openGovernment,
  getDashboardStats,
  getFeaturedRecords,
  getCategoryBreakdown,
  getStatusBreakdown,
  type RecordCategory,
} from "@/data/alcaldia";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import ProgressBar from "@/components/shared/ProgressBar";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 8000;

const slides = [
  { id: "portada", label: "Portada" },
  { id: "cifras", label: "En cifras" },
  { id: "categorias", label: "Categorías" },
  { id: "ciclo", label: "Ciclo de vida" },
  { id: "inversion", label: "Inversión" },
  { id: "destacados", label: "Destacados" },
  { id: "cierre", label: "Cierre" },
] as const;

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 48 : -48,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -48 : 48,
    opacity: 0,
    scale: 0.98,
  }),
};

export default function AlcaldePresentationDeck({ onClose }: { onClose: () => void }) {
  const stats = useMemo(() => getDashboardStats(), []);
  const featured = useMemo(() => getFeaturedRecords(), []);
  const categoryBreakdown = useMemo(() => getCategoryBreakdown(), []);
  const statusBreakdown = useMemo(() => getStatusBreakdown(), []);

  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [autoplay, setAutoplay] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const goTo = useCallback((newIndex: number, dir: number) => {
    const clamped = (newIndex + slides.length) % slides.length;
    setSlide([clamped, dir]);
  }, []);

  const next = useCallback(() => goTo(index + 1, 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1, -1), [index, goTo]);

  // Autoplay avanza de tema en tema; se reinicia cada vez que cambia el slide o se pausa/reanuda.
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [autoplay, index, next]);

  useEffect(() => {
    function onFsChange() {
      setFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (document.fullscreenElement) return; // deja que el navegador salga de pantalla completa primero
        onClose();
        return;
      }
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key.toLowerCase() === "f") {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "p") {
        setAutoplay((a) => !a);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, next, prev]);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  const current = slides[index];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-[28rem] animate-blob bg-pc-green-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 size-96 animate-blob bg-pc-blue-400/10 blur-3xl"
        style={{ animationDelay: "3s" }}
      />

      {/* Barra de progreso de slides */}
      <div className="relative z-10 flex shrink-0 gap-1.5 px-6 pt-5 sm:px-10">
        {slides.map((s, i) => (
          <div key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
            {i < index && <div className="h-full w-full bg-white/70" />}
            {i === index && autoplay && (
              <motion.div
                key={`progress-${index}`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                className="h-full bg-white"
              />
            )}
            {i === index && !autoplay && <div className="h-full w-full bg-white/60" />}
          </div>
        ))}
      </div>

      {/* Encabezado */}
      <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 px-6 py-4 sm:px-10">
        <div>
          <p className="text-xs font-semibold tracking-wide text-pc-amber-400 uppercase">
            Gestión del Alcalde · Giancarlo Rodríguez
          </p>
          <p className="font-heading text-sm font-bold text-white sm:text-base">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} ·{" "}
            {current.label}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => setAutoplay((a) => !a)}
            aria-label={autoplay ? "Pausar avance automático" : "Reproducir avance automático"}
            title={autoplay ? "Pausar (P)" : "Reproducir (P)"}
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 sm:size-11"
          >
            {autoplay ? <Pause className="size-4.5" /> : <Play className="size-4.5" />}
          </button>
          <button
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            title={fullscreen ? "Salir de pantalla completa (F)" : "Pantalla completa (F)"}
            className="hidden size-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 sm:flex sm:size-11"
          >
            {fullscreen ? <Minimize className="size-4.5" /> : <Maximize className="size-4.5" />}
          </button>
          <button
            onClick={onClose}
            aria-label="Cerrar modo presentación"
            title="Cerrar (Esc)"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 sm:size-11"
          >
            <X className="size-4.5" />
          </button>
        </div>
      </div>

      {/* Slide activo */}
      <div className="relative min-h-0 flex-1">
        {/* Zonas de clic para avanzar/retroceder (accesibles vía botones también) */}
        <button
          onClick={prev}
          aria-label="Slide anterior"
          className="group absolute inset-y-0 left-0 z-10 hidden w-16 items-center justify-start pl-2 sm:flex"
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
            <ChevronLeft className="size-5" />
          </span>
        </button>
        <button
          onClick={next}
          aria-label="Siguiente slide"
          className="group absolute inset-y-0 right-0 z-10 hidden w-16 items-center justify-end pr-2 sm:flex"
        >
          <span className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
            <ChevronRight className="size-5" />
          </span>
        </button>

        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-y-auto px-6 py-6 sm:px-16 sm:py-10"
          >
            <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col justify-center">
              {current.id === "portada" && <SlidePortada total={stats.total} />}
              {current.id === "cifras" && <SlideCifras stats={stats} />}
              {current.id === "categorias" && (
                <SlideCategorias breakdown={categoryBreakdown} onNavigate={onClose} />
              )}
              {current.id === "ciclo" && <SlideCiclo breakdown={statusBreakdown} total={stats.total} />}
              {current.id === "inversion" && <SlideInversion onNavigate={onClose} />}
              {current.id === "destacados" && (
                <SlideDestacados featured={featured} active={current.id === slides[index].id} />
              )}
              {current.id === "cierre" && <SlideCierre onNavigate={onClose} />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navegación por puntos */}
      <div className="relative z-10 flex shrink-0 items-center justify-center gap-2 pb-6 pt-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            aria-label={`Ir a ${s.label}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-7 bg-white" : "w-1.5 bg-white/25 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ───────────────────────── Slides ─────────────────────────

function SlidePortada({ total }: { total: number }) {
  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-5 flex size-16 items-center justify-center sm:size-20"
      >
        <Image
          src="/images/logo/escudo-pc.png"
          alt="Escudo de la Municipalidad de Puerto Cortés"
          width={80}
          height={80}
          className="h-full w-full object-contain"
          priority
        />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-6 inline-flex items-center gap-1.5 rounded-full bg-pc-green-500/15 px-4 py-1.5 text-xs font-semibold text-pc-green-200 sm:text-sm"
      >
        <Radio className="size-3.5 animate-pulse" />
        {total} proyectos y acciones en seguimiento
      </motion.span>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="text-xs font-semibold tracking-wide text-pc-amber-400 uppercase sm:text-sm"
      >
        Gestión del Alcalde
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.14 }}
        className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-white text-balance sm:text-6xl lg:text-7xl"
      >
        Giancarlo Rodríguez
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 text-balance sm:text-lg"
      >
        Con la mano de Dios, que es nuestra fortaleza, con una corporación municipal comprometida, con
        un equipo de trabajo comprometido: los avances de nuestra gestión en Puerto Cortés.
      </motion.p>
    </div>
  );
}

function SlideCifras({ stats }: { stats: ReturnType<typeof getDashboardStats> }) {
  const tiles = [
    { label: "Proyectos y acciones", value: stats.total },
    { label: "Finalizados", value: stats.finalizados },
    { label: "En ejecución", value: stats.enEjecucion },
    { label: "En licitación", value: stats.enLicitacion },
    { label: "Aprobados", value: stats.aprobados },
    { label: "Comunidades beneficiadas", value: stats.comunidades },
  ];

  return (
    <div>
      <SlideHeading eyebrow="Resumen ejecutivo" title="La gestión, en cifras" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {tiles.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center sm:p-7"
          >
            <AnimatedCounter
              value={s.value}
              className="block font-heading text-4xl font-extrabold text-white sm:text-6xl"
            />
            <p className="mt-2 text-xs font-medium text-pc-green-100 sm:text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-6 rounded-3xl border border-pc-amber-400/30 bg-pc-amber-400/10 p-5 text-center sm:p-7"
      >
        <span className="block font-heading text-3xl font-extrabold text-white sm:text-5xl">
          {stats.inversionAprobadaDisplay}
        </span>
        <p className="mt-1.5 text-xs font-medium text-pc-amber-400 sm:text-sm">
          Inversión aprobada — Transferencia Presupuestaria No. 4
        </p>
      </motion.div>
    </div>
  );
}

function SlideCategorias({
  breakdown,
  onNavigate,
}: {
  breakdown: ReturnType<typeof getCategoryBreakdown>;
  onNavigate: () => void;
}) {
  const [selected, setSelected] = useState<RecordCategory | null>(null);
  const max = Math.max(...breakdown.map((b) => b.count));
  const selectedMeta = selected ? categoryMeta[selected] : null;
  const selectedRecords = selected ? records.filter((r) => r.category === selected).slice(0, 4) : [];

  return (
    <div>
      <SlideHeading eyebrow="Áreas de gestión" title="Proyectos por categoría" />
      <p className="mt-1 text-sm text-white/50">Toca una barra para ver ejemplos de esa categoría</p>

      <div className="mt-8 space-y-5">
        {breakdown.map((item, i) => {
          const isSelected = selected === item.category;
          return (
            <motion.button
              key={item.category}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              onClick={() => setSelected((s) => (s === item.category ? null : item.category))}
              className="block w-full text-left"
            >
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "flex min-w-0 items-center gap-2 text-sm font-medium transition-colors sm:text-base",
                    isSelected ? "text-white" : "text-white/75"
                  )}
                >
                  <item.icon className="size-4 shrink-0" style={{ color: item.color }} />
                  <span className="truncate">{item.label}</span>
                </span>
                <span className="shrink-0 font-heading text-lg font-bold text-white sm:text-xl">
                  {item.count}
                </span>
              </div>
              <div className="h-3.5 w-full overflow-hidden rounded-full bg-white/10 sm:h-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / max) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.06, ease: "easeOut" }}
                  className={cn(
                    "h-full rounded-full transition-[filter] duration-200",
                    isSelected ? "brightness-110" : "brightness-90 hover:brightness-100"
                  )}
                  style={{
                    backgroundColor: item.color,
                    boxShadow: isSelected ? `0 0 0 2px rgba(255,255,255,0.5)` : undefined,
                  }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selectedMeta && selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 overflow-hidden"
          >
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm text-white/60">{selectedMeta.description}</p>
              <ul className="mt-4 space-y-2.5">
                {selectedRecords.map((rec) => (
                  <li key={rec.id} className="flex items-center gap-2.5 text-sm text-white/85">
                    <span className={cn("size-1.5 shrink-0 rounded-full", statusMeta[rec.status].dot)} />
                    <span className="truncate">{rec.title}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/gestion-alcalde?categoria=${selected}#explorador`}
                onClick={onNavigate}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pc-green-300 hover:text-pc-green-200"
              >
                Ver los {breakdown.find((b) => b.category === selected)?.count} proyectos
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SlideCiclo({
  breakdown,
  total,
}: {
  breakdown: ReturnType<typeof getStatusBreakdown>;
  total: number;
}) {
  const max = Math.max(...breakdown.map((b) => b.count), 1);

  return (
    <div>
      <SlideHeading eyebrow="De la idea a la entrega" title="Ciclo de vida de los proyectos" />
      <p className="mt-1 text-sm text-white/50">{total} registros en todas las etapas</p>

      <div className="mt-10 flex items-end gap-2.5 sm:gap-4">
        {breakdown.map((item, i) => (
          <motion.div
            key={item.status}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="group flex flex-1 flex-col items-center gap-2.5"
          >
            <span className="font-heading text-lg font-bold text-white sm:text-2xl">{item.count}</span>
            <div className="relative flex h-36 w-full items-end overflow-hidden rounded-xl bg-white/5 sm:h-56">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.count / max) * 100}%` }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
                className="w-full rounded-xl transition-[filter] duration-300 group-hover:brightness-110"
                style={{ backgroundColor: item.color }}
              />
            </div>
            <span className="text-center text-[10px] leading-tight text-white/60 sm:text-xs">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideInversion({ onNavigate }: { onNavigate: () => void }) {
  const sample = transferBudget.projects.slice(0, 4);

  return (
    <div className="text-center">
      <SlideHeading eyebrow="Inversión y transparencia" title={transferBudget.numberLabel} align="center" />
      <p className="mx-auto mt-2 max-w-xl text-sm text-white/60">
        {transferBudget.session} — {transferBudget.approvalNote}
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto mt-8 flex w-fit items-center gap-4 rounded-3xl border border-pc-amber-400/30 bg-pc-amber-400/10 px-8 py-6"
      >
        <span className="flex size-14 items-center justify-center rounded-2xl bg-pc-amber-400/20 text-pc-amber-400">
          <Landmark className="size-7" />
        </span>
        <span className="font-heading text-4xl font-extrabold text-white sm:text-6xl">
          {transferBudget.totalAmountDisplay}
        </span>
      </motion.div>

      <div className="mx-auto mt-8 max-w-xl space-y-2.5 text-left">
        {sample.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-pc-amber-400" />
            <span className="truncate text-sm text-white/80">{p.title}</span>
          </motion.div>
        ))}
      </div>

      <Link
        href="/gestion-alcalde#transparencia"
        onClick={onNavigate}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-pc-green-300 hover:text-pc-green-200"
      >
        Ver los {transferBudget.projects.length} proyectos aprobados
        <ArrowUpRight className="size-4" />
      </Link>
    </div>
  );
}

function SlideDestacados({
  featured,
  active,
}: {
  featured: ReturnType<typeof getFeaturedRecords>;
  active: boolean;
}) {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 4800, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay]);
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi || !active) return;
    const onInit = () => setSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("init", onInit);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
    onInit();
    onSelect();
    return () => {
      emblaApi.off("init", onInit);
      emblaApi.off("reInit", onInit);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, active]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <SlideHeading eyebrow="Lo más relevante" title="Proyectos destacados" />
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            onClick={scrollPrev}
            aria-label="Anterior"
            className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Siguiente"
            className="flex size-9 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex">
          {featured.map((rec) => {
            const category = categoryMeta[rec.category];
            const status = statusMeta[rec.status];
            return (
              <div key={rec.id} className="min-w-0 shrink-0 grow-0 basis-[88%] pl-4 sm:basis-1/2">
                <div
                  className={cn(
                    "flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br p-6",
                    category.gradient
                  )}
                >
                  <span className="flex w-fit items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-white" />
                    {status.label}
                  </span>
                  <h3 className="mt-4 font-heading text-lg font-bold text-white sm:text-xl">{rec.title}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-white/70">
                    <MapPin className="size-3.5 shrink-0" />
                    {rec.community}
                  </p>
                  <p className="mt-3 flex-1 text-sm text-white/80">{rec.description}</p>
                  <p className="mt-4 text-sm font-semibold text-white">{rec.investment}</p>
                  {rec.progress !== null && (
                    <div className="mt-3">
                      <ProgressBar value={rec.progress} className="h-1.5 bg-white/15" barClassName="bg-white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Ir al proyecto ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === selected ? "w-6 bg-white" : "w-1.5 bg-white/25"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function SlideCierre({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="text-center">
      <SlideHeading eyebrow="Gobierno de puertas abiertas" title="Cerca de la gente, en cada sector" align="center" />
      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
        {openGovernment.pillars.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <p className="text-sm font-semibold text-white">{p.title}</p>
            <p className="mt-1 text-xs text-white/55">{p.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="mt-10"
      >
        <Link
          href="/gestion-alcalde#explorador"
          onClick={onNavigate}
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-pc-navy-900 transition hover:bg-pc-amber-400 sm:text-base"
        >
          Ver todos los proyectos
          <ArrowUpRight className="size-4.5" />
        </Link>
        <p className="mt-4 text-xs text-white/40">Puerto Cortés Digital · gestión municipal en un solo lugar</p>
      </motion.div>
    </div>
  );
}

function SlideHeading({
  eyebrow,
  title,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-pc-amber-400 uppercase"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="mt-3 font-heading text-2xl font-extrabold text-white text-balance sm:text-4xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
