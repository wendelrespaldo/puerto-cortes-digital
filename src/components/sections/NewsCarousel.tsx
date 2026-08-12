"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { news } from "@/data/news";
import { cn } from "@/lib/utils";

function formatDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("es-HN", {
    day: "numeric",
    month: "short",
  });
}

export default function NewsCarousel() {
  const [autoplay] = useState(() =>
    Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [autoplay]
  );
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-pc-sand-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-heading text-xl font-bold text-foreground">
            Más noticias en video e imágenes
          </h3>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={scrollPrev}
              aria-label="Anterior"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition hover:bg-pc-green-600 hover:text-white"
            >
              <ChevronLeft className="size-4.5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Siguiente"
              className="flex size-10 items-center justify-center rounded-full border border-border bg-white text-foreground transition hover:bg-pc-green-600 hover:text-white"
            >
              <ChevronRight className="size-4.5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex">
            {news.map((item) => (
              <div
                key={item.id}
                className="min-w-0 shrink-0 grow-0 basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <Link
                  href="/noticias"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-white transition hover:shadow-lg"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h4 className="line-clamp-2 font-heading text-sm font-bold text-foreground/90">
                      {item.title}
                    </h4>
                    <p className="mt-auto flex items-center gap-1.5 pt-3 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" />
                      {formatDate(item.date)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ir a la noticia ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === selected ? "w-6 bg-pc-green-600" : "w-1.5 bg-pc-green-600/25"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
