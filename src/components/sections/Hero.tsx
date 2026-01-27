"use client";
import { motion, useMotionValue, useSpring, useTransform, useTime } from "framer-motion";
import { useEffect } from "react";
import { MoveRight } from "lucide-react";

interface PendulumProps {
  children: React.ReactNode;
  topOffset: string; 
  leftOffset: string; 
  stringLength: string; 
  initialRotate?: number; 
  zIndex?: number;
  pivotX?: string; 
  damping?: number;
  hangingType?: "string" | "strip"; // New Prop
  centered?: boolean; // New Prop for true centering
}

function PendulumItem({
    children, 
    topOffset, 
    leftOffset, 
    stringLength, 
    initialRotate = 0, 
    zIndex = 10, 
    pivotX = "50%", 
    damping = 20,
    hangingType = "string",
    centered = false
}: PendulumProps) {
  const winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const mouseX = useMotionValue(winW / 2);
  const time = useTime();

  useEffect(() => {
    let rafId: number;
    let lastX = winW / 2;
    
    const handleMouse = (e: MouseEvent) => {
        lastX = e.clientX;
        if (!rafId) {
            rafId = requestAnimationFrame(() => {
                mouseX.set(lastX);
                rafId = 0;
            });
        }
    };
    
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
        window.removeEventListener("mousemove", handleMouse);
        if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mouseX, winW]);

  // 1. Mouse Interaction (Interactive Force)
  const mouseRotate = useTransform(mouseX, [0, winW], [initialRotate - 5, initialRotate + 5]);
  const smoothMouse = useSpring(mouseRotate, { stiffness: 30, damping: damping });

  // 2. Ambient Sway (Continuous Force) - Period ~6s, Amplitude +/- 1.5deg
  const ambientRotate = useTransform(time, (t) => Math.sin(t / 1500) * 1.5);

  // 3. Combined Rotation
  const combinedRotate = useTransform([smoothMouse, ambientRotate], ([m, a]: any[]) => m + a);

  return (
    <div 
        className="absolute pointer-events-auto" 
        style={{ 
            top: topOffset, 
            left: leftOffset, 
            zIndex,
            transform: centered ? "translateX(-50%)" : "none"
        }}
    >
        <motion.div
            style={{ rotate: combinedRotate, transformOrigin: `${pivotX} -${stringLength}` }}
            className="relative"
        >
            {/* Hanging Mechanism: String vs Strip */}
            {hangingType === "string" ? (
                 <>
                    {/* Standard String */}
                    <svg className="absolute overflow-visible pointer-events-none" style={{ left: pivotX, top: `-${stringLength}`, width: "2px", height: stringLength }}>
                        <line x1="0" y1="0" x2="0" y2="100%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                        <circle cx="0" cy="0" r="2" fill="white" />
                    </svg>
                    
                    {/* Standard Eyelet */}
                    <div className="absolute -top-[12px] left-1/2 -translate-x-1/2 w-8 h-8 z-20 pointer-events-none">
                        <svg viewBox="0 0 32 32" fill="none" className="w-full h-full drop-shadow-sm">
                             <circle cx="16" cy="16" r="6" fill="#1a1a1a" />
                             <circle cx="16" cy="16" r="6" stroke="#9ca3af" strokeWidth="2" />
                             <path d="M16 0 V 10" stroke="#9ca3af" strokeWidth="2" />
                        </svg>
                    </div>
                 </>
            ) : (
                /* Wide Black Strip (Camera Strap Style) */
                 <div 
                    className="absolute bg-[#1a1a1a] z-0 pointer-events-none" 
                    style={{ 
                        left: "50%", 
                        transform: "translateX(-50%)",
                        top: `-${stringLength}`, 
                        width: "60px", 
                        height: `calc(${stringLength} + 20px)`, // Overlap slightly
                        maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 100%)" // Fade in at very top pivot
                    }}
                 >
                    {/* Fabric Texture Detail - Inline SVG */}
                    <div 
                        className="w-full h-full opacity-20"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            backgroundSize: '100px 100px'
                        }}
                    ></div>
                 </div>
            )}

            {/* Content */}
            <motion.div whileHover={{ scale: 1.02, cursor: "grab" }} whileTap={{ cursor: "grabbing" }}>
                {children}
            </motion.div>
        </motion.div>
    </div>
  );
}

import HeroBackground from "../ui/HeroBackground";
import { useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        setIsLoaded(true); // Layout determined, ready to show
    };
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center font-sans">
         {/* Animated Aurora + Grid Background */}
         <HeroBackground />
         
         {/* Bottom Fade for Smooth Transition */}
         <div 
            className="absolute bottom-0 w-full h-40 bg-white pointer-events-none z-0"
            style={{ 
                WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                background: "linear-gradient(to top, white 0%, transparent 100%)",
                opacity: 0.05
            }}
         ></div>

         <div 
            key={isMobile ? 'mobile' : 'desktop'} 
            className={`relative w-full max-w-[1400px] h-full mx-auto scale-[0.8] md:scale-100 origin-center top-20 transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
         >
             
              {/* -------------------------------------------
                1. BIG ORANGE CARD (Name) - Mobile: Top of Screen
             -------------------------------------------- */}
             <PendulumItem 
                topOffset={isMobile ? "2%" : "15%"} 
                leftOffset={isMobile ? "25%" : "5%"} 
                stringLength={isMobile ? "45vh" : "45vh"} 
                initialRotate={-8} 
                zIndex={isMobile ? 30 : 20} 
                pivotX="50%"
                centered={isMobile}
             >
                <div className="relative bg-[#F97316] text-white pl-8 pr-16 py-5 md:pl-12 md:pr-20 md:py-5 shadow-2xl transform origin-top w-[90vw] md:w-auto max-w-[900px] flex items-center justify-center md:justify-start rounded-xl overflow-hidden">
                   
                    <div 
                        className="absolute inset-0 opacity-80 pointer-events-none mix-blend-overlay z-10 brightness-75 contrast-150"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            backgroundSize: '100px 100px'
                        }}
                    ></div>
                    
                    <h1 className="text-4xl md:text-[5.5rem] font-bold tracking-tighter leading-[1] font-outfit select-none relative z-20 text-center md:text-left">
                        Yash Mittal,
                    </h1>
                    
                    <div className="absolute -bottom-1 -right-1 w-24 h-24 pointer-events-none overflow-visible z-30">
                        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 text-[#050505]">
                           <path d="M 100 0 L 100 100 L 0 100 L 100 0 Z" fill="currentColor" />
                        </svg>
                        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 drop-shadow-[-4px_-4px_6px_rgba(0,0,0,0.3)]">
                           <path d="M 0 100 Q 40 90 50 50 Q 60 10 100 0 L 100 100 Z" fill="#fdba74" /> 
                           <linearGradient id="foldGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                               <stop offset="0%" stopColor="rgba(0,0,0,0.1)" />
                               <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                               <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
                           </linearGradient>
                           <path d="M 0 100 Q 40 90 50 50 Q 60 10 100 0 L 100 100 Z" fill="url(#foldGradient)" />
                        </svg>
                    </div>
                </div>
             </PendulumItem>

             {/* -------------------------------------------
                2. SMALL WHITE CARD (Developer) - Mobile: Below Name
             -------------------------------------------- */}
             <PendulumItem 
                topOffset={isMobile ? "15%" : "42%"} 
                leftOffset={isMobile ? "85%" : "2%"} 
                stringLength={isMobile ? "50vh" : "55vh"} 
                initialRotate={6} 
                zIndex={30} 
                pivotX="50%"
                centered={isMobile}
             >
                 <div className="relative bg-[#F9F4F2] text-[#F97316] px-8 py-3 md:px-16 md:py-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform origin-top">
                     {/* Paper Clip */}
                     <div className="absolute -top-6 right-6 w-8 h-12 md:w-12 md:h-16 z-10 rotate-12 drop-shadow-md">
                        <svg viewBox="0 0 50 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <path d="M15 20 L 15 70 A 10 10 0 0 0 35 70 L 35 15 L 35 12 A 12 12 0 0 0 11 12 L 11 80 A 14 14 0 0 0 39 80 L 39 25" 
                                  stroke="#fdba74" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                     </div>
                     <h2 className="text-[2rem] md:text-[4rem] font-medium tracking-tight font-outfit select-none">
                        Developer
                     </h2>
                 </div>
             </PendulumItem>

             {/* -------------------------------------------
                3. LONG WHITE CARD (Enthusiast) - Mobile: Below Developer
             -------------------------------------------- */}
             <PendulumItem 
                topOffset={isMobile ? "28%" : "50%"} 
                leftOffset={isMobile ? "15%" : "25%"} 
                stringLength={isMobile ? "65vh" : "65vh"} 
                initialRotate={-4} 
                zIndex={25} 
                pivotX="50%"
                centered={isMobile}
             >
                 <div className="relative bg-[#F2F0E9] text-black px-4 py-2 md:px-14 md:py-4 rounded-xl shadow-2xl transform origin-top">
                      {/* Push Pin */}
                      <div className="absolute -top-7 right-4 z-40 w-8 h-8 md:w-12 md:h-12 rotate-12 drop-shadow-xl">
                          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <path d="M30 20 Q 20 20 20 35 Q 20 50 40 50 L 40 55 Q 40 65 30 70 L 70 70 Q 60 65 60 55 L 60 50 Q 80 50 80 35 Q 80 20 70 20 Z" 
                                      fill="#F97316" stroke="#fbbf24" strokeWidth="2" />
                                <ellipse cx="40" cy="30" rx="5" ry="8" fill="rgba(255,255,255,0.3)" transform="rotate(-20 40 30)" />
                                <path d="M50 70 L 50 95 L 52 70" fill="#888" />
                          </svg>
                      </div>
                      <h2 className="text-[1.5rem] md:text-[4.5rem] font-medium tracking-tight whitespace-nowrap font-outfit select-none">
                        & Tech enthusiast
                      </h2>
                 </div>
             </PendulumItem>
             
             {/* -------------------------------------------
                4. PROFILE CARD (Right Side) - Mobile: Hanging Lower
             -------------------------------------------- */}
             <PendulumItem 
                topOffset={isMobile ? "45%" : "15%"} 
                leftOffset={isMobile ? "80%" : "80%"} 
                stringLength={isMobile ? "25vh" : "45vh"} 
                initialRotate={isMobile ? 9 : 3} 
                zIndex={isMobile ? 10 : 40} 
                pivotX="50%" 
                hangingType="strip"
                centered={isMobile}
             >
                 <div className="relative group perspective-1000">
                     
                     {/* The Spacer for Strip (Mobile only - to visualize hanging lower) */}
                     {isMobile && <div className="absolute -top-[15vh] left-1/2 -translate-x-1/2 w-[60px] h-[15vh] bg-[#1a1a1a] z-0"></div>}

                     {/* THE SPLASH (Behind the Card) */}
                     <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 opacity-90 pointer-events-none rotate-m-12 scale-100">
                        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#F97316]">
                           {/* Main Splatter Body */}
                           <path d="M266.3,137.9c-8.8-19.4-38.3-17.7-41.2,3.3c-2,14.6-13.8,24.4-27.1,30.3c-23.7,10.5-54.8,2.7-72.2,21.6
                           c-17.9,19.5-6.5,52.2,6.4,73.6c9.4,15.6,3.6,37.2-11.2,47.7c-9.6,6.8-23.3,7.5-30.8,17.2c-10.7,14-2.5,35.6,12.8,44.1
                           c17.7,9.8,37.6,3.1,56.8,1.2c16.2-1.6,31.7,5.5,41.9,18.3c15.2,19.1,16.6,48.2,39.9,59.3c23.6,11.2,50.8-5.3,74.5-17.2
                           c18.5-9.3,42.4-7.4,59.3,5.3c10.4,7.8,22.8,16.4,36.2,14c18.9-3.4,26.4-24.6,26.5-43.2c0.1-19.1,12.2-36.8,29.3-45.1
                           c18.2-8.8,42.4-12.2,49.2-32.3c6.1-17.9-6.3-36.8-20.8-49.3c-15.6-13.5-17.7-36.2-16.1-56.1c1.3-16.1,10-32.9-0.5-46.7
                           c-10.3-13.6-29.6-14-45-20.9c-15.4-6.9-30-17.3-46.8-18.1C355.7,139.7,313,153.3,266.3,137.9z"/>
                           
                           {/* Scattered Droplets */}
                           <circle cx="150" cy="150" r="6" /> <circle cx="120" cy="200" r="4" /> <circle cx="380" cy="180" r="8" />
                           <circle cx="420" cy="250" r="5" /> <circle cx="360" cy="380" r="6" /> <circle cx="200" cy="420" r="8" />
                           <circle cx="300" cy="450" r="4" /> <circle cx="250" cy="50" r="5" />  <circle cx="150" cy="400" r="3" />
                           
                           {/* Jagged Stray Marks */}
                           <path d="M420,120 c-5,10 -15,5 -10,-5 c5,-10 15,-5 10,5 z" />
                           <path d="M80,280 c5,15 -5,20 -10,10 c-5,-10 5,-15 10,-10 z" />
                        </svg>
                     </div>

                     {/* The Polaroid Frame */}
                     <div className="relative bg-white p-3 pb-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transform transition-transform duration-500 hover:scale-[1.02] w-[240px] md:w-[320px]">
                         {/* Image Area */}
                         <div className="relative aspect-[4/5] bg-zinc-100 overflow-hidden bg-[url('/mine.png')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-700 ease-out border border-zinc-200">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50"></div>
                         </div>
                         {/* Caption */}
                         <div className="absolute bottom-4 left-0 w-full text-center">
                             <p className="font-serif italic text-xl md:text-2xl text-zinc-800 opacity-90" style={{ fontFamily: '"Caveat", cursive, serif' }}>
                                Hey! I&apos;m Yash :)
                             </p>
                         </div>
                         {/* Tape */}
                         <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm shadow-sm rotate-1 border-white/40 border-t border-b"></div>
                     </div>

                     {/* Sticker */}
                     <motion.div 
                        className="absolute top-[60%] -left-6 md:-left-12 z-50 cursor-pointer"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                     >
                         <div className="relative w-20 h-20 md:w-28 md:h-28 bg-black rounded-full flex items-center justify-center border-[3px] border-white shadow-xl">
                             <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
                                 <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                                 <text className="text-[10.5px] font-bold uppercase tracking-widest fill-white">
                                     <textPath href="#circlePath" startOffset="0%">
                                         • Let&apos;s Connect • Get in Touch
                                     </textPath>
                                 </text>
                             </svg>
                         </div>
                     </motion.div>
                 </div>
             </PendulumItem>
         </div>
         
         <div className="absolute bottom-6 md:bottom-12 w-full text-center z-10 flex items-center justify-center gap-3 px-4 flex-wrap">
             <div className="w-3 h-3 rounded-full bg-[#8A3C45] flex-shrink-0"></div>
             <p className="text-zinc-400 font-sans text-sm md:text-lg tracking-wide whitespace-normal">
                 FDE Intern at <strong className="text-white font-bold">Grexa.ai</strong> · Previously Intern at <span className="italic text-white">Bizoally</span>
             </p>
         </div>

    </section>
  );
}
