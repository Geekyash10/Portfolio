import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/smooth-scroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
	title: "Yash Mittal-Portfolio",
	description: "Portfolio of Yash Mittal.",
	icons: {
		icon: "/favicon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${outfit.variable} font-sans antialiased text-white bg-black`}
			>
				<SmoothScroll>{children}</SmoothScroll>
			</body>
		</html>
	);
}
