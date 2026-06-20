"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { jetbrainsMono } from "@/app/font";
import { Logo } from "@/components/ui/Logo";

export default function Footer() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Pre-footer CTA */}
      <div className="w-full max-w-5xl px-4 py-24 flex flex-col items-center text-center gap-8 border-t border-white/5">
        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#e8390d]">
          Collaboration
        </span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none max-w-4xl">
          FROM CONCEPT TO CREATION.<br/>LET&apos;S MAKE IT HAPPEN.
        </h2>
        <a
          href="#contact"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#e8390d] text-white font-bold text-sm tracking-wider uppercase overflow-hidden shadow-[0_4px_24px_rgba(232,57,13,0.3)] hover:shadow-[0_8px_32px_rgba(232,57,13,0.5)] transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            Get In Touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      </div>

      {/* Main Footer */}
      <footer className={`${jetbrainsMono.className} w-full border-t border-white/5 bg-black/20 backdrop-blur-md pt-16 pb-8 px-6 md:px-12 flex flex-col items-center gap-12`}>
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left column: logo & tagline */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Logo size={40} className="text-white" />
            </div>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Full-stack developer building AI-powered products, high-performance backends, and beautiful user experiences.
            </p>
          </div>

          {/* Right columns: general links & connect */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">General</span>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Experience</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">Skills</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Connect</span>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <a href="https://github.com/Strarist" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/adigupta1620" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                  LinkedIn <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="mailto:2002guptaadi@gmail.com" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                  Email <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright / links */}
        <div className="w-full max-w-5xl border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Aditya Gupta. All rights reserved.</p>
          <Link href="/blog" className="hover:text-white transition-colors">Engineering Blog</Link>
        </div>
      </footer>
    </div>
  );
}
