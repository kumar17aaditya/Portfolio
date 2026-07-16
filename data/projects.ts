import { ProjectItem } from "@/types";
import { FaComments, FaLink, FaShieldAlt } from "react-icons/fa";

export const projects: ProjectItem[] = [
  {
    title: "ThreadLink – Multi-Threaded TCP Chat System",
    description:
      "Built a multi-threaded TCP chat application supporting 10+ concurrent clients, private/public messaging, dynamic user management, and asynchronous communication using POSIX sockets and select().",
    github: "https://github.com/kumar17aaditya/ThreadLink",
    tech: ["C++", "Linux", "Socket Programming"],
    icon: FaComments,
    accent: "purple",
  },
  {
    title: "RetinaSense-AI",
    description:
      "Built an end-to-end AI web application for diabetic retinopathy detection using Flask, TensorFlow/Keras, and ResNet50, achieving 81.68% validation accuracy across five retinal disease classes.",
    github: "https://github.com/kumar17aaditya/RetinaSense-AI",
    tech: ["Python", "TensorFlow", "OpenCV"],
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
