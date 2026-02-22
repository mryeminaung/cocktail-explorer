"use client";

import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CocktailCard from "./cocktail-card";

async function fetchDrinks(keyword: string) {
	const res = await fetch(`/api/cocktails/search?type=f&key=${keyword}`);
	return res.json();
}

export default function BrowseByLetter() {
	const LETTERS = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];
	const [keyword, setKeyword] = useState<string>("");

	const { data, isLoading, isError } = useQuery({
		queryKey: ["cocktails", keyword],
		queryFn: () => fetchDrinks(keyword),
		enabled: !!keyword,
	});

	return (
		<section>
			<h3 className="text-3xl font-semibold font-mono">Browse by Letter</h3>
			<div className="flex items-center flex-wrap gap-2 mt-3 mb-5">
				{LETTERS.map((letter, index) => {
					return (
						<span
							key={index}
							onClick={() => setKeyword(letter)}
							className={cn(
								"cursor-pointer font-mono rounded-md px-3 py-1 transition-colors hover:bg-gray-200 bg-gray-500",
								{
									"bg-orange-300": letter === keyword,
								},
							)}>
							{letter}
						</span>
					);
				})}
			</div>
			{keyword && <p>Cocktails starting with "{keyword}"</p>}
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-5">
					{data?.drinks !== null ? (
						data?.drinks.map((cocktail: any) => (
							<CocktailCard
								key={cocktail.idDrink}
								cocktail={cocktail}
							/>
						))
					) : (
						<p>No cocktails found</p>
					)}
				</div>
			)}
		</section>
	);
}
