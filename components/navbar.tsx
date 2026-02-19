import Image from "next/image";
import NavItem from "./nav-item";
import ThemeToggler from "./theme-toggler";

export function Navbar() {
	return (
		<nav className="flex items-center justify-between border rounded-full border-border bg-background px-6 mt-5">
			{/* Logo */}
			<div className="flex items-center">
				<Image
					className="dark:invert object-contain"
					src="/LiquidIndex-Logo.png"
					alt="Next.js logo"
					width={100}
					height={40}
					priority
				/>
			</div>

			{/* Nav Links */}
			<NavItem />

			{/* Theme Switcher */}
			<ThemeToggler />
		</nav>
	);
}
