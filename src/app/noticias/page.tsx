import type { Metadata } from "next";
import PageHero from "@/components/shared/PageHero";
import NoticiasGrid from "@/components/sections/NoticiasGrid";
import NewsCarousel from "@/components/sections/NewsCarousel";

export const metadata: Metadata = {
  title: "Noticias — Puerto Cortés Digital",
};

export default function NoticiasPage() {
  return (
    <>
      <PageHero
        eyebrow="Noticias"
        title="Sala de prensa"
        subtitle="Toda la cobertura editorial de la Municipalidad de Puerto Cortés en un solo lugar."
      />
      <NoticiasGrid />
      <NewsCarousel />
    </>
  );
}
