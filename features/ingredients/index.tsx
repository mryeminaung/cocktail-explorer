import BrowseByIngredients from "./components/browse-by-ingredients";

export default function IngredientsPage({
	initialQuery,
}: {
	initialQuery: string;
}) {
	return (
		<>
			<div className="">
				<h2 className="text-5xl font-semibold font-serif">
					Ingredients Directory
				</h2>
				<p className="text-muted-foreground">
					Browse all cocktail ingredients and discover drinks made with them
				</p>
			</div>
			<BrowseByIngredients initialQuery={initialQuery} />
		</>
	);
}
