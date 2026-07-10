"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiLeetcode } from "react-icons/si";
import {
  FaGithub,
  FaCalendarAlt,
  FaTrophy,
  FaFolderOpen,
} from "react-icons/fa";

import { projects } from "@/data/projects";

type Stats = {
  githubCommits: number;
  githubStreak: number;
  leetcodeRating: number;
  problemsSolved: number;
};

const formatValue = (
  value: number,
  suffix = "",
  fallback = "..."
) => (value > 0 ? `${value}${suffix}` : fallback);

export default function HeroStatsStrip() {
  const [stats, setStats] = useState<Stats>({
    githubCommits: 0,
    githubStreak: 0,
    leetcodeRating: 0,
    problemsSolved: 0,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        const res = await fetch("/api/stats", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data: Stats = await res.json();
        setStats(data);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching stats:", error);
        }
      }
    }

    fetchStats();

    return () => controller.abort();
  }, []);

  const {
    githubCommits,
    githubStreak,
    leetcodeRating,
    problemsSolved,
  } = stats;

  const cards = [
    {
      icon: SiLeetcode,
      label: "LeetCode Rating",
      value: formatValue(leetcodeRating, "+"),
      color: "text-sky-300",
    },
    {
      icon: FaGithub,
      label: "GitHub Commits",
      value: formatValue(githubCommits, "+"),
      color: "text-emerald-300",
    },
    {
      icon: FaCalendarAlt,
      label: "GitHub Streak",
      value: formatValue(githubStreak, " days"),
      color: "text-emerald-300",
    },
    {
      icon: FaTrophy,
      label: "Problems Solved",
      value: formatValue(problemsSolved, "+"),
      color: "text-sky-300",
    },
    {
      icon: FaFolderOpen,
      label: "Projects Built",
      value: projects.length.toString(),
      color: "text-emerald-300",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.7,
        duration: 0.7,
        ease: "easeOut",
      }}
      className="mt-6 rounded-[1.5rem] border border-white/10 bg-slate-950/45 py-1.5 shadow-[0_24px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl sm:mt-8"
    >
      <div className="grid grid-cols-2 divide-y divide-white/[0.06] sm:grid-cols-5 sm:divide-x sm:divide-y-0">
        {cards.map(({ icon: Icon, label, value, color }, index) => (
          <div
            key={label}
            className={`hover-lift flex flex-col items-center gap-1.5 px-3 py-4 text-center hover:bg-white/[0.02] sm:px-2 sm:py-5 ${
              index === cards.length - 1
                ? "col-span-2 sm:col-span-1"
                : ""
            }`}
          >
            <div className="flex items-center gap-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-slate-500 sm:text-[0.65rem]">
              <Icon className={color} />
              <span>{label}</span>
            </div>

            <p
              className={`text-2xl font-bold tracking-tight sm:text-[1.7rem] ${color}`}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}