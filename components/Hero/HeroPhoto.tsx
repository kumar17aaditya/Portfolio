"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springX = useSpring(mx, { stiffness: 120, damping: 16 });
  const springY = useSpring(my, { stiffness: 120, damping: 16 });
  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex aspect-square w-full max-w-[17rem] items-center justify-center sm:max-w-[19.5rem] md:max-w-[22rem] lg:max-w-[24.5rem]"
      style={{ perspective: 900 }}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Comet-trail accent, static (no opacity animation) so nothing reads as flicker */}
      <div className="absolute -right-6 top-1/2 h-32 w-56 -translate-y-1/2 rotate-[-16deg] bg-gradient-to-r from-transparent via-sky-400/30 to-transparent blur-2xl sm:h-40 sm:w-72" />

      <div className="absolute inset-[6%] rounded-full bg-sky-500/20 blur-[100px]" />
      <div className="absolute inset-[10%] rounded-full bg-cyan-400/14 blur-[70px]" />

      {/* Concentric rings, widest to narrowest, giving the photo a signal/orbit halo */}
      <div className="absolute inset-0 rounded-full border-2 border-sky-400/35" />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 55, ease: "linear" }}
        className="absolute inset-[7%] rounded-full border-2 border-sky-400/45"
      >
        <div className="absolute right-[6%] top-[18%] h-[0.7rem] w-[0.7rem] rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.9)]" />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 42, ease: "linear" }}
        className="absolute inset-[14%] rounded-full border-2 border-sky-400/55"
      >
        <div className="absolute left-1/2 top-0 h-[1.15rem] w-[1.15rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_32px_rgba(34,211,238,0.95)]" />
        <div className="absolute bottom-[8%] left-[2%] h-[1.25rem] w-[1.25rem] rounded-full bg-sky-500 shadow-[0_0_32px_rgba(59,130,246,0.9)]" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="absolute inset-[21%] rounded-full border-2 border-sky-400/60"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
        className="absolute inset-[28%] rounded-full border-2 border-cyan-400/55"
      >
        <div className="absolute right-[2%] bottom-[16%] h-[0.6rem] w-[0.6rem] rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
      </motion.div>

      {/* Photo tilts subtly toward the cursor — static opacity, so it never flickers */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 h-[9.5rem] w-[9.5rem] overflow-hidden rounded-full border border-sky-400/30 bg-slate-900/70 p-2 shadow-[0_0_100px_rgba(56,189,248,0.35)] sm:h-[11rem] sm:w-[11rem] md:h-[13rem] md:w-[13rem]"
      >
        <Image
          src="/profile/profile.jpg"
          alt="Aditya Kumar"
          fill
          sizes="(min-width: 768px) 13rem, (min-width: 640px) 11rem, 9.5rem"
          className="rounded-full object-cover"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
