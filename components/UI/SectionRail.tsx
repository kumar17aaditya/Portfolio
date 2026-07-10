"use client";

import { useEffect, useState } from "react";

const chapters = [
  { id: "home", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
];

export default function SectionRail() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    chapters.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex">
      {chapters.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className="group pointer-events-auto flex items-center gap-3"
            aria-label={label}
          >
            <span
              className={`text-[0.65rem] uppercase tracking-[0.2em] text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                isActive ? "text-sky-300" : ""
              }`}
            >
              {label}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                  : "h-1.5 w-1.5 bg-slate-600 group-hover:bg-sky-400/70"
              }`}
            />
          </a>
        );
      })}
    </div>
  );
}
