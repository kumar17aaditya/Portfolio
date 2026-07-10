"use client";

import { FaBriefcase } from "react-icons/fa";
import { experiences } from "@/data/experience";
import Timeline from "./Timeline";
import SectionPanel from "@/components/UI/SectionPanel";

export default function Experience() {
  return (
    <section id="experience" className="section-shell scroll-mt-28 py-3 sm:py-4 lg:py-5">
      <SectionPanel icon={FaBriefcase} title="Experience" accent="sky">
        <Timeline experiences={experiences} />
      </SectionPanel>
    </section>
  );
}
