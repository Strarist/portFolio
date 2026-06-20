import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Socials() {
  return (
    <div className="flex gap-4 sm:gap-6 justify-center">
      <a
        href="https://github.com/Strarist"
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-900 border border-white/8 text-zinc-300 transition-all duration-300 transform hover:-translate-y-[4px] hover:shadow-[0_10px_25px_rgba(232,57,13,0.35)] hover:border-[#e8390d] hover:text-[#e8390d]"
        aria-label="GitHub Profile"
      >
        <FiGithub className="w-7 h-7" />
      </a>

      <a
        href="https://linkedin.com/in/adigupta1620"
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-900 border border-white/8 text-zinc-300 transition-all duration-300 transform hover:-translate-y-[4px] hover:shadow-[0_10px_25px_rgba(232,57,13,0.35)] hover:border-[#e8390d] hover:text-[#e8390d]"
        aria-label="LinkedIn Profile"
      >
        <FiLinkedin className="w-7 h-7" />
      </a>

      <a
        href="mailto:2002guptaadi@gmail.com"
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-900 border border-white/8 text-zinc-300 transition-all duration-300 transform hover:-translate-y-[4px] hover:shadow-[0_10px_25px_rgba(232,57,13,0.35)] hover:border-[#e8390d] hover:text-[#e8390d]"
        aria-label="Send Email"
      >
        <FiMail className="w-7 h-7" />
      </a>
    </div>
  );
}
