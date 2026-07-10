"use client";

import { useState } from "react";
import { FaAward } from "react-icons/fa";
import { certificates } from "@/data/certificates";
import SectionPanel from "@/components/UI/SectionPanel";
import CertificationCard from "./CertificationCard";

export default function Certifications() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <SectionPanel icon={FaAward} title="Certifications" accent="amber" className="relative overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
        {certificates.map((cert, index) => (
          <CertificationCard
            key={cert.title}
            cert={cert}
            isHovered={hovered === index}
            isDimmed={hovered !== null && hovered !== index}
            onHoverStart={() => setHovered(index)}
            onHoverEnd={() => setHovered(null)}
          />
        ))}
      </div>
    </SectionPanel>
  );
}
