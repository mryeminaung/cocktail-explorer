"use client";

import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import CocktailCard from "./cocktail-card";
import { Input } from "./ui/input";

function IngredientCard({
	ingredient,
	setIngredientQuery,
}: {
	ingredient: { name: string; thumbnail: string };
	setIngredientQuery: (query: string) => void;
}) {
	return (
		<div
			className="border flex items-center mb-1 py-1 rounded-md hover:cursor-pointer"
			onClick={() => setIngredientQuery(ingredient.name)}>
			<Image
				alt={ingredient.name}
				src={ingredient.thumbnail}
				width={50}
				height={10}
				className="h-10 w-auto"
			/>
			<p>{ingredient.name}</p>
		</div>
	);
}

export default function BrowseByIngredients() {
	const [ingredientQuery, setIngredientQuery] = useState<string>("");

	const fetchIngredients = async () => {
		const res = await fetch("/api/cocktails/ingredients");
		return await res.json();
	};

	const fetchDrinks = async () => {
		const res = await fetch(
			`/api/cocktails/filter?type=i&key=${ingredientQuery}`,
		);
		return await res.json();
	};

	const { data: ingredients, isLoading } = useQuery({
		queryKey: ["ingredients"],
		queryFn: fetchIngredients,
	});

	const { data } = useQuery({
		queryKey: ["cocktails-by-ingredients", ingredientQuery],
		queryFn: fetchDrinks,
	});

	const filteredIngredients = ingredients?.filter((ing: any) =>
		ing.name.toLowerCase().includes(ingredientQuery.toLowerCase()),
	);

	return (
		<>
			<section className="grid grid-cols-1 md:grid-cols-7 my-5 gap-10">
				{isLoading && <p>Loading ingredients...</p>}

				<div className="col-span-2">
					<div className="relative mb-3">
						<Search
							className="absolute top-3 left-2 text-muted-foreground"
							size={20}
						/>
						<Input
							value={ingredientQuery}
							onChange={(e) => setIngredientQuery(e.target.value)}
							className="px-10 py-5 bg-white"
							placeholder="Filter ingredients..."
						/>
						{ingredientQuery && (
							<X
								onClick={() => setIngredientQuery("")}
								className="absolute top-3 right-2 text-muted-foreground"
								size={20}
							/>
						)}
					</div>

					{filteredIngredients && (
						<div className="max-h-[50vh] overflow-y-auto pr-2">
							{filteredIngredients.map((ingredient: any) => (
								<IngredientCard
									key={ingredient.name}
									ingredient={ingredient}
									setIngredientQuery={setIngredientQuery}
								/>
							))}
							{filteredIngredients.length === 0 && (
								<p className="text-sm text-gray-500">No ingredients found 🧊</p>
							)}
						</div>
					)}
				</div>

				<div className="col-span-5">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-5">
						{data?.drinks !== null &&
							typeof data?.drinks !== "string" &&
							data?.drinks?.map((drink: any) => (
								<CocktailCard
									key={drink.idDrink}
									cocktail={drink}
								/>
							))}
					</div>
				</div>
			</section>
		</>
	);
}
