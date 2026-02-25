"use client";

import { useQuery } from "@tanstack/react-query";
import CocktailCard from "./cocktail-card";
import Skeleton from "./skeleton";

export default function SimilarCocktails({
	ingredient,
}: {
	ingredient: { name: string; measure: string; thumbnail?: string };
}) {
	const fetchSimilarDrinks = async () => {
		const res = await fetch(
			`/api/cocktails/filter?type=i&key=${ingredient.name}`,
		);
		if (!res.ok) throw new Error("Failed to fetch similar cocktails");
		return await res.json();
	};

	const { data, isLoading } = useQuery({
		queryKey: ["similar-cocktails", ingredient],
		queryFn: fetchSimilarDrinks,
		enabled: !!ingredient,
	});

	return (
		<section className="my-8">
			<div className="">
				<h3 className="text-3xl font-serif font-semibold">Similar Cocktails</h3>
				<p className="text-muted-foreground">
					Other drinks made with {ingredient.name}
				</p>
			</div>
			{isLoading ? (
				<div className="flex gap-4 mt-4">
					{[...Array(5)].map((_, i) => (
						<Skeleton
							key={i}
							type="cocktail-card"
						/>
					))}
				</div>
			) : (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-5">
					{data.drinks && data.drinks.length > 0 ? (
						data.drinks.slice(0, 10).map((drink: any, idx: any) => (
							<CocktailCard
								key={idx}
								cocktail={drink}
							/>
						))
					) : (
						<p className="text-muted-foreground">No similar cocktails found.</p>
					)}
				</div>
			)}
		</section>
	);
}
