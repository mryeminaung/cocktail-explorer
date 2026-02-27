import { Drink } from "@/types/cocktail";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
	favCocktails: Drink[];
};

type Actions = {
	removeCocktailFromFav: (cocktailId: string) => void;
	addCocktailToFav: (cocktail: Drink) => void;
};

export const useFavCocktail = create<State & Actions>()(
	persist(
		(set) => ({
			favCocktails: [],
			removeCocktailFromFav: (cocktailId: string) =>
				set((state) => ({
					favCocktails: state.favCocktails.filter(
						(c) => c.idDrink !== cocktailId,
					),
				})),
			addCocktailToFav: (cocktail: Drink) =>
				set((state) => ({
					favCocktails: [...state.favCocktails, cocktail],
				})),
		}),
		{
			name: "fav-cocktails",
		},
	),
);
