import React, { useEffect } from "react";
import { projects } from "../constants";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { github, live_version } from "../assets";
import { SectionWrapper } from "../hoc";
import StarsCanvas from "./canvas/Stars"; // Import StarsCanvas
import "./Works.css";
import { styles } from "../styles";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const ProjectCard = ({
	index,
	name,
	description,
	tags,
	image,
	source_code_link,
	live_version_link,
}) => {
	return (
		<div className="relative flex flex-col items-center gap-8 w-full timeline-card border border-gray-300 rounded-lg p-4">
			{/* Photo Section */}
			<motion.div
				variants={fadeIn("up", "spring", index * 0.5, 0.75)}
				className="relative z-10 w-full timeline-photo-section"
			>
				<div className="relative w-full h-[200px]">
					<img
						src={image}
						alt="project_image"
						className="w-full h-full object-contain rounded-2xl"
					/>
					<div className="absolute inset-0 flex justify-end m-3 card-img_hover works-cards">
						{live_version_link && (
							<div
								onClick={() =>
									window.open(live_version_link, "_blank")
								}
								className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
							>
								<img
									src={live_version}
									alt="live version"
									className="w-1/2 h-1/2 object-contain"
								/>
							</div>
						)}
						{source_code_link && (
							<div
								onClick={() =>
									window.open(source_code_link, "_blank")
								}
								className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
							>
								<img
									src={github}
									alt="source code"
									className="w-1/2 h-1/2 object-contain"
								/>
							</div>
						)}
					</div>
				</div>
			</motion.div>

			{/* Content Section */}
			<motion.div
				variants={fadeIn("up", "spring", index * 0.5, 0.75)}
				className="w-full flex flex-col gap-4 z-10 timeline-content-section"
			>
				<h3 className="text-white text-center font-bold text-[24px]">
					{name}
				</h3>
				<p className="mt-2 text-secondary text-[14px]">{description}</p>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<p
							key={`${name}-${tag.name}`}
							className={`text-[14px] ${tag.color}`}
						>
							#{tag.name}
						</p>
					))}
				</div>
			</motion.div>
		</div>
	);
};

const AllProjects = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div className="flex-shrink-0 p-4">
				<Link
					to="/"
					className="flex items-center gap-2"
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					<img className="h-8 w-10" src={logo} alt="Workflow" />
					<p className="text-white text-[18px] font-bold cursor-pointer flex">
						Yash Mittal &nbsp;
						<span className="lg:block hidden">
							{" "}
							| MERN Stack Web Developer
						</span>
					</p>
				</Link>
			</div>
			<div className="relative z-0 bg-primary">
				<div className="bg-cover bg-no-repeat bg-center min-h-screen">
					<div className="container mx-auto p-4">
						<motion.div id="projects" variants={textVariant()}>
							<p className={`${styles.sectionSubText} `}>
								My work
							</p>
							<h2 className={`${styles.sectionHeadText}`}>
								Projects.
							</h2>
						</motion.div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{projects.map((project, index) => (
								<ProjectCard
									key={`project-${index}`}
									index={index}
									{...project}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SectionWrapper(AllProjects, "projects");
