"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity } from "react-icons/fa";
import { education } from "@/data/education";
import SectionPanel from "@/components/UI/SectionPanel";

export default function Education() {
  return (
    <section id="education" className="section-shell scroll-mt-28 py-3 sm:py-4 lg:py-5">
      <SectionPanel icon={FaGraduationCap} title="Education" accent="violet">
        <div className="relative">
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-6">
            {education.map((item, index) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-center text-center"
              >
                <span
                  className={`absolute top-[2.65rem] hidden h-[3px] rounded-full bg-gradient-to-r from-violet-400/55 via-violet-400/30 to-violet-400/55 shadow-[0_0_14px_rgba(167,139,250,0.3)] transition-shadow duration-300 group-hover:shadow-[0_0_22px_rgba(167,139,250,0.55)] sm:block ${
                    index === 0 ? "left-1/2 right-0" : index === education.length - 1 ? "left-0 right-1/2" : "left-0 right-0"
                  }`}
                />

                <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-300">{item.duration}</p>

                <div className="relative z-10 mt-3 flex h-5 w-5 items-center justify-center">
                  <span className="absolute h-full w-full scale-100 rounded-full bg-violet-400/30 blur-md transition-transform duration-300 group-hover:scale-150" />
                  <span className="relative h-3.5 w-3.5 rounded-full border-2 border-violet-200 bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.75)] transition-transform duration-300 group-hover:scale-125" />
                </div>

                <div className="hover-lift mt-4 flex h-16 w-16 items-center justify-center rounded-full border border-violet-400/25 bg-slate-950/60 text-violet-300 shadow-[0_0_25px_rgba(167,139,250,0.12)] transition-all duration-300 group-hover:scale-105 group-hover:border-violet-400/50 group-hover:shadow-[0_0_38px_rgba(167,139,250,0.3)] sm:h-[4.5rem] sm:w-[4.5rem]">
                  <FaUniversity size={22} />
                </div>

                <h3 className="mt-4 font-serif text-lg italic tracking-tight text-white transition-colors duration-300 group-hover:text-violet-200 sm:text-xl">
                  {item.institution}
                </h3>
                <p className="mt-1.5 text-sm text-slate-400/90">{item.degree}</p>
                {item.grade ? <p className="mt-1.5 text-sm font-semibold text-emerald-300">{item.grade}</p> : null}
              </motion.div>
            ))}
          </div>
        </div>
      </SectionPanel>
    </section>
  );
}
