"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full border border-blue-500/50 bg-[#0a0f1c]/80 backdrop-blur-xl text-blue-400 hover:bg-blue-500/10 duration-300"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={14} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
