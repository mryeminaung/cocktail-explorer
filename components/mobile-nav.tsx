"use client";

import { cn } from "@/lib/utils";
import { useFavCocktail } from "@/stores/useFavCocktailStore";
import { Compass, FlaskConical, Heart, Search, Wine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

const navItems = [
	{ label: "Home", icon: Wine, href: "/" },
	{ label: "Browse", icon: Compass, href: "/browse" },
	{ label: "Search", icon: Search, href: "/search" },
	{ label: "Ingredients", icon: FlaskConical, href: "/ingredients" },
	{ label: "Favorites", icon: Heart, href: "/favorites" },
];

export default function MobileNav() {
	const pathname = usePathname();
	const favCocktails = useFavCocktail((state) => state.favCocktails);

	return (
		<div className="flex z-30 absolute top-15 border border-dashed border-primary left-0 right-0 mx-5 rounded-lg p-3 bg-primary-foreground flex-col gap-1">
			{navItems.map((item) => (
				<Link
					href={item.href}
					key={item.label}
					className={cn(
						"flex items-center gap-1.5 rounded-md px-5 py-2 text-sm font-medium transition-colors relative",
						pathname === item.href
							? "bg-accent text-accent-foreground"
							: "text-muted-foreground hover:text-foreground",
					)}>
					<item.icon className="h-4 w-4" />
					{item.label}
					{item.label === "Favorites" && favCocktails.length > 0 && (
						<Badge className="absolute  right-0">{favCocktails.length}</Badge>
					)}
				</Link>
			))}
		</div>
	);
}
