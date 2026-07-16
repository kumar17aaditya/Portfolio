"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { ProjectItem } from "@/types";
import Badge from "@/components/UI/Badge";
import { useMediaQuery } from "@/lib/useMediaQuery";

const accentStyles = {
  purple: "border-purple-400/25 bg-purple-400/10 text-purple-200",
  teal: "border-teal-400/25 bg-teal-400/10 text-teal-200",
  orange: "border-orange-400/25 bg-orange-400/10 text-orange-200",
};

const accentHover = {
  purple: "hover:border-purple-400/35",
  teal: "hover:border-teal-400/35",
  orange: "hover:border-orange-400/35",
};

const spotlightColor = {
  purple: "rgba(192,132,252,0.16)",
  teal: "rgba(45,212,191,0.16)",
  orange: "rgba(251,146,60,0.16)",
};

const hoverRingShadow = {
  purple: "hover:shadow-[0_30px_90px_rgba(2,6,23,0.5),0_0_0_1px_rgba(192,132,252,0.3)]",
  teal: "hover:shadow-[0_30px_90px_rgba(2,6,23,0.5),0_0_0_1px_rgba(45,212,191,0.3)]",
  orange: "hover:shadow-[0_30px_90px_rgba(2,6,23,0.5),0_0_0_1px_rgba(251,146,60,0.3)]",
};

type ProjectCardProps = {
  project: ProjectItem;
  isHovered: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

export default function ProjectCard({ project, isHovered, isDimmed, onHoverStart, onHoverEnd }: ProjectCardProps) {
  const Icon = project.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  // Cards only sit in a row (and need the dynamic flex-grow/flex-basis:0
  // "accordion" sizing) from md+. On mobile they stack in a column — forcing
  // flex-basis:0 there (combined with overflow-hidden) disables the
  // automatic content-based min-height and collapses/clips the cards.
  const isRow = useMediaQuery("(min-width: 768px)");

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    const glow = glowRef.current;
    if (!rect || !glow) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    glow.style.background = `radial-gradient(420px circle at ${x}% ${y}%, ${spotlightColor[project.accent]}, transparent 60%)`;
  };

  const handleLeave = () => {
    if (glowRef.current) glowRef.current.style.background = "transparent";
    onHoverEnd();
  };

  return (
    <motion.div
      layout
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={onHoverStart}
      onMouseLeave={handleLeave}
      style={{ flexGrow: isRow ? (isHovered ? 2.3 : 1) : undefined, flexBasis: isRow ? 0 : undefined }}
      animate={{
        scale: isHovered ? 1.015 : isDimmed ? 0.98 : 1,
        y: isHovered ? -4 : 0,
        opacity: isDimmed ? 0.8 : 1,
      }}
      transition={{
        layout: { type: "spring", stiffness: 260, damping: 30, mass: 0.9 },
        scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3 },
      }}
      className={`group relative flex min-w-0 basis-auto flex-col overflow-hidden rounded-[1.6rem] border border-white/15 bg-gradient-to-b from-white/[0.12] to-white/[0.03] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.24)] backdrop-blur-xl transition-shadow duration-300 md:flex-1 ${hoverRingShadow[project.accent]} ${accentHover[project.accent]} lg:p-7`}
    >
      <div ref={glowRef} className="pointer-events-none absolute inset-0 transition-[background] duration-200" />

      <div className="relative">
        <div className={`flex h-14 w-14 items-center justify-center rounded-[1.3rem] border transition-transform duration-300 group-hover:scale-105 ${accentStyles[project.accent]}`}>
          <Icon size={20} />
        </div>

        <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight text-white">{project.title}</h3>

        <div className="mt-3.5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech} text={tech} />
          ))}
        </div>
      </div>

      <div className="relative mt-4 flex flex-1 flex-col">
        <p className="flex-1 text-sm leading-7 text-slate-400/90">{project.description}</p>

        {/* <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="hover-lift flex items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-sm text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-sky-300"
          >
            <FaGithub />
            GitHub
          </a> */}

        <div className="mt-6 border-t border-white/[0.06] pt-4">
          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="hover-lift inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-sm text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-sky-300"
            >
              <FaGithub />
              GitHub
            </a>
          )}

          {/* <a
            href={project.live ?? project.github}
            target="_blank"
            rel="noreferrer"
            className="hover-lift flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-sky-300"
          >
            <FaExternalLinkAlt size={12} />
          </a> */}
        </div>
      </div>
    </motion.div>
  );
}
