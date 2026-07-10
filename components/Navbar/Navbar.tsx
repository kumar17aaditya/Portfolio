"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaBars, FaTimes } from "react-icons/fa";

const links = [
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Certificates", href: "#certificates", id: "certificates" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["home", "experience", "education", "projects", "skills", "certificates"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-6"
    >
      <div className="mx-auto w-full max-w-[1580px]">
        <div className="glass-panel flex items-center justify-between rounded-full border border-white/10 bg-slate-950/60 px-4 py-3 backdrop-blur-2xl sm:px-6 lg:px-8">
          <a href="#home" className="text-base font-semibold tracking-[0.24em] text-slate-100 sm:text-lg">
            {"<ADITYA.dev/>"}
          </a>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {links.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative pb-1 text-sm text-slate-300 hover:text-sky-300 ${active === item.id ? "text-sky-300" : ""}`}
              >
                {item.label}
                {active === item.id ? (
                  <motion.span
                    layoutId="navbar-active-underline"
                    className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-sky-400 to-cyan-400"
                  />
                ) : null}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              className="hover-lift hidden items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-sm text-sky-200 hover:border-sky-400/50 hover:bg-sky-400/20 hover:shadow-[0_12px_30px_rgba(2,6,23,0.35)] sm:flex"
            >
              <FaDownload />
              <span>Resume</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 md:hidden"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/80 backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-1 p-3">
                {links.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`rounded-2xl px-3 py-2.5 text-sm text-slate-300 ${active === item.id ? "bg-white/10 text-sky-300" : "hover:bg-white/5 hover:text-sky-300"}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
