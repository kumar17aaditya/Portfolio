"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const roles = ["Software Engineer", "C++ Developer", "Systems Engineer", "Competitive Programmer"];

export default function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-7 overflow-hidden sm:h-8">
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[index]}
          initial={{ y: 18, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -18, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center text-base font-medium text-sky-300 sm:text-lg"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
