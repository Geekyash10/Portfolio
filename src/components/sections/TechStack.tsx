"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

// --- Tech Data with Icons ---
// Using exact colorful branding from the reference image style.
// We use a white background for the ball, and the colored icon inside.
// Or colored ball with white icon. Let's aim for the mix in the reference.
// Most in reference are White Ball + Colored Icon. Some (Ps, Ai, Pr) are dark.

const getIcon = (slug: string, color: string) => {
    // Sanitize color: remove # if present
    const safeColor = color.replace("#", "");
    return `https://cdn.simpleicons.org/${slug}/${safeColor}`;
};

const techs = [
  { name: "HTML", slug: "html5", color: "#E34F26", iconColor: "ffffff" },
  { name: "CSS", slug: "css", color: "#1572B6", iconColor: "ffffff" },
  { name: "JavaScript", slug: "javascript", color: "#F7DF1E", iconColor: "000000" },
  { name: "React", slug: "react", color: "#222222", iconColor: "61DAFB" }, // React Blue
  { name: "Redis", slug: "redis", color: "#DC382D", iconColor: "ffffff" },
  { name: "Tailwind", slug: "tailwindcss", color: "#06B6D4", iconColor: "ffffff" },
  { name: "Redux", slug: "redux", color: "#764ABC", iconColor: "ffffff" },
  { name: "MUI", slug: "mui", color: "#007FFF", iconColor: "ffffff" },
  { name: "NodeJS", slug: "nodedotjs", color: "#339933", iconColor: "ffffff" },
  { name: "Express", slug: "express", color: "#000000", iconColor: "ffffff" },
  { name: "Git", slug: "git", color: "#F05032", iconColor: "ffffff" },
  { name: "Postman", slug: "postman", color: "#FF6C37", iconColor: "ffffff" },
  { name: "Docker", slug: "docker", color: "#007ACC", iconColor: "ffffff" },
  { name: "Python", slug: "python", color: "#3776AB", iconColor: "ffffff" },
  { name: "Bash", slug: "gnubash", color: "#4EAA25", iconColor: "ffffff" },
  { name: "GitHub", slug: "github", color: "#181717", iconColor: "ffffff" },
  { name: "MongoDB", slug: "mongodb", color: "#47A248", iconColor: "ffffff" },
  { name: "MySQL", slug: "mysql", color: "#4479A1", iconColor: "ffffff" },
  { name: "Sass", slug: "sass", color: "#CC6699", iconColor: "ffffff" },
];

export default function TechStack() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  
  const [isMounted, setIsMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop' | 'large'>('desktop');

  useEffect(() => {
    setIsMounted(true);
    
    // Determine screen size
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else if (width < 1536) {
        setScreenSize('desktop');
      } else {
        setScreenSize('large');
      }
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Intersection Observer to start animation when in view
  useEffect(() => {
      if (!isMounted || !sceneRef.current) return;

      const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
              setIsInView(true);
              // Disconnect after triggering once suitable for "start falling" effect
              observer.disconnect();
          }
      }, { threshold: 0.2 }); // Trigger when 20% visible

      observer.observe(sceneRef.current);

      return () => observer.disconnect();
  }, [isMounted]);

  useEffect(() => {
    if (!isInView || !isMounted || !sceneRef.current) return;

    // Async function to handle image loading
    const initPhysics = async () => {
    const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Runner = Matter.Runner;

    const engine = Engine.create();
    const world = engine.world;
    engineRef.current = engine;

    const container = sceneRef.current;
    if (!container) return; // Safety check
    
    const getDimensions = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      return { width, height };
    };
    
    let { width, height } = getDimensions();

    const render = Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2), // Cap at 2x for performance
      },
    });
    renderRef.current = render;
    
    // Handle window resize
    const handleResize = () => {
      const newDims = getDimensions();
      if (render.canvas) {
        render.canvas.width = newDims.width;
        render.canvas.height = newDims.height;
        render.options.width = newDims.width;
        render.options.height = newDims.height;
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Preload Images - Wait for all to load before rendering
    const techImages: Record<string, HTMLImageElement> = {};
    const imagePromises = techs.map((t) => {
        return new Promise<{ name: string; img: HTMLImageElement }>((resolve) => {
            const img = new Image();
            // Try with CORS first, fallback without if needed
            img.crossOrigin = 'anonymous';
            
            let resolved = false;
            const timeout = setTimeout(() => {
                if (!resolved) {
                    resolved = true;
                    // Create fallback if timeout
                    createFallback();
                }
            }, 5000); // 5 second timeout
            
            const createFallback = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = t.color;
                    ctx.fillRect(0, 0, 64, 64);
                    ctx.fillStyle = '#fff';
                    ctx.font = 'bold 20px sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(t.name.slice(0, 3), 32, 32);
                }
                const fallbackImg = new Image();
                fallbackImg.onload = () => {
                    if (!resolved) {
                        resolved = true;
                        clearTimeout(timeout);
                        techImages[t.name] = fallbackImg;
                        resolve({ name: t.name, img: fallbackImg });
                    }
                };
                fallbackImg.src = canvas.toDataURL();
            };
            
            img.onload = () => {
                if (!resolved) {
                    resolved = true;
                    clearTimeout(timeout);
                    techImages[t.name] = img;
                    resolve({ name: t.name, img });
                }
            };
            
            img.onerror = () => {
                if (!resolved) {
                    // Try without CORS as fallback
                    const imgNoCors = new Image();
                    imgNoCors.onload = () => {
                        if (!resolved) {
                            resolved = true;
                            clearTimeout(timeout);
                            techImages[t.name] = imgNoCors;
                            resolve({ name: t.name, img: imgNoCors });
                        }
                    };
                    imgNoCors.onerror = () => {
                        if (!resolved) {
                            createFallback();
                        }
                    };
                    imgNoCors.src = getIcon(t.slug, t.iconColor);
                }
            };
            
            img.src = getIcon(t.slug, t.iconColor);
        });
    });
    
    // Wait for all images to load before continuing (with timeout)
    await Promise.allSettled(imagePromises);

    const wallOptions = { 
        isStatic: true, 
        render: { fillStyle: "transparent" },
        restitution: 0.8
    };
    const ground = Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions);
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height * 5, wallOptions);
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height * 5, wallOptions);
    World.add(world, [ground, leftWall, rightWall]);

    // Responsive ball sizes based on screen width
    const getBallSize = () => {
      if (width < 640) {
        // Mobile: 30px - 45px
        return { baseSize: 35, variation: 15 };
      } else if (width < 1024) {
        // Tablet: 45px - 60px
        return { baseSize: 50, variation: 15 };
      } else if (width < 1536) {
        // Desktop: 55px - 75px
        return { baseSize: 60, variation: 20 };
      } else {
        // Large screens: 65px - 85px
        return { baseSize: 70, variation: 20 };
      }
    };
    
    const { baseSize, variation } = getBallSize();
    
    // Create Balls
    const techBodies = techs.map((tech) => {
      const radius = baseSize + (Math.random() * variation); 
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * -1000 - 100;

      const body = Bodies.circle(x, y, radius, {
        restitution: 0.6, // Slightly less bouncy for heavier feel
        friction: 0.05,
        frictionAir: 0.02,
        density: 0.05,
        render: {
           fillStyle: tech.color // Use Brand Color
        }
      });
      
      (body as any).techName = tech.name;
      (body as any).techColor = tech.color;
      (body as any).radius = radius;
      return body;
    });

    World.add(world, techBodies);

    const mouse = Mouse.create(render.canvas);
    // Remove pixel ratio scaling if not using pixelRatio option
    // mouse.pixelRatio = window.devicePixelRatio; 
    
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.1,
        render: { visible: false }
      }
    });
    render.mouse = mouse;
    World.add(world, mouseConstraint);

    Matter.Events.on(render, "afterRender", () => {
        const ctx = render.context;
        
        techBodies.forEach((body) => {
            const { x, y } = body.position;
            const r = (body as any).radius;
            const name = (body as any).techName;
            const color = (body as any).techColor;
            const img = techImages[name];
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(body.angle);
            
            // Draw Circle Background (Brand Color)
            // Soft Shadow
            ctx.shadowColor = "rgba(0,0,0,0.2)";
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 8;
            
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            
            // Inner Highlight (Glossy/Sponge effect)
            ctx.shadowColor = "transparent";
            const gradient = ctx.createRadialGradient(-r/3, -r/3, r/5, 0, 0, r);
            gradient.addColorStop(0, "rgba(255,255,255,0.2)");
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw Icon - Check if image is loaded and ready
            // Responsive font size based on ball radius
            const fontSize = Math.max(10, Math.min(r * 0.25, 18));
            
            if (img) {
                // Wait for image to be fully loaded
                if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
                    const iconSize = r * 1.1; 
                    const offset = iconSize / 2;
                    
                    try {
                        ctx.drawImage(img, -offset, -offset, iconSize, iconSize);
                    } catch (e) {
                        // Fallback to text if image draw fails
                        ctx.fillStyle = "#fff";
                        ctx.font = `bold ${fontSize}px sans-serif`;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(name.slice(0, 3), 0, 0);
                    }
                } else {
                    // Image not ready yet, show text placeholder
                    ctx.fillStyle = "#fff";
                    ctx.font = `bold ${fontSize}px sans-serif`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(name.slice(0, 3), 0, 0);
                }
            } else {
                // No image available, show text
                ctx.fillStyle = "#fff";
                ctx.font = `bold ${fontSize}px sans-serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(name.slice(0, 3), 0, 0);
            }
            
            ctx.restore();
        });
    });

    // 7. Run
    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    return () => {
        window.removeEventListener('resize', handleResize);
        Render.stop(render);
        Runner.stop(runner);
        Matter.Engine.clear(engine);
        World.clear(world, false);
        if (render.canvas && render.canvas.parentNode) {
            render.canvas.remove();
        }
    };
    };

    // Start the async initialization
    initPhysics();

  }, [isMounted, isInView]);

  return (
    <section 
      id="skills" 
      className="relative w-full bg-[#f4f4f5] overflow-hidden flex flex-col items-center justify-center border-t border-zinc-200"
      style={{
        height: screenSize === 'mobile' ? '70vh' : screenSize === 'tablet' ? '75vh' : '80vh',
        minHeight: screenSize === 'mobile' ? '500px' : '600px'
      }}
    >
        
        {/* Header Overlay - Responsive */}
        <div className="absolute top-4 sm:top-6 md:top-10 w-full text-center z-20 pointer-events-none select-none px-4 sm:px-6 md:px-8">
             <p className="text-xs sm:text-sm md:text-base font-bold text-orange-500 uppercase tracking-widest mb-2 sm:mb-3">
               My Tech Stack - [ Click & Drag ]
             </p>
             <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-zinc-900 tracking-tighter font-outfit leading-[1.1] px-2">
                My tools to play around with<br className="hidden sm:block" />
                and create magic!
             </h2>
        </div>

        {/* Physics Canvas - Responsive */}
        <div 
          ref={sceneRef} 
          className="absolute inset-0 z-10 w-full h-full cursor-grab active:cursor-grabbing touch-none"
          style={{
            touchAction: 'none' // Prevent default touch behaviors
          }}
        ></div>
        
    </section>
  );
}
