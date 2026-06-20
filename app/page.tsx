import React from "react";
import { Home } from "@/components/navPages/Home";
import dynamic from "next/dynamic";

const Experience = dynamic(() => import("@/components/navPages/Experience"));
const Projects = dynamic(
  () => import("@/components/navPages/Projects").then((mod) => mod.Projects)
);
const EngineeringHighlights = dynamic(() => import("@/components/navPages/EngineeringHighlights"));
const SkillsSection = dynamic(() => import("@/components/navPages/Skills"));
const Certifications = dynamic(() => import("@/components/navPages/Certifications"));
const Publications = dynamic(() => import("@/components/navPages/Publications"));
const Contact = dynamic(() => import("@/components/navPages/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));



export default function HomePage() {
  return (
    <main className="flex flex-col items-center scroll-smooth min-h-screen bg-transparent text-foreground relative z-10 overflow-x-hidden pb-24 sm:pb-0">
      <Home />
      <Experience />
      <Projects />
      <EngineeringHighlights />
      <SkillsSection />
      <Certifications />
      <Publications />
      <Contact />
      <Footer />
    </main>
  );
}
