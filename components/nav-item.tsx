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

export default function NavItem() {
	const pathname = usePathname();
	const favCocktails = useFavCocktail((state) => state.favCocktails);

	return (
		<div className="flex items-center gap-1">
			{navItems.map((item) => (
				<Link
					href={item.href}
					key={item.label}
					className={cn(
						"flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors relative",
						pathname === item.href
							? "bg-accent text-accent-foreground"
							: "text-muted-foreground hover:text-foreground",
					)}>
					<item.icon className="h-4 w-4" />
					{item.label}
					{item.label === "Favorites" && favCocktails.length > 0 && (
						<Badge className="absolute -top-3 right-0">
							{favCocktails.length}
						</Badge>
					)}
				</Link>
			))}
		</div>
	);
}
