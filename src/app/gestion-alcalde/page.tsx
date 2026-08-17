import type { Metadata } from "next";
import AlcaldeHero from "@/components/sections/AlcaldeHero";
import AlcaldeDashboard from "@/components/sections/AlcaldeDashboard";
import AlcaldeCategorias from "@/components/sections/AlcaldeCategorias";
import AlcaldeDestacados from "@/components/sections/AlcaldeDestacados";
import AlcaldeExplorador from "@/components/sections/AlcaldeExplorador";
import AlcaldeTransparencia from "@/components/sections/AlcaldeTransparencia";
import AlcaldePuertasAbiertas from "@/components/sections/AlcaldePuertasAbiertas";

export const metadata: Metadata = {
  title: "Gestión del Alcalde — Puerto Cortés Digital",
  description:
    "Avances de la gestión municipal del alcalde Giancarlo Rodríguez: obras, proyectos, inversión y transparencia en Puerto Cortés.",
};

const introText =
  "Con la mano de Dios, que es nuestra fortaleza, con una corporación municipal comprometida, con un equipo de trabajo comprometido, les compartimos los avances que hemos logrado en nuestro municipio.";

export default function GestionAlcaldePage() {
  return (
    <>
      <AlcaldeHero intro={introText} />
      <AlcaldeDashboard />
      <AlcaldeCategorias />
      <AlcaldeDestacados />
      <AlcaldeExplorador />
      <AlcaldeTransparencia />
      <AlcaldePuertasAbiertas />
    </>
  );
}
