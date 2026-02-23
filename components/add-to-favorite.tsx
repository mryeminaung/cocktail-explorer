import { cn } from "@/lib/utils";
import { useFavCocktail } from "@/stores/useFavCocktailStore";
import { Drink } from "@/types/cocktail";
import { Heart } from "lucide-react";

export default function AddToFavorite({
	cocktail,
	className,
}: {
	cocktail: Drink;
	className?: string;
}) {
	const addCocktailToFav = useFavCocktail((state) => state.addCocktailToFav);
	const removeCocktailFromFav = useFavCocktail(
		(state) => state.removeCocktailFromFav,
	);
	const favCocktails = useFavCocktail((state) => state.favCocktails);

	const isFav = favCocktails.some((fav) => fav.idDrink === cocktail.idDrink);

	const handleAddToFav = (cocktail: Drink) => {
		if (isFav) removeCocktailFromFav(cocktail.idDrink);
		else addCocktailToFav(cocktail);
	};

	return (
		<div className={cn("p-2 rounded-full bg-primary/30", className)}>
			<Heart
				color={isFav ? "#ef4444" : "#6b7280"} // red-500 or gray-500
				fill={isFav ? "#ef4444" : "none"}
				className={cn("cursor-pointer size-4 md:size-5")}
				onClick={() => handleAddToFav(cocktail)}
			/>
		</div>
	);
}
