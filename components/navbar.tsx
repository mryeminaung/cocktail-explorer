"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MobileNav from "./mobile-nav";
import NavItem from "./nav-item";
import ThemeToggler from "./theme-toggler";

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// If user scrolls more than 20px, set isScrolled to true
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`
        flex items-center justify-between sticky top-0 transition-all px-3 mx-auto w-full max-w-7xl duration-300 z-100
        ${
					isScrolled
						? "bg-background/70 backdrop-blur-md border-border/50"
						: "bg-background border-border"
				}
      `}>
			{/* Logo */}
			<Link href={"/"}>
				<Image
					className="dark:invert object-fill h-14 w-auto"
					src="/LiquidIndex-Logo.png"
					alt="Next.js logo"
					width={80}
					height={40}
					priority
				/>
			</Link>

			{/* Nav Links */}
			<div className="hidden md:block">
				<NavItem />
			</div>

			{/* Theme Switcher */}
			<div className="flex items-center gap-x-5">
				<ThemeToggler />
				{/* Mobile Menu Button */}
				<div className="block md:hidden">
					{isMobileNavOpen ? (
						<X
							size={28}
							onClick={() => setIsMobileNavOpen(false)}
						/>
					) : (
						<Menu
							size={28}
							onClick={() => setIsMobileNavOpen(true)}
						/>
					)}

					{isMobileNavOpen && <MobileNav />}
				</div>
			</div>
		</nav>
	);
}
