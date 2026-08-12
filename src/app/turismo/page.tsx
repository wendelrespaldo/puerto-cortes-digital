import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import { tourismItems } from "@/data/programs";

export const metadata: Metadata = {
  title: "Turismo — Puerto Cortés Digital",
};

export default function TurismoPage() {
  return (
    <>
      <PageHero
        eyebrow="Puerto Cortés"
        title="Descubre Puerto Cortés"
        subtitle="El primer puerto de Honduras: mar Caribe, historia y sabor porteño."
      />

      <section id="playas" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Cultura y Turismo" title="Lo que nos hace únicos" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {tourismItems.map((item, i) => (
              <div
                key={item.id}
                className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="relative z-10 p-6">
                  <h3 className="font-heading text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pc-navy-950 py-20 text-center text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Orgullo porteño"
            title="Puerto Cortés te espera"
            subtitle="Ven a conocer la ciudad donde el Caribe, la historia y la vida municipal se encuentran."
            tone="dark"
            align="center"
          />
        </div>
      </section>
    </>
  );
}
