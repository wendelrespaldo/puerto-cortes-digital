import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SearchProvider } from "@/components/shared/SearchProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/shared/FloatingActions";

const heading = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Puerto Cortés Digital — Portal del Ciudadano",
  description:
    "Todo lo que necesitas de tu municipio, en un solo lugar. Trámites, servicios, obras, noticias y transparencia de la Municipalidad de Puerto Cortés.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider delay={200}>
          <SearchProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[999] focus:rounded-full focus:bg-pc-green-700 focus:px-5 focus:py-2.5 focus:text-white focus:shadow-lg"
            >
              Saltar al contenido principal
            </a>
            <Header />
            <main id="main-content" className="flex-1 pb-16 lg:pb-0">
              {children}
            </main>
            <Footer />
            <FloatingActions />
          </SearchProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
