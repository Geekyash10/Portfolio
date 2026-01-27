"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "GeekClash",
    category: "Competitive Code",
    desc: "Real-time coding battle arena with live leaderboards and execution engine.",
    year: "2024",
    liveLink: "https://quizcraft-frontend-domr.onrender.com/",
    repoLink: "https://github.com/Geekyash10/QuizCraft",
    img: "https://yashmittal10.vercel.app/assets/geekClash-223f50ca.png"
  },
  {
    title: "DU Lit Fest",
    category: "Event Tech",
    desc: "Scalable ticketing system handling 10k+ users with QR validation.",
    year: "2024",
    liveLink: "https://dulitfest.netlify.app/",
    repoLink: "https://github.com/HarshSharma20503/DuLitFest",
    img: "https://yashmittal10.vercel.app/assets/workdulitfest-770e3af7.png"
  },
  {
    title: "Codeaz",
    category: "Dev Extension",
    desc: "VS Code extension for real-time snippet sharing and team collaboration.",
    year: "2024",
    liveLink: "https://codaez.onrender.com/",
    repoLink: "https://github.com/vanshulagarwal/Codaez",
    img: "https://yashmittal10.vercel.app/assets/coadeaz-22f960f2.png"
  },
   {
    title: "Sportzod",
    category: "Management SaaS",
    desc: "Comprehensive ecosystem connecting players, venues, and organizers.",
    year: "2023",
    liveLink: "https://www.sportzpod.com/",
    repoLink: "https://github.com/sportzpod-org/sportzpod-backend",
    img: "https://yashmittal10.vercel.app/assets/sports-50e8fe8a.png"
  }
];

export default function Projects() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
             setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Desktop: -72% (perfectly calibrated)
    // Mobile: -87% (needs more travel to reach the end card)
    const x = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-80%" : "-72%"]); 
    
    // Intro Title Fades Out
    const introOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    
    // Header Card Fades Out
    const headerScale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);

    return (
        <section ref={targetRef} id="work" className="relative h-[150vh] md:h-[250vh] bg-neutral-950">
            
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-500 opacity-20 blur-[100px]"></div>
                <div className="absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500 opacity-10 blur-[100px]"></div>
                
                {/* Moving Watermark Marquee - Multi-Strip */}
                <div className="absolute inset-0 flex flex-col justify-between py-20 overflow-hidden pointer-events-none opacity-[0.03]">
                    {[...Array(8)].map((_, row) => (
                        <motion.div 
                            key={row}
                            className="flex whitespace-nowrap"
                            animate={{ x: row % 2 === 0 ? [0, -1500] : [-1500, 0] }}
                            transition={{ 
                                repeat: Infinity, 
                                ease: "linear", 
                                duration: 40 + row * 5 // Varied speeds
                            }}
                        >
                            {[...Array(8)].map((_, i) => (
                                <span key={i} className="text-[12vw] font-black font-outfit text-white mr-12 leading-none">
                                    SELECTED WORKS
                                </span>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden z-10 w-full">

                {/* Animated Track */}
                <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-16 md:px-24">
                    
                    {/* Header Card */}
                    <div className="flex-shrink-0 w-[85vw] md:w-[40vw] h-[70vh] flex flex-col justify-center">
                         <motion.h2 
                            style={{ scale: headerScale }}
                            className="text-6xl md:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8"
                         >
                            PROJECT<br/>
                            <span className="text-orange-500">ARCHIVE</span><br/>
                         </motion.h2>
                         <div className="flex gap-4 items-center">
                            <span className="w-12 h-px bg-white/20"></span>
                            <span className="text-white/40 font-mono text-sm tracking-widest uppercase">Scroll Down to explore</span>
                         </div>
                    </div>

                    {/* Project Cards - Unified Component */}
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} />
                    ))}

                     {/* End Card */}
                     <div className="flex-shrink-0 w-[85vw] md:w-[40vw] h-[70vh] flex items-center justify-center">
                         <div className="text-center">
                            <h3 className="text-3xl md:text-4xl text-white font-bold mb-4">Want to see more?</h3>
                            <Link href="https://github.com/Geekyash10" target="_blank" className="inline-block px-8 py-4 bg-orange-500 text-black font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300 rounded-xl md:rounded-none">
                               View All Projects
                            </Link>
                         </div>
                     </div>

                </motion.div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    return (
        <div className="group relative w-[85vw] md:w-[60vw] h-[65vh] md:h-[70vh] flex-shrink-0 bg-neutral-900 border border-white/5 overflow-hidden transition-colors duration-500 hover:border-orange-500/50 rounded-3xl md:rounded-none">
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <Image 
                    src={project.img} 
                    alt={project.title} 
                    fill 
                    className="object-cover opacity-60 md:opacity-60 transition-transform duration-700 md:group-hover:scale-110 md:group-hover:opacity-40 grayscale md:grayscale md:group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                {/* On mobile: No translate. On Desktop: Translate effect */}
                <div className="transform transition-transform duration-500 md:translate-y-8 md:group-hover:translate-y-0">
                    <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 border border-white/20 rounded-full text-[10px] md:text-xs font-mono text-white/70 uppercase tracking-widest backdrop-blur-md">
                            {project.category}
                        </span>
                        <span className="text-4xl md:text-6xl font-black text-white/5 font-outfit">{`0${index + 1}`}</span>
                    </div>
                    
                    <h3 className="text-4xl md:text-7xl font-bold text-white mb-4 leading-none tracking-tight">{project.title}</h3>
                    
                    {/* Content visible by default on mobile, hover on desktop */}
                    <div className="h-auto md:h-0 overflow-hidden md:group-hover:h-auto transition-all duration-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 pb-2">
                        <p className="text-sm md:text-lg text-white/60 max-w-xl mb-6 md:mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                            {project.desc}
                        </p>
                        
                        <div className="flex items-center gap-3 md:gap-4">
                            <Link href={project.liveLink} className="flex-1 md:flex-none px-4 md:px-6 py-3 bg-white text-black font-bold uppercase tracking-wider text-xs md:text-sm text-center hover:bg-orange-500 transition-colors rounded-lg md:rounded-none flex items-center justify-center gap-2">
                                Live Demo <ExternalLink className="w-4 h-4" />
                            </Link>
                            <Link href={project.repoLink} className="flex-1 md:flex-none px-4 md:px-6 py-3 border border-white/20 text-white font-bold uppercase tracking-wider text-xs md:text-sm text-center hover:bg-white/10 transition-colors backdrop-blur-sm rounded-lg md:rounded-none flex items-center justify-center gap-2">
                                Github <Github className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
