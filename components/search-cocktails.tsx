"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { FolderPen, ShoppingCart } from "lucide-react";
import { useState } from "react";
import CocktailCard from "./cocktail-card";
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
			<Tabs
				defaultValue="name"
				className="my-5">
				<TabsList className="bg-primary-foreground h-auto py-5">
					<TabsTrigger
						className="rounded-full py-4 px-8"
						value="name"
						onClick={() => {
							setActiveTab("name");
							setFilterKey("");
						}}>
						<FolderPen size={20} />
						By Name
					</TabsTrigger>
					<TabsTrigger
						className="rounded-full py-4 px-8"
						value="ingredients"
						onClick={() => {
							setActiveTab("ingredients");
							setFilterKey("");
						}}>
						<ShoppingCart size={20} />
						By Ingredients
					</TabsTrigger>
				</TabsList>
			</Tabs>

			{activeTab === "name" && (
				<>
					<SearchByName setFilterKey={setFilterKey} />
					{!filterKey && (
						<p className="text-center py-20">
							Start typing to search for cocktails by name
						</p>
					)}
				</>
			)}

			{activeTab === "ingredients" && (
				<>
					<SearchByIngredients setFilterKey={setFilterKey} />
					{!filterKey && (
						<p className="text-center py-20">
							Start typing an ingredient to find matching cocktails
						</p>
					)}
				</>
			)}

			{isLoading && <p className="text-center py-20">Loading...</p>}

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
				`No cocktails found for "${filterKey}"`
			)}
		</section>
	);
}
