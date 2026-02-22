import SearchCocktails from "@/components/search-cocktails";
import AppLayout from "@/layouts/app-layout";

export default function SearchPage() {
	return (
		<AppLayout>
			<div className="">
				<h2 className="text-3xl">Search Cocktails</h2>
				<p>Find your perfect drink by name or ingredient</p>
			</div>
			<SearchCocktails />
		</AppLayout>
	);
}
