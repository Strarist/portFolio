"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  GraduationCap,
  Briefcase,
  Wrench,
  Contact,
} from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";

const navItems = [
  { name: "Home", url: "/#home", icon: Home },
  { name: "Experience", url: "/#experience", icon: GraduationCap },
  { name: "Projects", url: "/#projects", icon: Briefcase },
  { name: "Skills", url: "/#skills", icon: Wrench },
  { name: "Contact", url: "/#contact", icon: Contact },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [cmdOpen, setCmdOpen] = useState(false);

  const handleOpen = useCallback(() => setCmdOpen(true), []);
  const handleClose = useCallback(() => setCmdOpen(false), []);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (pathname === "/") {
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", "#home");
      } else {
        router.push("/#home");
      }
    },
    [pathname, router]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="fixed top-6 left-6 md:left-12 z-50 pointer-events-auto hidden sm:block">
        <Link
          href="/#home"
          onClick={handleLogoClick}
          className="flex items-center gap-2 group"
        >
          <Logo size={44} className="text-white" />
        </Link>
      </div>
      <NavBar items={navItems} onCommandOpen={handleOpen} />
      <CommandPalette open={cmdOpen} onClose={handleClose} />
    </>
  );
}
