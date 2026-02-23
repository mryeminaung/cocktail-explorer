"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import { ArrowUp } from "lucide-react";
import React from "react";

export default function AppLayout({
	className = "",
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	const [showScrollTop, setShowScrollTop] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 500);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className="relative flex min-h-screen w-full flex-col bg-background">
			<div className="pointer-events-none z-999 fixed inset-y-0 left-1/2 w-full max-w-7xl -translate-x-1/2 border-x border-primary border-dashed" />

			{showScrollTop && (
				<div
					onClick={handleScrollTop}
					className="fixed bottom-10 right-5 z-999 cursor-pointer rounded-full bg-primary p-3 text-white animate-bounce transition-all">
					<ArrowUp size={20} />
				</div>
			)}

			<Navbar />

			<main
				className={cn(
					"relative z-10 mx-auto flex-1 w-full max-w-7xl my-10 px-5",
					className,
				)}>
				{children}
			</main>
			<footer className="relative z-10 w-full border-t border-dashed border-primary h-16">
				<div className="mx-auto sticky top-5 w-full border max-w-7xl">
					<Footer />
				</div>
			</footer>
		</div>
	);
}
