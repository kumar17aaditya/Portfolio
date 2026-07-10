"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaFolderOpen, FaCode, FaCertificate } from "react-icons/fa";

const navItems = [
  { label: "Experience", href: "#experience", icon: FaBriefcase },
  { label: "Education", href: "#education", icon: FaGraduationCap },
  { label: "Projects", href: "#projects", icon: FaFolderOpen },
  { label: "Skills", href: "#skills", icon: FaCode },
  { label: "Certificates", href: "#certificates", icon: FaCertificate },
];

export default function HeroNavButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.44, duration: 0.5 }}
      className="flex flex-wrap items-stretch gap-2.5 sm:flex-nowrap"
    >
      {navItems.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          className="hover-lift flex flex-1 basis-[calc(50%-0.3125rem)] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-sky-200 hover:shadow-[0_12px_35px_rgba(2,6,23,0.35)] sm:basis-0"
        >
          <Icon size={13} className="text-sky-300" />
          {label}
        </a>
      ))}
    </motion.div>
  );
}
