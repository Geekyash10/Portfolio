"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import MobileSidebar from './MobileSidebar';

export default function Navbar() {
  return (
    <>
      <MobileSidebar />

      {/* Mobile Logo (Top Left) - Aligned with Hamburger */}
      <Link href="/" className="fixed top-6 left-6 z-50 h-14 flex items-center text-3xl font-bold font-outfit tracking-tighter text-white md:hidden mix-blend-difference">
        Yash.
      </Link>

      {/* Desktop Navigation Pill */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl bg-black/50 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 items-center justify-between"
      >
        <Link href="/" className="text-xl font-bold font-outfit tracking-tighter">Yash.</Link>
        
        <div className="flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="#about" className="hover:text-white transition-colors">About Me</Link>
          <Link href="#skills" className="hover:text-white transition-colors">Skills</Link>
          <Link href="#experience" className="hover:text-white transition-colors">Experience</Link>
          <Link href="#work" className="hover:text-white transition-colors">Projects</Link>
          <Link href={process.env.NEXT_PUBLIC_RESUME || "/resume.pdf"} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Resume</Link>
        </div>

        <Link href="#contact" className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full hover:bg-gray-200 transition-colors">
          Let's Talk
        </Link>
      </motion.nav>
    </>
  );
}
