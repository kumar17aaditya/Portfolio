"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCode, FaMicrochip, FaTerminal, FaDatabase, FaTools, FaCogs } from "react-icons/fa";
import { skills } from "@/data/skills";
import SectionPanel from "@/components/UI/SectionPanel";

const categoryStyle: Record<string, { icon: typeof FaCode; color: string; dot: string; ring: string }> = {
  Languages: { icon: FaCode, color: "text-sky-300", dot: "bg-sky-400", ring: "border-sky-400/40" },
  "Core CS": { icon: FaMicrochip, color: "text-cyan-300", dot: "bg-cyan-400", ring: "border-cyan-400/40" },
  "System Programming": { icon: FaTerminal, color: "text-emerald-300", dot: "bg-emerald-400", ring: "border-emerald-400/40" },
  "Frameworks & Databases": { icon: FaDatabase, color: "text-teal-300", dot: "bg-teal-400", ring: "border-teal-400/40" },
  Tools: { icon: FaTools, color: "text-blue-300", dot: "bg-blue-400", ring: "border-blue-400/40" },
  Automation: { icon: FaCogs, color: "text-violet-300", dot: "bg-violet-400", ring: "border-violet-400/40" },
};

const fallbackStyle = { icon: FaCode, color: "text-sky-300", dot: "bg-sky-400", ring: "border-sky-400/40" };

export default function Skills() {
  const [active, setActive] = useState(0);
  const activeCategory = skills[active];
  const activeStyle = categoryStyle[activeCategory.title] ?? fallbackStyle;
  const ActiveIcon = activeStyle.icon;

  return (
    <section id="skills" className="section-shell scroll-mt-28 py-3 sm:py-4 lg:py-5">
      <SectionPanel icon={FaCode} title="Technical Skills" accent="emerald">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/50">
          {/* Status bar */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
            <span className="h-2 w-2 animate-glow rounded-full bg-emerald-400" />
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
              system.skills — <span className={activeStyle.color}>{activeCategory.title}</span> — {activeCategory.skills.length} modules loaded
            </p>
          </div>

          <div className="grid sm:grid-cols-[13rem_1fr]">
            {/* Category rail */}
            <div className="flex gap-1.5 overflow-x-auto border-b border-white/[0.06] p-2.5 sm:flex-col sm:overflow-visible sm:border-b-0 sm:border-r sm:p-3">
              {skills.map((category, index) => {
                const style = categoryStyle[category.title] ?? fallbackStyle;
                const Icon = style.icon;
                const isActive = index === active;

                return (
                  <button
                    key={category.title}
                    onClick={() => setActive(index)}
                    className={`hover-lift relative flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors sm:w-full ${
                      isActive ? "bg-white/[0.06] text-white" : "text-slate-400 hover:bg-white/[0.03] hover:text-slate-200"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="skills-active-indicator"
                        className={`absolute inset-y-1 left-0 hidden w-[3px] rounded-full ${style.dot} sm:block`}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    ) : null}
                    <Icon className={isActive ? style.color : "text-slate-500"} size={13} />
                    {category.title}
                  </button>
                );
              })}
            </div>

            {/* Readout panel */}
            <div className="relative min-h-[14rem] p-5 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2"
                >
                  {activeCategory.skills.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5 font-mono text-sm text-slate-300"
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${activeStyle.dot} shadow-[0_0_8px_currentColor]`} />
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className={`pointer-events-none absolute right-5 top-5 hidden h-9 w-9 items-center justify-center rounded-xl border sm:flex ${activeStyle.ring}`}>
                <ActiveIcon className={activeStyle.color} size={14} />
              </div>
            </div>
          </div>
        </div>
      </SectionPanel>
    </section>
  );
}
