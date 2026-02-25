import { drinkType } from "@/types/cocktail";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDrink(drink: any): drinkType {
	const ingredients = [];

	for (let i = 1; i <= 15; i++) {
		const name = drink[`strIngredient${i}`];
		const measure = drink[`strMeasure${i}`];

		if (name) {
			ingredients.push({
				name,
				measure: measure?.trim() || "",
			});
		}
	}

	return {
		id: drink.idDrink,
		name: drink.strDrink,
		tags: drink.strTags ? drink.strTags.split(",").map((tag: string) => tag.trim()) : [],
		category: drink.strCategory,
		alcoholic: drink.strAlcoholic,
		glass: drink.strGlass,
		instructions: drink.strInstructions,
		thumbnail: drink.strDrinkThumb,
		ingredients,
	};
}
