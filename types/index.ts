import { IconType } from "react-icons";

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  location: string;
  logo: string;
  description: string[];
  technologies: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  grade?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  github: string;
  live?: string;
  tech: string[];
  icon: IconType;
  accent: "purple" | "teal" | "orange";
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface CertificateItem {
  title: string;
  issuer: string;
  link: string;
}