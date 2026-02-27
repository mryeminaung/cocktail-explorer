import BrowseByLetter from "./components/browse-by-letter";
import RandomCocktail from "./components/random-cocktail";

export default function HomePage() {
	return (
		<>
			<RandomCocktail />
			<BrowseByLetter />
		</>
	);
}
