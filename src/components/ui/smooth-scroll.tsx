"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		// Optimized Lenis configuration for better performance
		const lenis = new Lenis({
			duration: 1.0, // Slightly faster for better responsiveness
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			wheelMultiplier: 0.8, // Reduced for smoother feel
			touchMultiplier: 1.5,
		});

		let rafId: number;
		function raf(time: number) {
			lenis.raf(time);
			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		// Optimized anchor link handler with passive listener
		const handleAnchorClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const anchor = target.closest("a");

			if (anchor && anchor.href.includes("#")) {
				const href = anchor.getAttribute("href");
				if (href && href.startsWith("#")) {
					e.preventDefault();
					const element = document.querySelector(href) as HTMLElement;
					if (element) {
						lenis.scrollTo(element, {
							offset: 0,
							duration: 1.2, // Slightly faster
						});
					}
				}
			}
		};

		document.addEventListener("click", handleAnchorClick, { passive: false });

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
			document.removeEventListener("click", handleAnchorClick);
		};
	}, []);

	return <>{children}</>;
}
