"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ProgressBar({
  value,
  className,
  barClassName,
}: {
  value: number;
  className?: string;
  barClassName?: string;
}) {
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-black/10", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn("h-full rounded-full bg-pc-green-500", barClassName)}
      />
    </div>
  );
}
