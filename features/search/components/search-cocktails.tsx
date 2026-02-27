"use client";

import CocktailCard from "@/components/cocktail-card";
import Skeleton from "@/components/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { FolderPen, ShoppingCart } from "lucide-react";
import { useState } from "react";
import SearchByIngredients from "./search-by-ingredients";
import SearchByName from "./search-by-name";

export default function SearchCocktails() {
	const [activeTab, setActiveTab] = useState<"name" | "ingredients">("name");
	const [filterKey, setFilterKey] = useState<string>("");

	const fetchDrinks = async () => {
		let filterType = "";
		const filterMap = {
			name: "s",
			ingredients: "i",
		};
		filterType = filterMap[activeTab];

		const res = await fetch(
			`/api/cocktails/${filterType === "s" ? "search" : "filter"}?type=${filterType}&key=${filterKey}`,
		);
		return res.json();
	};

	const { data, isLoading } = useQuery({
		queryKey: ["drinks", filterKey],
		queryFn: fetchDrinks,
		enabled: !!filterKey,
	});

	return (
		<section>
			<div className="flex items-center flex-wrap gap-3 my-5">
				<Button
					className={cn(
						"py-5 px-8! rounded-full",
						activeTab === "name"
							? "bg-primary text-primary-foreground"
							: "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary",
					)}
					onClick={() => {
						setActiveTab("name");
						setFilterKey("");
					}}>
					<FolderPen className="mr-1 size-4" />
					By Name
				</Button>
				<Button
					className={cn(
						"py-5 px-8! rounded-full",
						activeTab === "ingredients"
							? "bg-primary text-primary-foreground"
							: "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary",
					)}
					onClick={() => {
						setActiveTab("ingredients");
						setFilterKey("");
					}}>
					<ShoppingCart className="mr-1 size-4" />
					By Ingredients
				</Button>
			</div>

			{activeTab === "name" && (
				<>
					<SearchByName setFilterKey={setFilterKey} />
					{!filterKey && (
						<p className="text-center py-20 text-muted-foreground">
							Start typing to search for cocktails by name
						</p>
					)}
				</>
			)}
			{activeTab === "ingredients" && (
				<>
					<SearchByIngredients setFilterKey={setFilterKey} />
					{!filterKey && (
						<p className="text-center py-20 text-muted-foreground">
							Start typing an ingredient to find matching cocktails
						</p>
					)}
				</>
			)}

			{isLoading && (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-5">
					{Array.from({ length: 8 }).map((_, i) => (
						<Skeleton
							key={i}
							type="cocktail-card"
						/>
					))}
				</div>
			)}

			{data?.drinks !== null && typeof data?.drinks !== "string" ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-5">
					{data?.drinks?.map((drink: any) => (
						<CocktailCard
							key={drink.idDrink}
							cocktail={drink}
						/>
					))}
				</div>
			) : (
				<p className="mt-5">No cocktails found for "{filterKey}"</p>
			)}
		</section>
	);
}
