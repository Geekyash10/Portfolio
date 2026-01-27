"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    let lastPos = { x: 0, y: 0 };
    
    const handleMouseMove = (e: MouseEvent) => {
      lastPos = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePosition(lastPos);
          rafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#111] z-0">
      
      {/* 0. Tactical Map Layer (Left Side) - New Addition */}
      <div 
        className="absolute inset-y-0 left-0 w-[120%] h-[100%]  md:w-[85%] md:h-full z-0 opacity-70 pointer-events-none mix-blend-screen"
        style={{
            // Dark Satellite/Terrain Map
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(100%) contrast(1.5) brightness(0.7) drop-shadow(1px 1px 0px rgba(255,255,255,0.2))',
            // Blocky/Pixelated Edge Mask (Extended to Top)
            clipPath: "polygon(0 0, 30% 0, 30% 5%, 45% 5%, 45% 0, 70% 0, 70% 8%, 85% 8%, 85% 15%, 75% 15%, 75% 25%, 80% 25%, 80% 35%, 70% 35%, 70% 45%, 75% 45%, 75% 55%, 65% 55%, 65% 65%, 70% 65%, 70% 75%, 60% 75%, 60% 85%, 65% 85%, 65% 95%, 60% 95%, 60% 100%, 0 100%)"
        }}
      >
          {/* Internal Grid within the map for extra texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          {/* Hotspot Marker (Red Dot) */}
          <div className="absolute top-[40%] right-[30%] w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
          <div className="absolute top-[40%] right-[30%] w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
      </div>

      {/* 1. Technical Grid Overlay - INCREASED VISIBILITY */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
            backgroundImage: `linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)`,
            backgroundSize: '150px 150px',
            maskImage: 'radial-gradient(circle at 50% 50%, black 60%, transparent 95%)'
        }}
      ></div>


      {/* 2. Frosted Glass Grid Cells (Scattered Highlights) */}
      {[
        { t: 1, l: 1 },
        { t: 3, l: 6 },
        { t: 5, l: 2 },
        { t: 1, l: 8 },
        { t: 4, l: 9 },
        { t: 6, l: 4 },
      ].map((pos, i) => (
          <div 
            key={i}
            className="absolute z-0 pointer-events-none"
            style={{
                top: `${pos.t * 150}px`,
                left: `${pos.l * 150}px`,
                width: '150px', // Match grid size
                height: '150px', // Match grid size
                backgroundColor: 'rgba(255, 255, 255, 0.15)', // More opaque
                backdropFilter: 'blur(10px)', // Stronger blur
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
      ))}

      {/* 3. Extra Frosted Cells (Blur Only - No Shatter) */}
      {[
        { t: 0, l: 3 },
        { t: 4, l: 1 },
        { t: 2, l: 7 },
      ].map((pos, i) => (
          <div 
            key={`extra-blur-${i}`}
            className="absolute z-0 pointer-events-none"
            style={{
                top: `${pos.t * 150}px`,
                left: `${pos.l * 150}px`,
                width: '150px', 
                height: '150px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
      ))}

      {/* 3. Noise Texture - Inline SVG for better performance */}
      <div 
        className="absolute inset-0 opacity-30 brightness-125 contrast-200 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }}
      ></div>
      
    </div>
  );
}
