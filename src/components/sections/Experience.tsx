"use client";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import React, { useRef, useState } from "react";

const experiences = [
    {
        id: "01",
        label: "FDE INTERN", // Replaces "Research" from ref
        company: "GREXA.AI",
        role: "PRESENT",
        date: "PRESENT",
        desc: "Architecting scalable frontend systems for AI-driven platforms.",
        tech: ["Next.js", "TypeScript", "System Design"],
        img: "/grexa.png"
    },
    {
        id: "02",
        label: "FREELANCER", // Replaces "Wireframe" from ref
        company: "GEEKCLASH",
        role: "DEVELOPER-2024",
        date: "2024",
        desc: "Engineered comprehensive sports management ecosystem.",
        tech: ["MERN Stack", "AWS Lambda", "Redis"],
        img: "/geekclash.png"
    },
    {
        id: "03",
        label: "FRONTEND", // Replaces "UI Design" from ref
        company: "BIZOALLY",
        role: "INTERN-2025",
        date: "2025",
        desc: "Optimized dashboard telemetry and user interaction flows.",
        tech: ["React", "Material UI", "Analytics"],
        img: "https://yashmittal10.vercel.app/assets/bizoally-7812b225.webp"
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(0);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsLength = experiences.length;
        const segment = 1 / cardsLength;
        const index = Math.min(Math.floor(latest / segment), cardsLength - 1);
        setActiveCard(index);
    });

    return (
        <section ref={containerRef} id="experience" className="relative bg-[#0a0a09] text-white z-20 -mt-[10vh] pt-[10vh]">
             
             {/* Extended height            {/* Sticky Container */}
            <div className="h-[230vh] hidden relative md:flex z-10"> {/* Reduced from 300vh for early exit */}
                
                {/* Visual Area (Sticky Left) */}
                <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center p-12 bg-[#0a0a09]">
                    <div className="relative w-full max-w-md aspect-[3/4]">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0 }}
                                animate={{
                                    clipPath: index === activeCard ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
                                    opacity: 1, // Always 1, controlled by clipPath
                                    scale: index === activeCard ? 1 : 1, // Fixed scale for stability
                                    zIndex: index === activeCard ? 10 : 0
                                }}
                                transition={{ 
                                    duration: 0.8, 
                                    ease: [0.32, 0.72, 0, 1], // Custom liquid ease
                                    clipPath: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } // Slower liquid drip
                                }}
                                className="absolute inset-0"
                            >
                                <div className="w-full h-full bg-zinc-900 border border-zinc-800 overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-500 grayscale" style={{ backgroundImage: `url(${exp.img})` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                    
                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <div className="flex justify-between items-end mb-4">
                                            <div>
                                                <div className="text-orange-500 font-mono text-xs tracking-widest mb-1">{exp.role}</div>
                                                <div className="text-3xl font-black uppercase leading-none">{exp.company}</div>
                                            </div>
                                            <span className="text-4xl font-black text-zinc-800">{exp.id}</span>
                                        </div>
                                        <p className="text-zinc-400 text-sm leading-relaxed border-l border-orange-500 pl-4">
                                            {exp.desc}
                                        </p>
                                    </div>
                                    
                                    {/* Tech Tags */}
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                                        {exp.tech.map((t) => (
                                            <span key={t} className="bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-wider border border-white/10 text-zinc-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Content Area (Scrolling Right - Typography) */}
                <div className="w-full md:w-1/2 relative bg-[rgba(248_239_225/0.08)] z-0">
                     <div className="flex flex-col pb-32"> {/* Removed large pb-[50vh] to allow early exit */}
                         {/* Header - Partof the flow, reduced height */}
                         <ScrollTitle 
                            title="CAREER TIMELINE" 
                            isActive={true} // Always active/orange or maybe static white
                            isHeader={true}
                         />

                         {experiences.map((exp, index) => (
                             <div key={exp.id} className="h-[60vh] flex items-center justify-start px-6 md:pl-0 md:-ml-24"> {/* Reduced height, negative margin to pull closer */}
                                 <ScrollTitle 
                                    title={exp.label} 
                                    isActive={activeCard === index}
                                 />
                             </div>
                         ))}
                     </div>
                </div>

            </div>

             {/* Mobile View - Sticky Stack */}
            <div className="md:hidden flex flex-col relative pb-32">
                 {/* Non-sticky static header to prevent collision with fixed Navbar */}
                 <div className="px-6 md:pt-24 pb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-px bg-orange-500"></span>
                        <span className="text-orange-500 font-mono text-xs tracking-widest uppercase">Where I’ve Worked</span>
                    </div>
                    <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">
                        Experience.
                    </h2>
                 </div>

                 <div className="flex flex-col gap-4 px-4">
                     {experiences.map((exp, i) => (
                         <div key={exp.id} className="sticky top-24 h-[60vh] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a09] backface-hidden will-change-transform">
                             {/* Background Image - Optimized Opacity */}
                             <div className="absolute inset-0 bg-cover bg-center grayscale opacity-30" style={{ backgroundImage: `url(${exp.img})` }}></div>
                             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
                             
                             {/* Content */}
                             <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                 {/* Index Number */}
                                 <span className="absolute top-4 right-4 text-6xl font-black text-white/5 font-sans leading-none">{exp.id}</span>
                                 
                                 <div className="relative z-10">
                                     <div className="flex flex-col gap-1 mb-4">
                                         <span className="text-orange-500 font-mono text-xs tracking-[0.2em] uppercase">{exp.date}</span>
                                         <h3 className="text-3xl font-black text-white uppercase leading-none">{exp.company}</h3>
                                         <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{exp.role}</span>
                                     </div>
                                     
                                     <p className="text-zinc-400 text-sm leading-relaxed border-l-2 border-orange-500 pl-4 mb-6 line-clamp-3">
                                         {exp.desc}
                                     </p>

                                     <div className="flex flex-wrap gap-2">
                                         {exp.tech.map(t => (
                                             <span key={t} className="text-[10px] uppercase font-mono tracking-wider text-zinc-300 border border-white/10 bg-white/5 px-2 py-1 rounded-full backdrop-blur-md">
                                                 {t}
                                             </span>
                                         ))}
                                     </div>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
        </section>
    );
}

function ScrollTitle({ title, isActive, isHeader = false }: { title: string, isActive: boolean, isHeader?: boolean }) {
    if (isHeader) {
        return (
            <div className="h-[50vh] flex flex-col justify-end px-6 md:px-12 md:-ml-24 text-left pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="w-12 h-px bg-orange-500/50"></span>
                        <span className="font-mono text-orange-500 tracking-[0.3em] text-xs uppercase">Section — Where I’ve Worked</span>
                    </div>
                    
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] relative z-10">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>Tech.</span>
                        <span className="block text-white">Experience</span>
                    </h2>
                    
                    {/* Decorative glowing orb/line */}
                    <div className="absolute -left-8 top-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-50"></div>
                </motion.div>
            </div>
        )
    }

    return (
        <motion.div 
            className="relative cursor-pointer w-full text-left"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.h2 
                className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter whitespace-nowrap leading-[0.8] bg-clip-text text-transparent"
                style={{
                    backgroundImage: "linear-gradient(to top, #f97316 50%, rgba(255,255,255,0.1) 50%)", // Orange bottom, Dim White top
                    backgroundSize: "100% 200%",
                    position: 'relative',
                    left: "-2rem"
                }}
                animate={{
                    backgroundPosition: isActive ? "0% 100%" : "0% 0%" // 0% 0% shows top (Dim), 0% 100% shows bottom (Orange)
                }}
                transition={{
                    duration: 0.8,
                    ease: "easeInOut"
                }}
            >
                {title}
            </motion.h2>
        </motion.div>
    )
}
