import SearchCocktails from "@/components/search-cocktails";
import AppLayout from "@/layouts/app-layout";

export default function SearchPage() {
	return (
		<AppLayout>
			<div className="">
				<h2 className="text-5xl font-semibold font-serif">Search Cocktails</h2>
				<p className="text-muted-foreground">
					Find your perfect drink by name or ingredient
				</p>
			</div>
			<SearchCocktails />
		</AppLayout>
	);
}
