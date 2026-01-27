"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Stamp, Newspaper, TrendingUp } from "lucide-react";
import React, { useRef } from "react";

const stats = [
    { label: "HACKATHONS", value: "05+" },
    { label: "PROBLEMS SOLVED [CF•LC]", value: "1550+" },
    { label: "PROJECTS", value: "15+" },
];

const awards = [
    { 
        title: "HACK DATA HACKATHON", 
        rank: "2ND PLACE",
        date: "MARCH 9, 2025",
        desc: "Diagnostic platform powered by LLMs revolutionizes healthcare screening.", 
        tags: ["GEN-AI", "TECH BREAKTHROUGH"],
        rotation: 2
    },
    { 
        title: "HACK-IN-WINTER", 
        rank: "INNOVATION PRIZE",
        date: "JAN 20, 2025",
        desc: "New accessibility tool allows fully voice-controlled web browsing.", 
        tags: ["ACCESSIBILITY", "HUMAN INTEREST"],
        rotation: -1
    },
    { 
        title: "Problem Solving", 
        rank: "CF Max: 1138 • LC Max: 1688",
        date: "Ongoing",
        desc: "Demonstrated proficiency in algorithms, data structures, and optimization.", 
        tags: ["COMPETITIVE", "DSA"],
        rotation: 3
    },
];

function NewspaperCard({ award, index }: { award: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotate: award.rotation }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
            whileHover={{ scale: 1.02, rotate: 0 }}
            style={{ 
                willChange: 'transform',
                transformStyle: 'preserve-3d'
            }}
            className="group relative bg-[#f4f1ea] text-zinc-900 p-4 sm:p-5 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-w-sm mx-auto w-full transition-all duration-200"
        >
            {/* Simplified Paper Texture - Reduced opacity and removed expensive mix-blend */}
            <div 
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '150px 150px',
                    willChange: 'auto'
                }}
            ></div>
            
            {/* Header Line */}
            <div className="flex justify-between items-center border-b-2 border-zinc-900 pb-2 mb-3 sm:mb-4">
                <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-zinc-500 break-words">{award.date}</span>
                <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase text-red-700 font-bold text-right ml-2 break-words">{award.rank}</span>
            </div>

            {/* Headline */}
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black leading-[0.9] mb-3 sm:mb-4 uppercase tracking-tight">
                {award.title}
            </h3>

            {/* Content */}
            <div className="flex gap-3 sm:gap-4">
                <div className="w-1 bg-zinc-900 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm sm:text-base md:text-lg leading-snug mb-3 sm:mb-4 text-zinc-800">
                        {award.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                        {award.tags.map((tag: string) => (
                            <span key={tag} className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-zinc-200 text-zinc-600 px-1.5 sm:px-2 py-0.5 sm:py-1 whitespace-nowrap">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* "Cutout" Visuals - Fake Tape - Responsive */}
            <div 
                className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 w-12 sm:w-14 md:w-16 h-6 sm:h-7 md:h-8 bg-yellow-200/80 rotate-1 shadow-sm"
                style={{ willChange: 'auto' }}
            ></div>
        </motion.div>
    )
}

export default function Achievements() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });
    
    // Optimized parallax - reduced movement and smoother
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

    return (
        <motion.section 
            id="achievements"
            ref={ref}
            style={{ 
                y, 
                opacity,
                willChange: 'transform, opacity'
            }}
            className="relative py-12 sm:py-16 md:py-20 pb-16 sm:pb-24 md:pb-[40vh] bg-[#1a1816] text-white overflow-hidden z-0 achievements-section"
        >
             
             {/* Simplified Typography Background - Responsive size */}
             <div 
                className="absolute inset-0 z-0 opacity-[0.02] sm:opacity-[0.03] pointer-events-none select-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='200' viewBox='0 0 400 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle%3E.text%7Bfont-family: 'Times New Roman', serif; font-weight: 700; fill: %23e5e5e5; font-size: 24px; letter-spacing: 0px;%7D .small%7Bfont-size: 14px; font-weight: 400; fill: %23a3a3a3;%7D%3C/style%3E%3Ctext x='20' y='30' class='text'%3ETHE DAILY CHRONICLE%3C/text%3E%3Ctext x='20' y='60' class='small'%3ELorem ipsum dolor sit amet, consectetur adipiscing elit.%3C/text%3E%3Ctext x='260' y='30' class='text'%3EBREAKING%3C/text%3E%3Ctext x='260' y='60' class='small'%3EEngineering excellence reported.%3C/text%3E%3Ctext x='20' y='100' class='text'%3ELATEST EDITION%3C/text%3E%3Ctext x='20' y='130' class='small'%3EFull stack systems scaling globally.%3C/text%3E%3Ctext x='220' y='100' class='text'%3EVOL. 2025%3C/text%3E%3Ctext x='220' y='130' class='small'%3EDesign systems award winner.%3C/text%3E%3Ctext x='20' y='170' class='text'%3EEXTRA! EXTRA!%3C/text%3E%3Ctext x='180' y='170' class='text'%3ETECH NEWS%3C/text%3E%3C/svg%3E")`,
                    backgroundSize: 'clamp(200px, 50vw, 400px) clamp(100px, 25vw, 200px)',
                    willChange: 'auto'
                }}
             ></div>
             
             {/* Simplified Paper Texture - Reduced opacity, removed expensive mix-blend */}
             <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '150px 150px',
                    willChange: 'auto'
                }}
             ></div>

             {/* Vignette */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1a1816_95%)] pointer-events-none"></div>

             <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10">
                 
                 {/* Newspaper Header - Responsive */}
                 <div className="border-b-2 sm:border-b-4 border-white mb-12 sm:mb-16 md:mb-20 pb-6 sm:pb-8 text-center">
                     <div className="flex justify-between items-end mb-3 sm:mb-4 px-2 sm:px-4 md:px-8">
                         <div className="hidden md:flex flex-col text-left">
                             <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Late Edition</span>
                             <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Vol. 2025</span>
                         </div>
                         <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-9xl font-serif font-black tracking-tighter uppercase text-white scale-y-110 leading-[0.9] px-2 sm:px-0">
                             THE CHRONICLE
                         </h2>
                         <div className="hidden md:flex flex-col text-right">
                             <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">Price: _.__$</span>
                             <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">JIIT-62</span>
                         </div>
                     </div>
                     <div className="w-full h-px bg-white/30 mb-1"></div>
                     <div className="w-full h-px bg-white/30"></div>
                     
                     <p className="mt-3 sm:mt-4 font-serif italic text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 px-4 sm:px-0">
                         "Celebrating Engineering Excellence & Broken Builds"
                     </p>
                 </div>

                 {/* Stats Ticker - Responsive */}
                 <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center sm:items-center bg-white/5 border-y border-white/10 py-3 sm:py-4 px-4 sm:px-6 md:px-8 mb-12 sm:mb-16 md:mb-24 font-mono text-xs sm:text-sm tracking-widest uppercase text-zinc-400 gap-3 sm:gap-4">
                     <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 w-full sm:w-auto">
                         {stats.map((s, i) => (
                             <div key={i} className="flex items-center gap-2 sm:gap-4">
                                 <span className="text-white font-bold whitespace-nowrap">{s.value}</span> 
                                 <span className="text-zinc-400 whitespace-nowrap">{s.label}</span>
                                 {i !== stats.length - 1 && <span className="text-zinc-700 hidden sm:inline">///</span>}
                             </div>
                         ))}
                     </div>
                     <div className="flex items-center gap-2 text-red-500 font-bold text-xs sm:text-sm">
                         <span 
                            className="w-2 h-2 rounded-full bg-red-500"
                            style={{
                                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                                willChange: 'opacity'
                            }}
                         ></span>
                         <span className="whitespace-nowrap">LIVE UPDATES</span>
                     </div>
                 </div>

                 {/* Cards Grid - Responsive */}
                 <div 
                    className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12"
                    style={{ willChange: 'auto' }}
                 >
                     {awards.map((award, i) => (
                         <NewspaperCard key={i} award={award} index={i} />
                     ))}
                 </div>

             </div>
        </motion.section>
    );
}
