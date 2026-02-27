"use client";

import CocktailCard from "@/components/cocktail-card";
import Skeleton from "@/components/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
			<h3 className="text-4xl font-serif">Browse by Letter</h3>
			<div className="flex items-center flex-wrap gap-2 mt-3 mb-5">
				{LETTERS.map((letter, index) => {
					return (
						<span
							key={index}
							onClick={() => setKeyword(letter)}
							className={cn(
								"cursor-pointer font-serif rounded-md px-3 py-1 transition-colors hover:bg-primary border text-black dark:text-white",
								{
									"bg-primary": letter === keyword,
								},
							)}>
							{letter}
						</span>
					);
				})}
			</div>
			{keyword && (
				<p className="text-muted-foreground font-semibold font-serif">
					Cocktails starting with "{keyword}"
				</p>
			)}
			{isLoading ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-5">
					{Array.from({ length: 10 }).map((_, index) => (
						<Skeleton
							key={index}
							type="cocktail-card"
						/>
					))}
				</div>
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
