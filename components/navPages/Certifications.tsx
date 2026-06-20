"use client";
import React from "react";
import Image from "next/image";
import { jetbrainsMono } from "@/app/font";
import { ExternalLink, ShieldCheck, Cloud, Server } from "lucide-react";
import { motion } from "framer-motion";

const certifications = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    badge: "/aws_badge.png",
    link: "https://www.credly.com/badges/d07d05a7-cc1f-48b1-a99f-3f5a6f65951a/public_url",
    gradient: "#ff9900, #1a1a2e",
    highlights: [
      "Cloud architecture fundamentals and best practices",
      "AWS core services: EC2, S3, Lambda, RDS, IAM",
      "Cost optimization and billing management",
      "Security, compliance, and shared responsibility model",
    ],
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className={`${jetbrainsMono.className} w-full max-w-7xl mx-auto py-20 sm:py-28 md:py-36 px-4 scroll-mt-28`}>
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-2 mb-12">
        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-zinc-500">
          Credentials
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl text-center font-bold">
          Certifications
        </h2>
      </div>

      {/* Stacked Showcase */}
      <div className="flex flex-col gap-24 w-full mt-8">
        {certifications.map((cert, index) => {
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
              {/* Left/Right — Badge Card */}
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full lg:w-1/2 min-h-[300px] lg:min-h-[380px] rounded-2xl overflow-hidden border border-white/8 group cursor-pointer flex items-center justify-center"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${cert.gradient})`,
                }}
              >
                {/* Badge image */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 group-hover:scale-105 transition-transform duration-500 bg-[#1a1a2e] rounded-2xl overflow-hidden">
                  <Image
                    src={cert.badge}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 192px, 224px"
                    className="object-contain drop-shadow-[0_8px_30px_rgba(255,153,0,0.3)] p-4"
                  />
                </div>

                {/* Credly label overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/50">
                    Verified on Credly
                  </span>
                  <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-white/70 transition-colors" />
                </div>
              </a>

              {/* Right/Left — Details Panel */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 lg:px-4">
                {/* Title with red dash */}
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[3px] bg-[#e8390d] rounded-full shrink-0" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{cert.title}</h2>
                </div>

                {/* Issuer */}
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Issued by <span className="text-zinc-200 font-semibold">{cert.issuer}</span> — validates foundational understanding of AWS Cloud, services, security, architecture, and pricing.
                </p>

                {/* Highlights with + bullets */}
                <ul className="space-y-2">
                  {cert.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-[#e8390d] font-bold mt-0.5 shrink-0">+</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Verify link */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8390d] text-white text-xs font-bold shadow-[0_4px_14px_rgba(232,57,13,0.3)] hover:shadow-[0_6px_20px_rgba(232,57,13,0.5)] transition-all"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" /> Verify Credential
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
