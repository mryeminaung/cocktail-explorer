import AppLayout from "@/layouts/app-layout";

export default function CocktailLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AppLayout>{children}</AppLayout>;
}
