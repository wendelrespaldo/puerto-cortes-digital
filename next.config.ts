import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // El caché de optimización de imágenes de Next falla en este volumen
    // externo (genera archivos AppleDouble corruptos). Servimos las
    // imágenes originales directamente para evitar el bug del filesystem.
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/obras",
        destination: "/gestion-alcalde",
        permanent: true,
      },
      {
        source: "/obras/:path*",
        destination: "/gestion-alcalde",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
