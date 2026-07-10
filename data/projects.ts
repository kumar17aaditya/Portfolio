import { ProjectItem } from "@/types";
import { FaComments, FaLink, FaShieldAlt } from "react-icons/fa";

export const projects: ProjectItem[] = [
  {
    title: "ThreadLink – Multi-Threaded TCP Chat System",
    description:
      "Built a multi-threaded TCP chat application supporting 10+ concurrent clients, private/public messaging, dynamic user management, and asynchronous communication using POSIX sockets and select().",
    github: "#",
    tech: ["C++", "Linux", "Socket Programming"],
    icon: FaComments,
    accent: "purple",
  },
  {
    title: "Scalable URL Shortener Service",
    description:
      "Built a URL shortening service with custom alias generation and efficient redirection handling, supporting 10,000+ URL mappings. Improved retrieval performance by ~40% using indexing.",
    github: "#",
    tech: ["Node.js", "Express.js", "MongoDB"],
    icon: FaLink,
    accent: "teal",
  },
  {
    title: "Self-Healing Recovery Automation System",
    description:
      "Developed an automated recovery system that restores deleted or cyberattack-affected files, reducing manual recovery effort by ~80%. Automated Jira updates, cutting response time from hours to minutes.",
    github: "#",
    tech: ["Ansible", "Python", "Jira"],
    icon: FaShieldAlt,
    accent: "orange",
  },
];
