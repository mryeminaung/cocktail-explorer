import AppLayout from "@/layouts/app-layout";
import { Home } from "lucide-react"; // If you're using Lucide icons
import Link from "next/link";

export default function NotFound() {
	return (
		<AppLayout>
			<div className="flex flex-col items-center justify-center min-vh-100 px-6 py-24 text-center">
				{/* Subtle background glow/effect to match Liquid Index style */}
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[150px] pointer-events-none" />

				<h1 className="text-8xl font-black text-primary tracking-tighter mb-4">
					404
				</h1>

				<p className="text-muted-foreground max-w-md mb-10">
					The index entry you're looking for has been moved, archived, or never
					existed in this website.
				</p>

				<Link
					href="/"
					className="flex items-center justify-center gap-2 px-5 text-sm py-2 bg-primary text-white rounded-full  transition-all transform ">
					<Home size={18} />
					Back to Home
				</Link>
			</div>
		</AppLayout>
	);
}
