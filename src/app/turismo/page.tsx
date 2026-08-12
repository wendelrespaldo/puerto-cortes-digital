import type { Metadata } from "next";
import TourismStory from "@/components/sections/TourismStory";

export const metadata: Metadata = {
  title: "Puerto Cortés — Mar, historia y sabor caribeño",
  description:
    "Descubre Puerto Cortés: playas, naturaleza, gastronomía, cultura, el puerto y los eventos que hacen única a la ciudad.",
};

export default function TurismoPage() {
  return <TourismStory />;
}
