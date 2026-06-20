"use client";
import { FaReact, FaAws, FaDocker } from "react-icons/fa6";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiExpress, SiMongodb, SiNodedotjs, SiTypescript, SiFastapi, SiPostgresql, SiSqlite, SiKubernetes, SiGithubactions } from "react-icons/si";
import { jetbrainsMono } from "@/app/font";
import { motion } from "framer-motion";

const skills = [
    { name: "React", icon: <FaReact className="text-cyan-400" /> },
    { name: "Next.js", icon: <RiNextjsFill className="text-white" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-sky-500" /> },
    { name: "TailwindCSS", icon: <RiTailwindCssFill className="text-cyan-400" /> },
    { name: "FastAPI", icon: <SiFastapi className="text-emerald-500" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
    { name: "Express.js", icon: <SiExpress className="text-zinc-300" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-sky-500" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    { name: "SQLite", icon: <SiSqlite className="text-sky-400" /> },
    { name: "AWS", icon: <FaAws className="text-orange-500" /> },
    { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
    { name: "Kubernetes", icon: <SiKubernetes className="text-blue-600" /> },
    { name: "GitHub Actions", icon: <SiGithubactions className="text-purple-400" /> },
];

function SkillPill({ name, icon }: { name: string; icon: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/8 bg-white/[0.03] text-sm font-medium text-zinc-300 whitespace-nowrap shrink-0 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300">
            <span className="text-lg">{icon}</span>
            <span className="uppercase text-[11px] tracking-widest font-semibold">{name}</span>
        </div>
    );
}

export default function SkillsSection() {
    // Double the array for seamless infinite scroll
    const doubled = [...skills, ...skills];

    return (
        <section id="skills" className={`${jetbrainsMono.className} py-20 sm:py-28 md:py-36 px-4 scroll-mt-28 w-full max-w-7xl mx-auto overflow-hidden`}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col items-center justify-center gap-2 mb-12"
            >
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">
                    Tech Stack
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl text-center font-bold">
                    The Stack I Ship With
                </h2>
            </motion.div>

            {/* Marquee Row 1 */}
            <div className="relative w-full mb-4">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

                <div
                    className="flex gap-4 w-max hover:[animation-play-state:paused]"
                    style={{ animation: 'marquee 30s linear infinite' }}
                >
                    {doubled.map((skill, i) => (
                        <SkillPill key={`r1-${i}`} {...skill} />
                    ))}
                </div>
            </div>

            {/* Marquee Row 2 — reverse direction */}
            <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

                <div
                    className="flex gap-4 w-max hover:[animation-play-state:paused]"
                    style={{ animation: 'marquee-reverse 35s linear infinite' }}
                >
                    {[...doubled].reverse().map((skill, i) => (
                        <SkillPill key={`r2-${i}`} {...skill} />
                    ))}
                </div>
            </div>
        </section>
    );
}
