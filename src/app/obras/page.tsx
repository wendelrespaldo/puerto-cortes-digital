import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import ObrasGrid from "@/components/sections/ObrasGrid";
import ProjectMap from "@/components/sections/ProjectMap";

export const metadata: Metadata = {
  title: "Obras — Puerto Cortés Digital",
};

export default function ObrasPage() {
  return (
    <>
      <PageHero
        eyebrow="Obras"
        title="Puerto Cortés se transforma"
        subtitle="Consulta el detalle, la inversión y el avance de cada proyecto municipal."
      />
      <ObrasGrid />
      <ProjectMap />
    </>
  );
}
