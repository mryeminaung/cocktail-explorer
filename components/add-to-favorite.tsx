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
		<div className={cn("p-2 rounded-full bg-white/80", className)}>
			<Heart
				color={isFav ? "red" : "gray"}
				fill={isFav ? "red" : "none"}
				className={cn("cursor-pointer size-4 md:size-7")}
				onClick={() => handleAddToFav(cocktail)}
			/>
		</div>
	);
}
