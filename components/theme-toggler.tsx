"use client";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themeOptions = [
	{ icon: Sun, value: "light", label: "Light mode" },
	{ icon: Moon, value: "dark", label: "Dark mode" },
	{ icon: Monitor, value: "system", label: "System mode" },
] as const;

export default function ThemeToggler() {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null; // Prevent hydration mismatch

	return (
		<div className="flex items-center gap-1 rounded-full border border-border p-1">
			{themeOptions.map((option) => (
				<button
					key={option.value}
					onClick={() => setTheme(option.value)}
					aria-label={option.label}
					className={cn(
						"rounded-full p-1.5 transition-colors",
						theme === option.value
							? "bg-accent text-accent-foreground"
							: "text-muted-foreground hover:text-foreground",
					)}>
					<option.icon className="h-4 w-4" />
				</button>
			))}
		</div>
	);
}
