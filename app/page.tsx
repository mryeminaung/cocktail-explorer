import BrowseByLetter from "@/components/browse-by-letter";
import RandomCocktail from "@/components/random-cocktail";
import AppLayout from "@/layouts/app-layout";

export default function Home() {
	return (
		<AppLayout>
			<RandomCocktail />
			<BrowseByLetter />
		</AppLayout>
	);
}
