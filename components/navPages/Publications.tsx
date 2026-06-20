"use client";
import React from "react";
import { jetbrainsMono } from "@/app/font";
import { BookOpen, ExternalLink, FileText, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const publications = [
  {
    title: "Low-Light Face Detection and Denoising Techniques using Deep Learning Frameworks",
    conference: "IEEE ICCSAI 2025",
    venue: "International Conference on Communication, Security and Artificial Intelligence",
    link: "https://ieeexplore.ieee.org/abstract/document/11063949",
    gradient: "#3b82f6, #0a0a1a",
    highlights: [
      "Deep learning-based face detection under low-light conditions",
      "Comparative analysis of denoising architectures and preprocessing pipelines",
      "Evaluated on benchmark datasets with quantitative performance metrics",
      "Published and indexed by IEEE Xplore Digital Library",
    ],
  },
];

export default function Publications() {
  return (
    <section id="publications" className={`${jetbrainsMono.className} w-full max-w-7xl mx-auto py-20 sm:py-28 md:py-36 px-4 scroll-mt-28`}>
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2 mb-12">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">
          Research
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl text-center font-bold">
          Publications
        </h2>
      </div>

      {/* Stacked Showcase */}
      <div className="flex flex-col gap-24 w-full mt-8">
        {publications.map((pub, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 w-full items-center`}
            >
              {/* Left/Right — Abstract Visual Card */}
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[380px] rounded-2xl overflow-hidden border border-white/8 group cursor-pointer flex flex-col items-center justify-center gap-4 p-8"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${pub.gradient})`,
                }}
              >
                {/* Decorative icon */}
                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <BookOpen className="h-10 w-10 text-white/80" />
                </div>

                {/* Conference badge */}
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/60">
                  {pub.conference}
                </span>

                {/* Title preview */}
                <p className="text-sm text-white/70 text-center leading-relaxed max-w-xs">
                  {pub.title}
                </p>

                {/* IEEE label overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">
                    IEEE Xplore
                  </span>
                  <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-white/70 transition-colors" />
                </div>
              </a>

              {/* Right/Left — Details Panel */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 lg:px-4">
                {/* Title with red dash */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-6 h-[3px] bg-[#e8390d] rounded-full shrink-0" />
                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#e8390d]">
                      {pub.conference}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                    {pub.title}
                  </h2>
                </div>

                {/* Venue */}
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {pub.venue}
                </p>

                {/* Highlights with + bullets */}
                <ul className="space-y-2">
                  {pub.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-[#e8390d] font-bold mt-0.5 shrink-0">+</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8390d] text-white text-xs font-bold shadow-[0_4px_14px_rgba(232,57,13,0.3)] hover:shadow-[0_6px_20px_rgba(232,57,13,0.5)] transition-all"
                  >
                    <FileText className="h-3.5 w-3.5" /> Read on IEEE Xplore
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
