"use client";

import CocktailCard from "@/components/cocktail-card";
import Skeleton from "@/components/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Search, Wine, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import IngredientCard from "./ingredient-card";

export default function BrowseByIngredients({
	initialQuery,
}: {
	initialQuery?: string;
}) {
	const [ingredientQuery, setIngredientQuery] = useState<string>(
		initialQuery ?? "",
	);
	const [currentIngredient, setCurrentIngredient] = useState<{
		name: string;
		thumbnail: string;
	} | null>(null);

	const fetchIngredients = async () => {
		const res = await fetch("/api/cocktails/ingredients");
		return await res.json();
	};

	const fetchDrinks = async () => {
		const res = await fetch(
			`/api/cocktails/filter?type=i&key=${currentIngredient?.name}`,
		);
		return await res.json();
	};

	const { data: ingredients, isLoading: ingredientsLoading } = useQuery({
		queryKey: ["ingredients"],
		queryFn: fetchIngredients,
	});

	const { data, isLoading } = useQuery({
		queryKey: ["cocktails-by-ingredients", currentIngredient?.name],
		queryFn: fetchDrinks,
	});

	const filteredIngredients = ingredients?.filter((ing: any) =>
		ing.name.toLowerCase().includes(ingredientQuery.toLowerCase()),
	);

	return (
		<>
			<section className="grid grid-cols-1 md:grid-cols-7 my-5 gap-10">
				<div className="col-span-5 md:col-span-2">
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

					{currentIngredient !== null && (
						<div className="flex items-center mb-3 justify-between rounded-md gap-x-2 px-3 py-2 border border-primary">
							<div className="flex items-center gap-x-2">
								<Image
									alt={currentIngredient.name}
									src={currentIngredient.thumbnail}
									width={30}
									height={10}
									className="h-10 py-1 w-auto bg-primary/10 rounded-md"
								/>
								<p>{currentIngredient.name}</p>
							</div>
							<X
								onClick={() => {
									setCurrentIngredient(null);
									setIngredientQuery("");
								}}
								className="text-muted-foreground"
								size={20}
							/>
						</div>
					)}

					{ingredientsLoading ? (
						<Card className="max-h-[50vh] gap-0 border border-primary border-dashed rounded-lg overflow-y-auto p-2">
							{[...Array(10)].map((_, idx) => (
								<Skeleton
									key={idx}
									type="ingredient-card"
								/>
							))}
						</Card>
					) : (
						filteredIngredients && (
							<Card className="max-h-[50vh] gap-0 border border-primary border-dashed rounded-lg overflow-y-auto p-2">
								{filteredIngredients.map((ingredient: any) => (
									<IngredientCard
										key={ingredient.name}
										ingredient={ingredient}
										currentIngredient={currentIngredient}
										setCurrentIngredient={setCurrentIngredient}
										setIngredientQuery={setIngredientQuery}
									/>
								))}
								{filteredIngredients.length === 0 && (
									<p className="text-sm text-muted-foreground py-5 text-center">
										No ingredients match your search
									</p>
								)}
							</Card>
						)
					)}
				</div>

				<div className="col-span-5">
					<div className="mb-5 flex items-center justify-between">
						<h3
							className={cn(
								"text-lg font-semibold pt-2",
								currentIngredient === null ? "collapse" : "",
							)}>
							Cocktails with {currentIngredient?.name}
						</h3>
						{data?.drinks?.length > 0 && currentIngredient && (
							<Badge>{data?.drinks?.length} results</Badge>
						)}
					</div>

					{currentIngredient === null && !ingredientsLoading && (
						<Card className="text-sm border-primary border-dashed text-gray-500 border py-10 rounded-lg text-center flex flex-col gap-y-3 items-center justify-center">
							<span className="rounded-full border bg-primary-foreground p-4">
								<Wine size={24} />
							</span>
							<span className="text-muted-foreground">
								Select an ingredient to see cocktails made with it
							</span>
						</Card>
					)}

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 my-5">
						{data?.drinks !== null &&
							typeof data?.drinks !== "string" &&
							data?.drinks?.map((drink: any) => (
								<CocktailCard
									key={drink.idDrink}
									cocktail={drink}
								/>
							))}
						{isLoading &&
							currentIngredient &&
							[...Array(20)].map((_, idx) => (
								<Skeleton
									key={idx}
									type="cocktail-card"
								/>
							))}
					</div>
				</div>
			</section>
		</>
	);
}
