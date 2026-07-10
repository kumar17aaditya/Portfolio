"use client";

import { motion, type Variants } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaQuoteLeft } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { socials } from "@/data/socials";
import ScrollToTopButton from "@/components/UI/ScrollToTopButton";

const socialLinks = [
  { icon: FaEnvelope, href: `mailto:${socials.email}`, label: "Email" },
  { icon: FaLinkedin, href: socials.linkedin, label: "LinkedIn" },
  { icon: FaGithub, href: socials.github, label: "GitHub" },
  { icon: SiLeetcode, href: socials.leetcode, label: "LeetCode" },
];

const quote = "Great software isn't written overnight. It's engineered one thoughtful commit at a time.";
const words = quote.split(" ");

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Footer() {
  return (
    <footer className="section-shell pb-10 pt-4 sm:pb-14">
      <div className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.14),transparent_55%)]" />

        <div className="relative flex flex-col items-center">
          <FaQuoteLeft className="text-sky-400/40" size={22} />

          <motion.p
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            className="mt-5 max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-3xl"
          >
            {words.map((w, i) => (
              <motion.span key={i} variants={word} className="inline-block">
                {w}
                {i !== words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            ))}
          </motion.p>

          <div className="mt-9 flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="hover-lift flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-sky-300 hover:shadow-[0_12px_35px_rgba(2,6,23,0.35)]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <p className="mt-6 text-sm text-slate-500">
            © 2026 <span className="font-semibold text-sky-300">Aditya Kumar</span>. All rights reserved.
          </p>
        </div>
      </div>

      <ScrollToTopButton />
    </footer>
  );
}
