import { ExperienceItem } from "@/types";

export const experiences: ExperienceItem[] = [
  {
    company: "Nokia Solutions Networks India",
    role: "Software Engineering Intern",
    duration: "Aug 2025 — Jun 2026",
    location: "Bengaluru, India",

    logo: "/icons/nokia.png",

    description: [
      "Developed and enhanced features for CALM, an internal infrastructure automation platform.",
      "Automated Linux switch management, reducing electricity usage by 37%.",
      "Built HPE iLO firmware automation reducing maintenance time by over 60%.",
      "Worked with Linux, Python, Ansible, Networking and Infrastructure Automation.",
      "Contributed production-ready code adopted by global Nokia teams."
    ],

    technologies: [
      "Python",
      "Linux",
      "Ansible",
      "Networking",
      "Automation"
    ]
  },

  {
    company: "AfterPassout Pvt Ltd",
    role: "Student Coordinator Intern",
    duration: "Sep 2024 — Nov 2024",
    location: "Remote",

    logo: "/icons/afterpassout.png",

    description: [
      "Managed engagement for over 200+ students.",
      "Organized webinars and technical events.",
      "Improved frontend usability.",
      "Worked with cross-functional teams."
    ],

    technologies: [
      "Communication",
      "Leadership",
      "Frontend"
    ]
  }
];