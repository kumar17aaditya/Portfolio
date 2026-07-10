"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";

type Accent = "sky" | "violet" | "cyan" | "emerald" | "amber";

type SectionPanelProps = {
  icon: IconType;
  title: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
  accent?: Accent;
};

const accentStyles: Record<Accent, { chip: string; line: string; glow: string }> = {
  sky: {
    chip: "border-sky-400/25 bg-sky-400/10 text-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.14)]",
    line: "via-sky-400/50",
    glow: "bg-sky-500/10",
  },
  violet: {
    chip: "border-violet-400/25 bg-violet-400/10 text-violet-300 shadow-[0_0_25px_rgba(167,139,250,0.14)]",
    line: "via-violet-400/45",
    glow: "bg-violet-500/10",
  },
  cyan: {
    chip: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.14)]",
    line: "via-cyan-400/50",
    glow: "bg-cyan-500/10",
  },
  emerald: {
    chip: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.14)]",
    line: "via-emerald-400/45",
    glow: "bg-emerald-500/10",
  },
  amber: {
    chip: "border-amber-400/25 bg-amber-400/10 text-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.14)]",
    line: "via-amber-400/45",
    glow: "bg-amber-500/10",
  },
};

export default function SectionPanel({
  icon: Icon,
  title,
  rightSlot,
  children,
  className = "",
  accent = "sky",
}: SectionPanelProps) {
  const styles = accentStyles[accent];

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-panel relative overflow-hidden rounded-[1.8rem] border border-white/10 p-5 shadow-[0_24px_90px_rgba(2,6,23,0.28)] sm:p-6 lg:p-7 ${className}`}
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${styles.line} to-transparent`} />
      <div className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full ${styles.glow} blur-3xl`} />

      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-7">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${styles.chip}`}>
            <Icon size={16} />
          </div>
          <div>
            <p className="text-[0.6rem] font-medium uppercase tracking-[0.32em] text-slate-500">Section</p>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">{title}</h2>
          </div>
        </div>

        {rightSlot}
      </div>

      <div className="relative">{children}</div>
    </motion.section>
  );
}
