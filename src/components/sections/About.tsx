"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import React, { useRef } from "react";

// --- Components ---

function GlassPuzzlePiece({ 
    children, 
    className = "", 
    delay = 0 
}: { 
    children: React.ReactNode; 
    className?: string;
    delay?: number;
}) {
    // Optimized 3D Tilt Logic - Reduced complexity
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / rect.width - 0.5) * 2;
        const yPct = (mouseY / rect.height - 0.5) * 2;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Reduced rotation range and optimized spring settings
    const rotateX = useSpring(useTransform(y, [-1, 1], [4, -4]), { stiffness: 200, damping: 25 });
    const rotateY = useSpring(useTransform(x, [-1, 1], [-4, 4]), { stiffness: 200, damping: 25 });

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d",
                willChange: 'transform'
            }}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: [0.2, 0.65, 0.3, 0.9] }}
            className={`
                relative rounded-3xl overflow-hidden group
                backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
                hover:border-white/20 hover:bg-white/10 transition-colors duration-300
                ${className}
            `}
        >
            {/* Specular Highlight Gradient - Optimized */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
            
            {/* Inline noise pattern instead of external URL */}
            <div 
                className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px'
                }}
            ></div>
            
            <div className="relative z-20 h-full p-8 flex flex-col justify-between">
                {children}
            </div>
        </motion.div>
    );
}

// Background Strings Component - Optimized
function BackgroundStrings() {
    // Pre-calculate positions to avoid random on every render
    const strings = Array.from({ length: 6 }, (_, i) => ({
        left: `${(i + 0.7) * 15}%`,
        height: `${40 + (i % 3) * 20}%`,
        delay: i * 0.2,
        duration: 1.2 + (i % 2) * 0.3,
        show: i % 2 === 0 || i > 2
    }));

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {strings.map((str, i) => (
                <div
                    key={i}
                    className={`absolute top-0 origin-top flex flex-col items-center opacity-15 ${str.show ? 'flex' : 'hidden md:flex'}`}
                    style={{ 
                        left: str.left, 
                        height: str.height,
                        willChange: 'transform',
                    }}
                >
                    {/* String (Thin Line) */}
                    <div 
                        className="w-[2px] h-full bg-white/30"
                        style={{
                            animation: `sway ${str.duration}s ease-in-out infinite alternate`,
                            animationDelay: `${str.delay}s`
                        }}
                    ></div>
                    
                    {/* Ring Hook (Simplified) */}
                    <div className="relative -mt-1 w-8 h-8 rounded-full border-[3px] border-zinc-500/50 bg-transparent flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-black/30"></div>
                    </div>
                </div>
            ))}
            <style jsx>{`
                @keyframes sway {
                    0% { transform: rotate(-0.5deg); }
                    100% { transform: rotate(0.5deg); }
                }
            `}</style>
        </div>
    )
}

// Hanging Header Component - Optimized
function HangingHeader() {
    return (
        <motion.div 
            initial={{ rotate: -0.5 }}
            animate={{ rotate: 0.5 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            style={{ willChange: 'transform' }}
            className="absolute top-0 md:-top-8 left-1 -translate-x-1/2 z-20 flex flex-col items-center origin-top w-full pointer-events-none"
        >
            {/* Strings - Simplified */}
            <div className="flex gap-28 ml-4 md:gap-60 h-20 md:h-28 items-end">
                {/* Left String + Hook */}
                <div className="flex flex-col items-center h-full">
                    <div className="w-[2px] h-full bg-white/50"></div>
                    <div className="relative -mt-0.5 w-5 h-5 rounded-full border-3 border-zinc-400/70 bg-transparent"></div>
                </div>

                {/* Right String + Hook */}
                <div className="flex flex-col items-center h-full">
                    <div className="w-[2px] h-full bg-white/50"></div>
                    <div className="relative -mt-0.5 w-5 h-5 rounded-full border-3 border-zinc-400/70 bg-transparent"></div>
                </div>
            </div>
            
            {/* Text Container */}
            <div className="relative -mt-5 flex justify-center items-center">
                 <h1 className="text-6xl md:text-9xl font-black font-outfit text-white tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] px-10">
                     ABOUT
                     <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-400 to-zinc-700 ml-4">ME</span>
                 </h1>
            </div>
        </motion.div>
    )
}

export default function About() {
  const BACKGROUND_URL = "/mat-back.png";

  return (
    <section 
        id="about" 
        className="relative py-32 text-white px-6 min-h-screen flex items-center justify-center overflow-hidden group/section"
    >
        
        {/* Background Image - Optimized with Next.js Image */}
        <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ 
                backgroundImage: `url(${BACKGROUND_URL})`,
                willChange: 'auto'
            }}
        >
            <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        {/* Background Strings */}
        <BackgroundStrings />

        {/* Hanging Header */}
        <HangingHeader />

        {/* --- The Glass Puzzle Grid --- */}
        <div className="max-w-6xl w-full relative z-10 perspective-1000 mt-20 md:mt-20">
            {/* Mobile: Auto height, Desktop: Fixed height for grid alignment */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:gap-6 h-auto md:h-[650px]">

                {/* Piece 1: The Anchor (Large Glass) */}
                <GlassPuzzlePiece className="md:col-span-3 md:row-span-2 !p-0 min-h-[400px] md:min-h-0">
                     <div className="h-full flex flex-col justify-between p-6 md:p-10 bg-gradient-to-br from-white/5 to-transparent">
                         <div>
                             <h2 className="text-5xl md:text-8xl font-black font-outfit tracking-tighter mb-4 md:mb-6 leading-[0.9] drop-shadow-2xl">
                                HELLO<span className="text-orange-500">.</span>
                             </h2>
                             <p className="text-lg md:text-3xl font-light text-zinc-100 max-w-2xl leading-relaxed">
                                I&apos;m <strong className="text-white drop-shadow-md">Yash Mittal</strong>. A Full Stack Engineer obsessed with precision.
                             </p>
                         </div>
                         <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                            <p className="text-base md:text-xl text-zinc-300 max-w-lg font-medium">
                                I build systems that scale, interfaces that feel alive, and products that solve real problems.
                            </p>
                            <div className="hidden md:block">
                                <ArrowUpRight className="w-12 h-12 text-orange-400 opacity-90" />
                            </div>
                         </div>
                     </div>
                </GlassPuzzlePiece>

                {/* Piece 2: Stats (Orange Glass - Education) */}
                <GlassPuzzlePiece delay={0.1} className="md:col-span-1 md:row-span-1 !bg-orange-500/10 !border-orange-500/20 min-h-[200px] md:min-h-0">
                    <div className="h-full flex flex-col justify-between relative z-20">
                        {/* Inner light */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/20 blur-2xl rounded-full pointer-events-none"></div>
                        
                        <div className="flex justify-between items-start">
                             <div className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                                <ArrowUpRight className="w-4 h-4 text-orange-200" />
                             </div>
                             <span className="text-xs font-bold font-mono text-orange-200/50">2021-25</span>
                        </div>
                        
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-200/60 mb-1">Education</h4>
                            <p className="text-xl font-bold font-outfit text-white leading-tight">B.Tech CSE</p>
                            <p className="text-sm text-orange-100/70 font-medium mt-1">@ JIIT, Noida</p>
                        </div>
                    </div>
                </GlassPuzzlePiece>

                {/* Piece 3: Experience (Dark Glass - Work) */}
                <GlassPuzzlePiece delay={0.2} className="md:col-span-1 md:row-span-1 min-h-[200px] md:min-h-0">
                     <div className="h-full flex flex-col justify-between relative overflow-hidden">
                        
                        {/* Audio Waveform Visual - Optimized */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex gap-1 opacity-15 transform scale-75 origin-right">
                            {[12, 20, 16, 24, 10, 18, 14].map((h, i) => (
                                <motion.div 
                                    key={i}
                                    animate={{ height: [h, h*1.3, h] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                                    style={{ 
                                        height: h,
                                        width: '4px',
                                        willChange: 'height'
                                    }}
                                    className="bg-green-500/60 rounded-full"
                                />
                            ))}
                        </div>

                        <div className="flex justify-between items-start">
                             <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-bold text-green-400 uppercase tracking-wide">Active</span>
                             </div>
                        </div>
                        
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Experience</h4>
                            <p className="text-xl font-bold font-outfit text-white leading-tight">FDE Intern</p>
                            <p className="text-sm text-zinc-400 font-medium mt-1">@ Grexa.ai</p>
                        </div>
                    </div>
                </GlassPuzzlePiece>

                {/* Piece 4: Role (Bottom Strip - Resume) */}
                <GlassPuzzlePiece delay={0.3} className="hidden md:block md:col-span-4 md:row-span-1 !bg-white/5 min-h-[250px] md:min-h-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between w-full h-full gap-6 px-4 py-4 md:p-0">
                        
                        <div className="flex items-center gap-6">
                             {/* Icon Container */}
                             <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-gradient-to-tr from-zinc-800 to-zinc-900 flex items-center justify-center border border-white/10 shadow-2xl">
                                 <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
                             </div>
                             
                             <div>
                                 <h3 className="text-xl md:text-3xl font-bold font-outfit text-white">Full Stack Developer & Freelancer</h3>
                                 <div className="flex flex-wrap gap-2 text-zinc-400 text-xs md:text-base font-medium mt-1">
                                     <span>Scalable Systems</span>
                                     <span className="text-zinc-600">•</span>
                                     <span>Creative Interactivity</span>
                                 </div>
                             </div>
                        </div>
                        
                        {/* Call to Action Button - View Resume */}
                        <div className="w-full md:w-auto mt-4 md:mt-0">
                             <ResumeButton />
                        </div>

                    </div>
                </GlassPuzzlePiece>
                
                {/* Mobile Button */}
                <div className="md:hidden w-full">
                    <ResumeButton mobile />
                </div>

            </div>
        </div>
    </section>
  );
}

function ResumeButton({ mobile = false }: { mobile?: boolean }) {
    return (
        <a href={process.env.NEXT_PUBLIC_RESUME || "/resume.pdf"} target="_blank" rel="noopener noreferrer" className={`block w-full ${mobile ? '' : 'md:w-auto'}`}>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full md:w-auto px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
            >
                <div className="relative overflow-hidden h-6 flex flex-col items-center justify-start text-lg tracking-wide uppercase font-outfit leading-6">
                    <span className="group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]">
                        View Resume
                    </span>
                    <span className="absolute top-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] flex items-center gap-2 text-orange-600">
                        Open PDF <ArrowUpRight className="w-4 h-4" />
                    </span>
                </div>
            </motion.button>
        </a>
    )
}
