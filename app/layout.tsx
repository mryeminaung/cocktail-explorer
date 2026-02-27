import QueryProvider from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";

import AppLayout from "@/layouts/app-layout";
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
		<html
			lang="en"
			suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<QueryProvider>
						<AppLayout>{children}</AppLayout>
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
