"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { ExperienceItem } from "@/types";

export default function Timeline({ experiences }: { experiences: ExperienceItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const isActive = hoveredIndex !== null;

  return (
    <div className="relative" ref={containerRef}>
      {/* Track (dim, always visible) — centered exactly on the dot container's midpoint.
          Uses var(--spacing) directly since the dot container's w-9/w-12 utilities scale with it. */}
      <div className="absolute left-[calc(var(--spacing)*4.5-1.5px)] top-2 bottom-2 w-[3px] rounded-full bg-white/[0.07] sm:left-[calc(var(--spacing)*6-1.5px)]" />

      {/* Progress line — draws itself as the section scrolls into view, and softly illuminates on hover */}
      <motion.div
        style={{ height: lineHeight }}
        animate={{
          boxShadow: isActive ? "0 0 26px rgba(56,189,248,0.85)" : "0 0 18px rgba(56,189,248,0.55)",
        }}
        transition={{ duration: 0.35 }}
        className="absolute left-[calc(var(--spacing)*4.5-1.5px)] top-2 w-[3px] rounded-full bg-gradient-to-b from-sky-300 via-sky-400 to-cyan-400 sm:left-[calc(var(--spacing)*6-1.5px)]"
      />

      <div className="space-y-12 sm:space-y-14">
        {experiences.map((exp, index) => {
          const active = hoveredIndex === index;

          return (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 32, x: -8 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative flex gap-5 pl-11 sm:gap-8 sm:pl-[3.5rem]"
            >
              <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center sm:h-12 sm:w-12">
                <motion.span
                  animate={{ scale: active ? 1.5 : 1, opacity: active ? 0.55 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="animate-glow absolute h-full w-full rounded-full bg-sky-400/25 blur-md"
                />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: active ? 1.15 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 16, delay: active ? 0 : index * 0.1 + 0.25 }}
                  style={{
                    boxShadow: active ? "0 0 32px rgba(56,189,248,0.95)" : "0 0 22px rgba(56,189,248,0.75)",
                  }}
                  className="relative h-4 w-4 rounded-full border-2 border-sky-200 bg-sky-400 transition-shadow duration-300 sm:h-[1.1rem] sm:w-[1.1rem]"
                />
              </div>

              <ExperienceCard exp={exp} isLast={index === experiences.length - 1} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
