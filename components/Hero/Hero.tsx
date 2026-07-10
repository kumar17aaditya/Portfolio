"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroPhoto from "./HeroPhoto";
import TerminalTyper from "./TerminalTyper";
import RoleRotator from "./RoleRotator";
import HeroNavButtons from "./HeroNavButtons";
import HeroStatsStrip from "./HeroStatsStrip";
import BackgroundParticles from "./BackgroundParticles";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { socials } from "@/data/socials";

// Ordered for a clean 2x2 grid: LinkedIn / Email (top row), GitHub / LeetCode (bottom row)
const socialLinks = [
  { icon: FaEnvelope, href: `mailto:${socials.email}`, label: "Email" },
  { icon: FaLinkedin, href: socials.linkedin, label: "LinkedIn" },
  { icon: FaGithub, href: socials.github, label: "GitHub" },
  { icon: SiLeetcode, href: socials.leetcode, label: "LeetCode" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -36]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    const el = spotlightRef.current;
    if (!rect || !el) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(56,189,248,0.12), transparent 55%)`;
  };

  const handleMouseLeave = () => {
    const el = spotlightRef.current;
    if (el) el.style.background = "transparent";
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden scroll-mt-28 pb-10 pt-24 sm:pb-12 sm:pt-24 lg:pb-14 lg:pt-24"
    >
      <BackgroundParticles />

      {/* Ambient drifting glows — restores a strong "alive" first impression */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-ambient absolute -left-16 top-10 h-72 w-72 rounded-full bg-sky-500/25 blur-[110px]" />
        <div className="animate-ambient absolute right-[-4rem] top-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-[120px] [animation-delay:-6s]" />
        <div className="animate-ambient absolute bottom-[-4rem] left-1/3 h-64 w-64 rounded-full bg-violet-400/15 blur-[110px] [animation-delay:-11s]" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(59,130,246,0.18),transparent_45%)]" />
      <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-[1] transition-[background] duration-150" />

      <div className="section-shell relative z-10">
        <motion.div style={{ opacity: contentOpacity, scale: contentScale, y: contentY }}>
          <div className="grid gap-8 lg:grid-cols-[1.9fr_1fr] lg:items-center lg:gap-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-7 lg:p-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_55%)]" />

              <div className="relative">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.45 }}
                  className="font-mono text-xs text-emerald-300 sm:text-sm"
                >
                  {"// Building scalable systems. Solving real problems."}
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="mt-3 whitespace-nowrap text-3xl font-semibold leading-[0.95] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-[3.75rem]"
                >
                  Aditya{" "}
                  <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                    Kumar<span className="terminal-cursor align-middle" />
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.55 }}
                  className="mt-3"
                >
                  <RoleRotator />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.55 }}
                  className="mt-1 max-w-xl text-sm leading-7 text-slate-400 sm:text-base"
                >
                  Ex-Nokia Intern · Computer Science Graduate
                </motion.p>

                {/* Console + social icons sit side by side, sharing the same row height */}
                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-stretch">
                  <div className="min-w-0 flex-1 sm:max-w-[78%]">
                    <TerminalTyper />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mx-auto grid w-fit grid-cols-4 gap-3 sm:mx-0 sm:w-fit sm:grid-cols-2 sm:flex-shrink-0"
                  >
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        whileHover={{ y: -4, scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-colors duration-300 hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-sky-300 hover:shadow-[0_12px_35px_rgba(56,189,248,0.35)]"
                      >
                        <Icon size={16} />
                      </motion.a>
                    ))}
                  </motion.div>
                </div>

                <div className="mt-5">
                  <HeroNavButtons />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              {/* Plain (non-motion) wrapper for the static optical-balance shift, so it can't be
                  overwritten by HeroPhoto's own transform-driven tilt/entrance animation.
                  Shift only kicks in at xl+ where the column has enough spare room; on
                  laptop-sized (lg) screens it stays centered so the photo doesn't crowd the edge. */}
              <div className="lg:translate-x-[22px] xl:translate-x-[32px]">
                <HeroPhoto />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <HeroStatsStrip />
      </div>
    </section>
  );
}
