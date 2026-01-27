import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import Achievements from "@/components/sections/Achievements";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";

export default function Home() {
	return (
		<main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
			<Navbar />
			<Hero />
			<About />
			<TechStack />
			<Achievements />
			<Experience />
			<Projects />
			<Contact />
		</main>
	);
}
