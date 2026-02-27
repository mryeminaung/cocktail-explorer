"use client";

import CocktailCard from "@/components/cocktail-card";
import { useFavCocktail } from "@/stores/use-favcocktail-store";
import FavNotFound from "./components/fav-not-found";

export default function FavoritesPage() {
	const favCocktails = useFavCocktail((state) => state.favCocktails);

	return (
		<>
			<div className="">
				<h2 className="text-5xl font-semibold font-serif">Your Favorites</h2>
				<p className="text-muted-foreground">
					{favCocktails.length} saved cocktails
				</p>
			</div>
			{favCocktails.length > 0 ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-5">
					{favCocktails.map((cocktail) => (
						<CocktailCard
							key={cocktail.idDrink}
							cocktail={cocktail}
						/>
					))}
				</div>
			) : (
				<FavNotFound />
			)}
		</>
	);
}
