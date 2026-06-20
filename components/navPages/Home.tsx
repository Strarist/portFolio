'use client';

import React, { useState } from 'react';
import { jetbrainsMono } from '@/app/font';
import { ArrowRight } from 'lucide-react';
import Socials from '../Socials';
import { InteractiveHoverButton } from '../ui/interactive-hover-button';
import { RoleTypewriter } from '../ui/RoleTypewriter';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HIGHLIGHTS = [
  { label: 'Production systems', value: 'AI + Backend' },
  { label: 'Cloud certified', value: 'AWS CCP' },
  { label: 'Available globally', value: 'Remote-friendly' },
];

const VALUE_PROPS = [
  { title: 'Clean architecture', detail: 'Modular APIs, typed frontends, maintainable codebases' },
  { title: 'Deployed & scaling', detail: 'Docker, Kubernetes, AWS — built for production from day one' },
  { title: 'Fast iterations', detail: 'Clear communication, rapid prototypes, no surprises' },
];

export function Home() {
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Aditya_Gupta_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div
      id="home"
      className="w-full flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12 sm:pt-32 sm:pb-16 relative scroll-mt-28"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[min(800px,100vw)] h-[500px] rounded-full bg-violet-950/10 blur-[120px]" />
        <div className="absolute top-1/3 left-[10%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-[#e8390d]/5 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center gap-5 sm:gap-7 md:gap-8 w-full max-w-4xl text-center relative z-10"
      >
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <p className="text-base sm:text-xl md:text-2xl text-zinc-400 font-medium tracking-tight px-2">
            Code that ships.{' '}
            <span className="text-white italic font-serif">Engineering that scales.</span>
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2"
        >
          <h1 className="text-[2.5rem] leading-tight sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
            Aditya{' '}
            <span className="text-[#e8390d]">Gupta</span>
          </h1>
          <span
            className="text-3xl sm:text-5xl select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transformOrigin: '70% 70%',
              animation: isHovered ? 'wave 1.2s ease-in-out infinite' : 'none',
              display: 'inline-block',
            }}
          >
            👋
          </span>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="tailwind-wrapper text-lg sm:text-2xl md:text-4xl font-extrabold text-white w-full min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.25rem] px-2"
        >
          <RoleTypewriter />
        </motion.div>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className={`text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto px-2 ${jetbrainsMono.className}`}
        >
          I build production-ready, AI-powered platforms — from React frontends to FastAPI backends, deployed on Docker, Kubernetes, and AWS.
        </motion.p>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-2"
        >
          <Link
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#e8390d] text-white text-sm font-semibold shadow-[0_4px_24px_rgba(232,57,13,0.35)] hover:shadow-[0_8px_32px_rgba(232,57,13,0.5)] transition-all duration-300"
          >
            Let&apos;s Build Together
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <InteractiveHoverButton onClick={handleDownload} />
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-2xl pt-1 px-1"
        >
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.label}
              className="px-3 sm:px-4 py-3 rounded-xl border border-white/6 bg-white/[0.03] backdrop-blur-sm text-left sm:text-center"
            >
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{h.label}</p>
              <p className={`${jetbrainsMono.className} text-xs sm:text-sm text-zinc-200 mt-1`}>{h.value}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="w-full max-w-3xl pt-1 px-1 text-left">
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 font-bold mb-3 sm:mb-4 text-center">What you get</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {VALUE_PROPS.map((item) => (
              <div
                key={item.title}
                className="group px-4 py-3.5 sm:py-4 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent hover:border-[#e8390d]/20 transition-colors duration-300"
              >
                <p className="text-sm font-semibold text-zinc-100 group-hover:text-[#e8390d] transition-colors">{item.title}</p>
                <p className={`${jetbrainsMono.className} text-[11px] text-zinc-500 mt-1.5 sm:mt-2 leading-relaxed`}>{item.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Socials />
        </motion.div>
      </motion.div>
    </div>
  );
}
