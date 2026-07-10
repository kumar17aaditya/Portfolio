"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  FaAward,
  FaShieldAlt,
  FaLinux,
  FaServer,
  FaRedhat,
} from "react-icons/fa";
import { CertificateItem } from "@/types";
import { useMediaQuery } from "@/lib/useMediaQuery";

const iconMap: Record<string, { icon: IconType; classes: string }> = {
  "Building Modern Distributed Systems with Java": {
    icon: FaAward,
    classes: "text-amber-300 border-amber-400/30 bg-amber-400/10",
  },
  "Cybersecurity Architecture": {
    icon: FaShieldAlt,
    classes: "text-sky-300 border-sky-400/30 bg-sky-400/10",
  },
  "Linux Fundamentals": {
    icon: FaLinux,
    classes: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  },
  "Managing Linux Systems": {
    icon: FaServer,
    classes: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  },
  "Fundamentals of Ansible": {
    icon: FaRedhat,
    classes: "text-red-300 border-red-400/30 bg-red-400/10",
  },
};

const fallback = {
  icon: FaAward,
  classes: "text-sky-300 border-sky-400/30 bg-sky-400/10",
};

type CertificationCardProps = {
  cert: CertificateItem;
  isHovered: boolean;
  isDimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

export default function CertificationCard({
  cert,
  isHovered,
  isDimmed,
  onHoverStart,
  onHoverEnd,
}: CertificationCardProps) {
  const meta = iconMap[cert.title] ?? fallback;
  const Icon = meta.icon;

  const isRow = useMediaQuery("(min-width: 640px)");

  return (
    <motion.div
      layout
      onClick={() =>
        window.open(cert.link, "_blank", "noopener,noreferrer")
      }
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        flexGrow: isRow ? (isHovered ? 2.2 : 1) : undefined,
        flexBasis: isRow ? 0 : undefined,
      }}
      animate={{
        scale: isHovered ? 1.02 : isDimmed ? 0.98 : 1,
        y: isHovered ? -6 : 0,
        opacity: isDimmed ? 0.82 : 1,
      }}
      transition={{
        layout: {
          type: "spring",
          stiffness: 260,
          damping: 30,
          mass: 0.9,
        },
        scale: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
        y: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          duration: 0.3,
        },
      }}
      className="group relative flex min-w-0 basis-auto cursor-pointer flex-col items-center gap-3 overflow-hidden rounded-[1.4rem] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.015] p-6 text-center shadow-[0_18px_50px_rgba(2,6,23,0.28)] transition-all duration-300 hover:border-white/25 hover:shadow-[0_28px_75px_rgba(2,6,23,0.42),0_0_0_1px_rgba(255,255,255,0.08)] sm:flex-1"
    >
      {/* Shine Sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-y-full left-[-60%] w-1/3 -rotate-12 bg-gradient-to-r from-transparent via-white/[0.14] to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[420%]" />
      </div>

      {/* Icon */}
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition-transform duration-300 group-hover:scale-110 ${meta.classes}`}
      >
        <Icon size={20} />
      </div>

      {/* Title */}
      <p className="relative text-sm font-semibold leading-snug text-white">
        {cert.title}
      </p>

      {/* Issuer */}
      <p className="relative text-xs text-slate-500">
        {cert.issuer}
      </p>

      <span className="relative mt-1 h-px w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </motion.div>
  );
}