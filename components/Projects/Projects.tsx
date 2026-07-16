"use client";

import { useState } from "react";
import { FaFolderOpen, FaArrowRight } from "react-icons/fa";
import { projects } from "@/data/projects";
import SectionPanel from "@/components/UI/SectionPanel";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="section-shell scroll-mt-28 py-3 sm:py-4 lg:py-5">
      <SectionPanel
        icon={FaFolderOpen}
        title="Projects"
        accent="cyan"
        rightSlot={
          <a href="https://github.com/kumar17aaditya?tab=repositories" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-sky-300 hover:text-sky-200">
            View All Projects
            <FaArrowRight size={12} />
          </a>
        }
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-stretch">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              isHovered={hovered === index}
              isDimmed={hovered !== null && hovered !== index}
              onHoverStart={() => setHovered(index)}
              onHoverEnd={() => setHovered(null)}
            />
          ))}
        </div>
      </SectionPanel>
    </section>
  );
}
