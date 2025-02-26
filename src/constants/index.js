import { color } from "framer-motion";
import {
	backend,
	web,
	GeekClash,
	bizoally,
	DulitFest,
	Sportzpod,
	geekClash,
	dulitfestphoto,
	coadeaz,
	sports,
	secure,
	Jscop,
	mobile,
	News_Navigator,
	Aimessage,
	BolHind,
	multiparser,
	publictransport,
} from "../assets";

export const navLinks = [
	{
		id: "about",
		title: "About",
	},
	{
		id: "work",
		title: "Work",
	},
	{
		id: "skills",
		title: "Technologies",
	},
	{
		id: "projects",
		title: "Projects",
	},
	{
		id: "contact",
		title: "Contact",
	},
];

const services = [
	{
		title: "Backend Developer",
		icon: backend,
		description:
			"I am passionate about writing clean and efficient code to create scalable and secure web applications that deliver exceptional performance and user experiences.",
	},
	{
		title: "MERN Stack Developer",
		icon: web,
		description:
			"I thrive on building robust web applications using the MongoDB, Express.js, React, and Node.js , employing my skills  to deliver scalable and efficient solutions.",
	},
	{
		title: "Frontend Developer",
		icon: mobile,
		description:
			"As a frontend developer, I excel at creating engaging  user interfaces, combining aesthetics with functionality to deliver seamless web experiences.",
	},
];

const experiences = [
	{
		title: "Frontend Web Developer Intern",
		company_name: "Bizoally - Remote",
		icon: bizoally, // Ensure you have the correct icon imported
		iconBg: "#ffff",
		date: "June 2024 - July 2024",
		points: [
			"Developed dynamic web applications using ReactJS, ensuring clean and efficient code and backend integration.",
			"Implemented SEO strategies using React Helmet to improve search engine visibility.",
			"Collaborated with the team to implement new features, ensure responsive design, and validate user inputs for enhanced user experience.",
		],
	},
	{
		title: "Freelance Web Developer",
		company_name: "Geek Clash",
		icon: GeekClash, // Ensure you have the correct icon imported
		iconBg: "#071b43",
		date: "May 2024 - June 2024",
		points: [
			"Developed the frontend for Geek Clash, a platform offering quizzes with a leaderboard and rewards, designed to engage users in hackathons and events.",
			"Implemented user-friendly features for tracking quiz performance and boosting engagement, attracting 555 visits and 250 unique visitors.",
		],
	},
	{
		title: "Freelance Web Developer",
		company_name: "DU LIT FEST",
		icon: DulitFest, // Ensure you have the correct icon imported
		iconBg: "#ffd300",
		date: "January 2024", // Adjust date as necessary
		points: [
			"Contributed significantly to the success of the Delhi University Literature Fest 2024 by managing backend operations for handling data of 10,000 registrations.",
			"Created web pages and ensured efficient data presentation in Excel sheets, demonstrating effective coordination and technical expertise.",
		],
	},
	{
		title: "Full Stack Developer (Freelance)",
		company_name: "Sportzod Organization",
		icon: Sportzpod, // Ensure you have the correct icon imported
		iconBg: "#ffd300",
		date: "August 2021 - Present",
		points: [
			"Led backend development initiatives, implementing secure authentication and efficient data fetching.",
			"Developed dynamic blog functionality with social integration and scalable infrastructure.",
		],
	},
];

const projects = [
	{
		name: "GeekClash",
		description:
			"A platform for hosting quizzes with leaderboards and rewards, designed to engage users in hackathons and events. The website tracks quiz performance and enhances engagement, attracting over 555 visits and 250 unique visitors.",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "mongodb",
				color: "text-green-600",
			},
			{
				name: "tailwindCss",
				color: "pink-text-gradient",
			},
			{
				name: "framermotion",
				color: "text-purple-500",
			},

			{
				name: "toastifyjs",
				color: "text-blue-600",
			},
			{
				name: "express",
				color: "text-purple-500",
			},
			{
				name: "nodejs",
				color: "text-green-500",
			},
		],
		image: geekClash,
		live_version_link: "https://quizcraft-frontend-domr.onrender.com/",
		source_code_link: "https://github.com/Geekyash10/QuizCraft",
	},
	{
		name: "DulitFest",
		description:
			"The official website for Delhi University's Literature Fest 2024, featuring backend operations for managing 10,000 registrations and seamless data processing for organizers. Includes dynamic web pages designed for an enhanced user experience.",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "google excel sheet api",
				color: "text-green-600",
			},
			{
				name: "tailwind",
				color: "pink-text-gradient",
			},
			{
				name: "javascript",
				color: "text-yellow-500",
			},
			{
				name: "framermotion",
				color: "text-purple-500",
			},

			{
				name: "toastifyjs",
				color: "text-blue-600",
			},
		],
		image: dulitfestphoto,
		live_version_link: "https://dulitfest.netlify.app/",
		source_code_link: "https://github.com/HarshSharma20503/DuLitFest",
	},
	{
		name: "Codeaz",
		description:
			"A competitive programming analytics platform integrating data from LeetCode, Codeforces, and CodeChef. Provides secure authentication using JWT and Google OAuth, with a focus on user privacy and data aggregation.",
		tags: [
			{
				name: "html5",
				color: "blue-text-gradient",
			},
			{
				name: "mongodb",
				color: "text-green-600",
			},
			{
				name: "express",
				color: "text-purple-500",
			},
			{
				name: "nodejs",
				color: "text-green-500",
			},
			{
				name: "javascript",
				color: "text-yellow-500",
			},
			{
				name: "restapi",
				color: "green-text-gradient",
			},
			{
				name: "css3",
				color: "text-pink-500",
			},
			{
				name: "mysql",
				color: "text-purple-600",
			},
			{
				name: "toastifyjs",
				color: "text-blue-600",
			},
			{
				name: "Sass",
				color: "text-blue-500",
			},
			{
				name: "github actions",
				color: "green-text-gradient",
			},
		],
		image: coadeaz,
		live_version_link: "https://codaez.onrender.com/",
		source_code_link: "https://github.com/vanshulagarwal/Codaez",
	},
	{
		name: "Sportzpod",
		description:
			"A dynamic platform for sports enthusiasts, offering live scores, blog posts, and live chat features. The site integrates sports data in real-time, allowing users to follow ongoing matches, read insightful blogs, and interact with other fans through live chat. Built with React for a seamless user experience and secure backend APIs.",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "restApi",
				color: "green-text-gradient",
			},
			{
				name: "css",
				color: "pink-text-gradient",
			},
			{
				name: "redis",
				color: "text-blue-600",
			},
			{
				name: "react-hooks",
				color: "text-purple-600",
			},
			{
				name: "axios",
				color: "text-gray-400",
			},
			{
				name: "javascript",
				color: "text-yellow-500",
			},
			{
				name: "socket.io",
				color: "text-green-500",
			},
			{
				name: "mongodb",
				color: "text-orange-500",
			},
			{
				name: "express",
				color: "text-blue-600",
			},
			{
				name: "nodejs",
				color: "text-yellow-500",
			},
		],
		image: sports,
		live_version_link: "https://www.sportzpod.com/",
		source_code_link: "https://github.com/sportzpod-org/sportzpod-backend",
	},
	{
		name: "Secure ticket Generation",
		description:
			"A system deployed at JIIT Optica’s JSCoP event, designed for generating and validating tickets efficiently. Features include secure QR code generation and OTP-based validation, ensuring robust ticketing for approximately 100 users.",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "tailwind",
				color: "pink-text-gradient",
			},
			{
				name: "Sass",
				color: "text-blue-500",
			},
			{
				name: "framermotion",
				color: "text-purple-500",
			},
			{
				name: "mongodb",
				color: "text-green-600",
			},
			{
				name: "react-toastify",
				color: "text-blue-600",
			},
			{
				name: "nodejs",
				color: "text-green-500",
			},
			{
				name: "express",
				color: "text-red-500",
			},
			{
				name: "jwt",
				color: "text-blue-500",
			},
			{
				name: "qr-code",
				color: "text-yellow-500",
			},
		],
		image: secure,
		live_version_link: "https://secure-ticket-gen.vercel.app/",
		source_code_link: "https://github.com/Geekyash10/SecureTicketGen",
	},
	{
		name: "Jscop 6.O",
		description:
			"JSCOP 6.0 is the flagship event for the JIIT Optica Chapter, designed to manage registrations and showcase the various events during the two-day festival. The website provides seamless registration for participants and gives a detailed overview of the events, making it easier for attendees to navigate and participate",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},

			{
				name: "tailwind",
				color: "pink-text-gradient",
			},
			{
				name: "Sass",
				color: "text-blue-500",
			},
			{
				name: "framermotion",
				color: "text-purple-500",
			},
			{
				name: "particlejs",
				color: "text-yellow-500",
			},
			{
				name: "mongodb",
				color: "text-green-600",
			},
			{
				name: "toastifyjs",
				color: "text-blue-600",
			},
		],
		image: Jscop,
		live_version_link: "https://jscop.jiitopticachapter.com/",
		source_code_link:
			"https://github.com/jiitopticachapter/JSCOP-6.0-Website",
	},
	{
		name: "News Navigator",
		description:
			"News Navigator is a React Native application designed to help users verify the authenticity of news articles and categorize them into relevant topics. Users can input either the URL or the description of a news article, and the app will classify it as real or fake. Additionally, users can bookmark or share articles for future reference.",
		tags: [
			{
				name: "tailwind",
				color: "pink-text-gradient",
			},

			{
				name: "mongodb",
				color: "text-green-600",
			},
			{
				name: "nodejs",
				color: "text-green-500",
			},
			{
				name: "python3",
				color: "text-green-500",
			},
			{
				name: "expressjs",
				color: "text-red-500",
			},
			{
				name: "flask",
				color: "text-gray-500",
			},
			{
				name: "logistic-regression",
				color: "text-orange-500",
			},
			{
				name: "reactnative",
				color: "text-purple-700",
			},
			{
				name: "multinomial-naive-bayes",
				color: "text-yellow-700",
			},
			{
				name: "juypter-notebook",
				color: "text-pink-700",
			},
		],
		image: News_Navigator,
		// live_version_link: "https://jscop.jiitopticachapter.com/",
		source_code_link: "https://github.com/Geekyash10/NewsNavigator",
	},
	{
		name: "Bol Hind",
		description:
			"A Chrome extension that enables hands-free browsing using natural voice commands in Indian languages. Powered by AI4Bharat's translation models and Google's Gemini for command interpretation.",
		tags: [
			{
				name: "tailwind",
				color: "pink-text-gradient",
			},
			{
				name: "python3",
				color: "text-green-500",
			},
			{
				name: "expressjs",
				color: "text-red-500",
			},
			{
				name: "flask",
				color: "text-gray-500",
			},
			{
				name: "AI4Bharat models",
				color: "text-blue-500",
			},
			{
				name: "Google Gemini",
				color: "text-yellow-700",
			},
			{
				name: "chrome-extension",
				color: "text-pink-700",
			},
			{
				name: "speech-recognition",
				color: "text-orange-500",
			},
			{
				name: "web-speech-api",
				color: "text-green-500",
			},
			{
				name: "google-translate-api",
				color: "text-blue-500",
			},
		],
		image: BolHind,
		live_version_link: "https://youtu.be/AJ2UfciH0CQ",
		source_code_link: "https://github.com/Geekyash10/Bol-Hind",
	},
	{
		name: "AI-Message-Assistant",
		description:
			"Chrome extension streamlining professional communication: Generate personalized referral requests for LinkedIn and internship applications via Gmail with a single click. Upload your resume once to create tailored messages, save previous messages for reuse.",
		tags: [
			{
				name: "tailwind",
				color: "pink-text-gradient",
			},
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "nodejs",
				color: "text-green-500",
			},
			{
				name: "expressjs",
				color: "text-red-500",
			},
			{
				name: "chrome-extension",
				color: "text-blue-500",
			},
			{
				name: "AI",
				color: "text-green-500",
			},
			{
				name: "google-gemini",
				color: "text-yellow-500",
			},
			{
				name: "chrome-local-storage",
				color: "text-blue-500",
			},
		],
		image: Aimessage,
		live_version_link:
			"https://www.loom.com/share/8f7c5f58b13941f7b0b7a820888c93b6?t=129&sid=a55828a4-ce2a-47e7-a4c3-3973fbe226e1",
		source_code_link: "https://github.com/Geekyash10/AI-Message-Assistant",
	},
	{
		name: "Multiparser Package",
		description:
			"A powerful npm package for parsing text from PowerPoint, PDF, and Word documents. This tool seamlessly extracts text, making it easier to analyze, process, and integrate with your applications.",
		tags: [
			{
				name: "npm-package",
				color: "text-blue-500",
			},
			{
				name: "python3",
				color: "text-green-500",
			},
			{
				name: "pdf-parser",
				color: "text-blue-500",
			},
			{
				name: "ppt-parser",
				color: "text-yellow-500",
			},
			{
				name: "wordDocx-parser",
				color: "text-blue-500",
			},
			{
				name: "text-extraction",
				color: "text-green-500",
			},
			{
				name: "gemini",
				color: "text-yellow-500",
			},
		],
		image: multiparser,
		live_version_link:
			"https://www.npmjs.com/package/@xoxoharsh/multiparser",
		source_code_link: "https://github.com/Geekyash10/Multiparser-Package",
	},
	{
		name: "Public transpotation System",
		description:
			"This project is a C++ implementation of a city Public transpotation System. It models a city as a graph where nodes represent locations and edges represent paths with weighted attributes: distance, traffic, and red lights.",
		tags: [
			{
				name: "c++",
				color: "text-blue-500",
			},
			{
				name: "graph",
				color: "text-green-500",
			},
			{
				name: "dijkstra-algorithm",
				color: "text-gray-500",
			},
			{
				name: "shortest-path",
				color: "text-yellow-500",
			},
		],
		image: publictransport,
		// live_version_link: "https://jscop.jiitopticachapter.com/",
		source_code_link:
			"https://github.com/Geekyash10/Public_Transportation_System",
	},
];

export { services, experiences, projects };
