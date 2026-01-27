"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Intro() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={container} className="min-h-[60vh] flex items-center justify-center bg-black relative px-6 py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p 
          className="text-3xl md:text-5xl lg:text-6xl font-medium leading-tight text-white mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          I build <span className="text-zinc-500">systems that scale</span>,<br />
          interfaces that <span className="italic font-serif text-white">feel alive</span>,<br />
          and products that solve <span className="bg-white text-black px-2 mt-2 inline-block -rotate-1 transform">real problems</span>.
        </motion.p>
      </div>
      
      {/* Floating Fragments */}
      <motion.div style={{ y }} className="absolute top-10 right-[5%] w-24 h-24 md:w-32 md:h-32 bg-zinc-900/40 border border-zinc-800 rounded-xl backdrop-blur-sm -z-0 rotate-12 flex items-center justify-center">
        <div className="text-zinc-700 font-mono text-xs">{'<Component />'}</div>
      </motion.div>
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }} className="absolute bottom-10 left-[5%] w-32 h-16 md:w-48 md:h-24 bg-zinc-900/40 border border-zinc-800 rounded-xl backdrop-blur-sm -z-0 -rotate-6 flex items-center justify-center">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
         </div>
      </motion.div>
    </section>
  );
}
