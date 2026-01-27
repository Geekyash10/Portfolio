"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const menuItems = [
	{ name: "About Me", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Experience", href: "#experience" },
	{ name: "Projects", href: "#work" },
	{
		name: "Resume",
		href: process.env.NEXT_PUBLIC_RESUME || "/resume.pdf",
		isExternal: true,
	},
];

export default function MobileSidebar() {
	const [isOpen, setIsOpen] = useState(false);

	// Lock body scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [isOpen]);

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<>
			{/* 1. Aesthetic Floating Trigger Button */}
			<motion.button
				onClick={toggleMenu}
				className="fixed top-6 right-6 z-[100] md:hidden w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col gap-[6px] items-center justify-center text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/20 transition-all mix-blend-difference group"
				whileTap={{ scale: 0.9 }}
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5, type: "spring" }}
			>
				<motion.div
					animate={
						isOpen
							? { rotate: 45, y: 8, width: "28px" }
							: { rotate: 0, y: 0, width: "28px" }
					}
					className="h-[2px] bg-white rounded-full origin-center transition-all duration-300 md:group-hover:w-[28px]"
				/>
				<motion.div
					animate={
						isOpen
							? { opacity: 0, width: "28px" }
							: { opacity: 1, width: "20px" }
					}
					className="h-[2px] bg-white rounded-full transition-all duration-300 md:group-hover:w-[28px]"
				/>
				<motion.div
					animate={
						isOpen
							? { rotate: -45, y: -8, width: "28px" }
							: { rotate: 0, y: 0, width: "12px" }
					}
					className="h-[2px] bg-white rounded-full origin-center transition-all duration-300 md:group-hover:w-[28px]"
				/>
			</motion.button>

			{/* 2. The Sidebar Drawer */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={toggleMenu}
							className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
						/>

						{/* Drawer Panel */}
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{
								type: "spring",
								damping: 30,
								stiffness: 300,
							}}
							className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-[#0a0a0a] border-l border-white/10 shadow-2xl p-8 flex flex-col justify-center h-full md:hidden"
						>
							{/* Background Texture - Inline SVG */}
							<div 
                                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                    backgroundSize: '100px 100px'
                                }}
                            ></div>

							{/* Navigation Links */}
							<nav className="relative z-10 flex flex-col gap-8">
								{menuItems.map((item, i) => (
									<motion.div
										key={item.name}
										initial={{ x: 50, opacity: 0 }}
										animate={{ x: 0, opacity: 1 }}
										exit={{ x: 50, opacity: 0 }}
										transition={{
											delay: 0.1 + i * 0.1,
											duration: 0.4,
											ease: "easeOut",
										}}
									>
										<Link
											href={item.href}
											onClick={toggleMenu}
											target={
												item.isExternal
													? "_blank"
													: undefined
											}
											rel={
												item.isExternal
													? "noopener noreferrer"
													: undefined
											}
											className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 hover:to-white transition-all font-outfit tracking-tight block"
										>
											{item.name}
										</Link>
										<div className="h-[1px] w-full bg-white/5 mt-4" />
									</motion.div>
								))}
							</nav>

							{/* Footer Info */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 }}
								className="absolute bottom-10 left-8 text-zinc-500 text-sm font-mono"
							>
								<p>© 2026 Yash Mittal</p>
								<p className="text-xs mt-1">
									Designed with love.
								</p>
							</motion.div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
