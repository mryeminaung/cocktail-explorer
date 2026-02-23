import { NextResponse } from "next/server";

export async function GET() {
	const res = await fetch(`${process.env.COCKTAIL_API_URL}/list.php?i=list`);
	const data = await res.json();

	const ingredients = data.drinks.map((item: { strIngredient1: string }) => ({
		name: item.strIngredient1,
		thumbnail: `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-small.png`,
	}));

	return NextResponse.json(ingredients);
}
