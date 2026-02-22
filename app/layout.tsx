import QueryProvider from "@/components/query-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Cocktail Explorer",
	description:
		"LiquidIndex is a refined cocktail discovery platform. Explore ingredients, categories, and curated drink collections with precision and clarity.",
	icons: {
		icon: "/LiquidIndex-Small.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primary-foreground`}>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	);
}
