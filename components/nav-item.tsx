"use client";

import { cn } from "@/lib/utils";
import { Compass, FlaskConical, Heart, Search, Wine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
	{ label: "Home", icon: Wine, href: "/" },
	{ label: "Browse", icon: Compass, href: "/browse" },
	{ label: "Search", icon: Search, href: "/search" },
	{ label: "Ingredients", icon: FlaskConical, href: "/ingredients" },
	{ label: "Favorites", icon: Heart, href: "/favorites" },
];

export default function NavItem() {
	const pathname = usePathname();

	return (
		<div className="flex items-center gap-1">
			{navItems.map((item) => (
				<Link
					href={item.href}
					key={item.label}
					className={cn(
						"flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
						pathname === item.href
							? "bg-accent text-accent-foreground"
							: "text-muted-foreground hover:text-foreground",
					)}>
					<item.icon className="h-4 w-4" />
					{item.label}
				</Link>
			))}
		</div>
	);
}
