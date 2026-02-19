import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";
import React from "react";

export default function AppLayout({
	className = "",
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	return (
		<div className={cn("max-w-7xl mx-auto px-5", className)}>
			<Navbar />
			<main className="my-10 px-6">{children}</main>
		</div>
	);
}
