import BrowseByIngredients from "@/components/browse-by-ingredients";
import AppLayout from "@/layouts/app-layout";

export default function IngredientsPage({
	searchParams,
}: {
	searchParams: { q?: string };
}) {
	const ingredientQuery = searchParams.q || "";

	return (
		<AppLayout>
			<div className="">
				<h2 className="text-5xl font-semibold font-serif">
					Ingredients Directory
				</h2>
				<p className="text-muted-foreground">
					Browse all cocktail ingredients and discover drinks made with them
				</p>
			</div>
			<BrowseByIngredients initialQuery={ingredientQuery} />
		</AppLayout>
	);
}
