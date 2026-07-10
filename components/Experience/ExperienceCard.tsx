"use client";

import { useRef } from "react";
import Image from "next/image";
import { ExperienceItem } from "@/types";

export default function ExperienceCard({ exp, isLast }: { exp: ExperienceItem; isLast?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    const glow = glowRef.current;
    if (!rect || !glow) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(360px circle at ${x}% ${y}%, rgba(56,189,248,0.08), transparent 60%)`;
  };

  const handleLeave = () => {
    if (glowRef.current) glowRef.current.style.background = "transparent";
  };

  return (
    <div className="min-w-0 flex-1">
      {/* Hover boundary uses a -m/p trick on the top/right/bottom only, so the invisible
          hitbox and hover glow can grow without ever creeping left into the timeline gap.
          Padding stays symmetric so the text keeps an even inset on every side. */}
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative -mr-3 -mt-3 -mb-3 ml-0 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.12] to-white/[0.03] p-3 shadow-[0_18px_50px_rgba(2,6,23,0.24)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.012] hover:border-sky-400/30 hover:bg-white/[0.14] hover:shadow-[0_28px_70px_rgba(2,6,23,0.42),0_0_0_1px_rgba(56,189,248,0.14)] sm:-mr-5 sm:-mt-5 sm:-mb-5 sm:p-5"
      >
        {/* Cursor spotlight — subtle, follows pointer within the card */}
        <div ref={glowRef} className="pointer-events-none absolute inset-0 transition-[background] duration-200" />

        <div className="relative">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-sky-300 sm:text-sm">
            {exp.duration}
          </p>

          <div className="mt-2.5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{exp.role}</h3>
              <p className="mt-1 text-base font-medium text-sky-300">{exp.company}</p>
              <p className="mt-1 text-sm text-slate-500">{exp.location}</p>
            </div>

            <div className="hover-lift flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:border-sky-400/30 group-hover:shadow-[0_16px_40px_rgba(56,189,248,0.25)] sm:h-24 sm:w-24">
              <Image
                src={exp.logo}
                alt={exp.company}
                width={72}
                height={72}
                className="h-full w-full object-contain transition-[filter] duration-300 hover:brightness-110"
              />
            </div>
          </div>

          <ul className="mt-4 space-y-2.5 text-sm leading-7 text-slate-400/90">
            {exp.description.map((point) => (
              <li
                key={point}
                className="group/bullet flex gap-3 rounded-lg transition-transform duration-300 ease-out hover:translate-x-[5px]"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/70 transition-colors duration-300 group-hover/bullet:bg-sky-300" />
                <span className="transition-colors duration-300 group-hover/bullet:text-white">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-sky-200 transition-all duration-300 hover:-translate-y-[2px] hover:border-sky-400/45 hover:bg-sky-400/15 hover:shadow-[0_10px_24px_rgba(56,189,248,0.22)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {!isLast ? <div className="mt-12 h-px w-full bg-white/5 sm:mt-14" /> : null}
    </div>
  );
}
