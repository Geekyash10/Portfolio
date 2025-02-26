import { Fade } from "react-awesome-reveal";
import { SectionWrapper } from "../hoc";

const skills = [
	{
		name: "HTML",
		icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
	},
	{
		name: "CSS",
		icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
	},
	{
		name: "Javascript",
		icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
	},
	{
		name: "React",
		icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
	},

	{
		name: "Redis",
		icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original-wordmark.svg",
	},
	{
		name: "Tailwind",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
	},
	{
		name: "Redux",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
	},
	{ name: "Material ", icon: "https://mui.com/static/logo.png" },

	{
		name: "NodeJS",
		icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
	},
	{
		name: "Express",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
	},

	{
		name: "Git",
		icon: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
	},
	{
		name: "Postman",
		icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
	},
	{
		name: "VS Code",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
	},
	{
		name: "Python",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
	},
	{
		name: "Bash",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
	},
	{
		name: "Github",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
	},
	{
		name: "MongoDb",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
	},
	{
		name: "MySql",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
	},
	{
		name: "Sass",
		icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
	},
];

const Tech = () => {
	return (
		<section id="skills" className="px-4 py-10 sm:px-10 md:px-16">
			<div className="mx-auto px-4">
				<div className="flex flex-wrap justify-center items-center sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
					<Fade
						direction="right"
						big
						triggerOnce
						cascade
						damping={0.1}
					>
						{skills.map((skill) => (
							<div
								key={skill.name}
								className="group flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow transition-transform duration-300 hover:scale-110"
								style={{ width: "120px", height: "120px" }}
							>
								<img
									src={skill.icon}
									alt={skill.name}
									width={40}
									height={40}
									className="object-contain"
								/>
								<span className="mt-2 text-sm text-black text-center">
									{skill.name}
								</span>
							</div>
						))}
					</Fade>
				</div>
			</div>
		</section>
	);
};

export default SectionWrapper(Tech, "skills");
