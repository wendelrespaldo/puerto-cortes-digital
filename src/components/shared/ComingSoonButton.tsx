"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Para acciones reales que aún no tienen backend (descargas, login).
 * En vez de un href="#" que no hace nada, da retroalimentación honesta.
 */
export default function ComingSoonButton({
  children,
  className,
  message = "Disponible próximamente",
}: {
  children: React.ReactNode;
  className?: string;
  message?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => {
          setShow(true);
          setTimeout(() => setShow(false), 2200);
        }}
        className={className}
      >
        {children}
      </button>
      <span
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-pc-navy-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-200",
          show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        )}
      >
        {message}
      </span>
    </span>
  );
}
