"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PROMPT = "whoami";
const OUTPUT = "aditya_kumar — software engineer";
const COMMENT = "// Keep Building, Keep Improving.";

const TYPE_SPEED = 26;

export default function TerminalTyper() {
  const [promptChars, setPromptChars] = useState(0);
  const [outputChars, setOutputChars] = useState(0);
  const [phase, setPhase] = useState<"prompt" | "output" | "comment">("prompt");

  useEffect(() => {
    if (phase === "prompt") {
      if (promptChars < PROMPT.length) {
        const t = setTimeout(() => setPromptChars((c) => c + 1), TYPE_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("output"), 220);
      return () => clearTimeout(t);
    }

    if (phase === "output") {
      if (outputChars < OUTPUT.length) {
        const t = setTimeout(() => setOutputChars((c) => c + 1), TYPE_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("comment"), 320);
      return () => clearTimeout(t);
    }
  }, [promptChars, outputChars, phase]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.37, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, boxShadow: "0 20px 60px rgba(2,6,23,0.35)" }}
      className="hover-lift h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-[0_12px_35px_rgba(2,6,23,0.28)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/[0.03] px-3.5 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/50" />
        <span className="ml-2 text-[0.62rem] uppercase tracking-[0.3em] text-slate-500">bash</span>
      </div>

      <div className="space-y-1.5 px-4 py-3.5 font-mono text-sm">
        <div className="leading-6">
          <span className="text-slate-600">$</span> <span className="text-slate-300">{PROMPT.slice(0, promptChars)}</span>
          {phase === "prompt" ? <span className="terminal-cursor" /> : null}
        </div>

        {phase !== "prompt" ? (
          <div className="leading-6 text-sky-300">
            {OUTPUT.slice(0, outputChars)}
            {phase === "output" ? <span className="terminal-cursor" /> : null}
          </div>
        ) : null}

        {phase === "comment" ? (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-0.5 leading-6 text-emerald-300"
          >
            {COMMENT}
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
}
