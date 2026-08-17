"use client";

import { useState } from "react";
import { getFeaturedRecords, type MayorRecord } from "@/data/alcaldia";
import SectionHeading from "@/components/shared/SectionHeading";
import AlcaldeRecordCard from "@/components/sections/AlcaldeRecordCard";
import AlcaldeDetailSheet from "@/components/sections/AlcaldeDetailSheet";

export default function AlcaldeDestacados() {
  const featured = getFeaturedRecords();
  const [selected, setSelected] = useState<MayorRecord | null>(null);

  return (
    <section className="bg-pc-sand-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Proyectos destacados"
          title="Lo más relevante de la gestión"
          subtitle="Una selección de proyectos emblemáticos por su alcance, inversión o impacto en la comunidad."
        />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((rec) => (
            <AlcaldeRecordCard key={rec.id} record={rec} onClick={() => setSelected(rec)} />
          ))}
        </div>
      </div>

      <AlcaldeDetailSheet record={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
