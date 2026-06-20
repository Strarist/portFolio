"use client";

import React, { JSX, useState } from "react";
import Image from "next/image";
import { jetbrainsMono } from "@/app/font";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

import { FaReact, FaNodeJs, FaDocker } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTypescript, SiNextdotjs, SiPostgresql, SiFastapi, SiSqlite } from "react-icons/si";

export const techIconMap: Record<string, JSX.Element> = {
  react: <FaReact className="text-cyan-300" />,
  node: <FaNodeJs className="text-green-500" />,
  express: <SiExpress className="text-white" />,
  mongo: <SiMongodb className="text-green-400" />,
  ts: <SiTypescript className="text-blue-500" />,
  next: <SiNextdotjs className="text-white" />,
  postgres: <SiPostgresql className="text-sky-500" />,
  fastapi: <SiFastapi className="text-emerald-400" />,
  docker: <FaDocker className="text-blue-400" />,
  sqlite: <SiSqlite className="text-sky-400" />,
};

const techNameMap: Record<string, string> = {
  react: "React",
  node: "Node.js",
  express: "Express",
  mongo: "MongoDB",
  ts: "TypeScript",
  next: "Next.js",
  postgres: "PostgreSQL",
  fastapi: "FastAPI",
  docker: "Docker",
  sqlite: "SQLite",
};

const projects = [
  {
    title: "Skillyn",
    description: "AI-Powered Career Operating System. Analyzes resumes against job descriptions using semantic matching and generates personalized improvement recommendations.",
    thumbnail: "/project1.svg",
    techStack: ["react", "fastapi", "postgres", "docker"],
    gradient: "#ff7e5f, #0b1020",
    github: "https://github.com/Strarist/Skillyn",
    live: "https://github.com/Strarist/Skillyn",
    highlights: [
      "Semantic resume-to-JD matching with cosine similarity scoring",
      "FastAPI backend with async PostgreSQL ORM integration",
      "Docker containerization for consistent development and deployment",
      "React dashboard with real-time analysis feedback",
    ],
  },
  {
    title: "ChatPro",
    description: "Real-Time AI Chat Platform. Built with React and FastAPI featuring interruption-safe streaming, conversation persistence, and responsive chat experiences.",
    thumbnail: "/project2.svg",
    techStack: ["react", "fastapi", "sqlite"],
    gradient: "#14f195, rgb(13, 1, 60)",
    github: "https://github.com/Strarist/ChatPro",
    live: "https://github.com/Strarist/ChatPro",
    highlights: [
      "Interruption-safe streaming with real-time token rendering",
      "Conversation persistence with SQLite and FastAPI async routes",
      "Responsive chat UI built with React and TailwindCSS",
      "Intelligent context management for multi-turn conversations",
    ],
  },
  {
    title: "CloudVault",
    description: "Collaborative AI Workspace. Document-centric workspace platform focused on collaboration, organization, and intelligent information management.",
    thumbnail: "/project3_cloudvault.png",
    techStack: ["next", "node", "express", "mongo"],
    gradient: "#51fbfb, rgb(13, 1, 60)",
    github: "https://github.com/Strarist/CloudVault",
    live: "https://github.com/Strarist/CloudVault",
    highlights: [
      "AI-powered semantic file search with vector embeddings",
      "Real-time collaborative editing with WebSocket synchronization",
      "Express.js + MongoDB backend with JWT authentication",
      "Next.js frontend with workspace-level access control",
    ],
  },
];

export function Projects() {
  return (
    <div id="projects" className={`${jetbrainsMono.className} flex flex-col gap-10 sm:gap-16 items-center justify-center px-4 py-20 sm:py-28 md:py-36 w-full max-w-7xl mx-auto scroll-mt-28`}>
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">
          Work
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl text-center font-bold">
          Featured Projects
        </h2>
      </div>

      {/* Stacked Showcase */}
      <div className="flex flex-col gap-24 w-full mt-8">
        {projects.map((project, index) => {
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
              {/* Visual preview card — no text overlay; details live in the panel */}
              <div
                className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[420px] rounded-2xl overflow-hidden border border-white/8 group cursor-pointer shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${project.gradient})`,
                }}
                data-cursor-hover
                onClick={() => window.open(project.live, '_blank')}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none z-10" />

                <div className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="h-4 w-4 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>

                <div className="absolute inset-x-6 bottom-0 z-20 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                  <Image
                    src={project.thumbnail}
                    alt={`${project.title} preview`}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-t-xl object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Right/Left — Details Panel */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 lg:px-4">
                {/* Title with red dash */}
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[3px] bg-[#e8390d] rounded-full shrink-0" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h2>
                </div>

                <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>

                {/* Highlights with + bullets */}
                <ul className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-[#e8390d] font-bold mt-0.5 shrink-0">+</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-bold tracking-widest uppercase text-zinc-300"
                    >
                      <span className="text-sm">{techIconMap[tech]}</span>
                      {techNameMap[tech]}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-zinc-300 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <FiGithub className="h-3.5 w-3.5" /> GitHub
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8390d] text-white text-xs font-bold shadow-[0_4px_14px_rgba(232,57,13,0.3)] hover:shadow-[0_6px_20px_rgba(232,57,13,0.5)] transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> View on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* See More link */}
      <a
        href="https://github.com/Strarist"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        See More Projects <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
