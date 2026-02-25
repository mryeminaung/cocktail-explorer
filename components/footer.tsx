import { Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="w-full h-16 mx-auto max-w-7xl">
			<div className=" flex h-full items-center justify-between px-5">
				{/* Copyright Text */}
				<p className="text-sm text-muted-foreground">
					&copy; {currentYear}, Made with ❤️ by
					<Link
						href="https://github.com/mryeminaung"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-foreground transition-colors duration-200 ml-2 font-bold hover:underline">
						<span>Ye Min Aung</span>
					</Link>
				</p>

				{/* GitHub Link */}
				<Link
					href="https://github.com/mryeminaung/cocktail-explorer"
					target="_blank"
					rel="noopener noreferrer"
					className="text-muted-foreground hover:text-foreground transition-colors duration-200">
					<Github className="h-5 w-5" />
					<span className="sr-only">GitHub</span>
				</Link>
			</div>
		</footer>
	);
}
