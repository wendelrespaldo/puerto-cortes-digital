import Hero from "@/components/sections/Hero";
import NewsTicker from "@/components/sections/NewsTicker";
import QuickActions from "@/components/sections/QuickActions";
import PopularSearches from "@/components/sections/PopularSearches";
import CitizenDashboard from "@/components/sections/CitizenDashboard";
import Obras from "@/components/sections/Obras";
import ProjectMap from "@/components/sections/ProjectMap";
import Noticias from "@/components/sections/Noticias";
import NewsCarousel from "@/components/sections/NewsCarousel";
import Transparencia from "@/components/sections/Transparencia";
import VoiceSection from "@/components/sections/VoiceSection";
import Programs from "@/components/sections/Programs";
import Tourism from "@/components/sections/Tourism";
import MunicipalSystems from "@/components/sections/MunicipalSystems";

export default function Home() {
  return (
    <>
      <Hero />
      <NewsTicker />
      <QuickActions />
      <PopularSearches />
      <CitizenDashboard />
      <Obras />
      <ProjectMap />
      <Noticias />
      <NewsCarousel />
      <Transparencia />
      <VoiceSection />
      <Programs />
      <Tourism />
      <MunicipalSystems />
    </>
  );
}
