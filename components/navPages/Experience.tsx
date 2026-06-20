"use client";
import React from "react";
import { jetbrainsMono } from "@/app/font";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: "Software Engineering Intern",
    company: "CollegeDilao",
    location: "Remote",
    period: "Aug 2025 – Jan 2026",
    points: [
      "Built robust FastAPI and PostgreSQL REST APIs to centralize analytics across three Learning Management Systems (LMS) serving 500+ active students.",
      "Optimized a full-stack application built with React and Docker, increasing GitHub engagement tracking efficiency by 30%.",
      "Automated custom dashboards and metrics analytics workflows, reducing educator reporting effort by 40%."
    ],
    skills: ["FastAPI", "PostgreSQL", "React", "Docker", "REST APIs", "Analytics"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className={` ${jetbrainsMono.className} w-full max-w-7xl mx-auto py-20 sm:py-28 md:py-36 px-6 scroll-mt-28`}>
      <div className="flex flex-col items-center justify-center gap-2 mb-12">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">
          Career
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl text-center font-bold">
          Experience
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-white/10 ml-4 md:ml-6 pl-6 md:pl-8 space-y-12">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Dot indicator */}
            <span className="absolute -left-[35px] md:-left-[43px] mt-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 border-2 border-[#e8390d]">
              <Briefcase className="h-3 w-3 text-[#e8390d]" />
            </span>

            {/* Content Card */}
            <div
              className="p-6 md:p-8 rounded-2xl border border-white/8 bg-slate-950/60 backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_0_50px_-8px_rgba(232,57,13,0.15)]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#e8390d]">{exp.role}</h3>
                  <h4 className="text-md md:text-lg font-semibold text-zinc-200">{exp.company}</h4>
                </div>
                <div className="flex flex-col text-sm text-zinc-400 gap-1 md:items-end">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {exp.period}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {exp.location}</span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="list-disc list-outside pl-5 space-y-2 text-zinc-300 text-sm md:text-base mb-6 text-justify">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx}>{pt}</li>
                ))}
              </ul>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-zinc-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
