"use client";

import { cn, formatDrink } from "@/lib/utils";
import { drinkType } from "@/types/cocktail";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import AddToFavorite from "./add-to-favorite";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

async function fetchRandomDrink() {
	const res = await fetch(`/api/cocktails/random`);
	return res.json();
}

export default function RandomCocktail() {
	const { data, refetch, isLoading, isFetching } = useQuery({
		queryKey: ["randomDrink"],
		queryFn: fetchRandomDrink,
		refetchOnWindowFocus: false,
		select: (data) => {
			return data.drinks.map(formatDrink);
		},
	});

	return (
		<div>
			<div className="flex items-center justify-between gap-2">
				<div className="">
					<h2 className="text-3xl font-semibold font-mono">
						Cocktail of the moment
					</h2>
					<p>Discover something new with every refresh</p>
				</div>
				<Button
					disabled={isFetching}
					onClick={() => refetch()}
					className="mb-4">
					<RefreshCw
						className={cn(isFetching ? "animate-spin" : "")}
						size={18}
					/>
					Shuffle
				</Button>
			</div>

			{isLoading ? (
				<p>Loading...</p>
			) : (
				<RandomCocktailCard cocktail={data[0]} />
			)}
		</div>
	);
}

function RandomCocktailCard({ cocktail }: { cocktail: drinkType }) {
	return (
		<Card className="p-0 my-5 overflow-hidden">
			<div className="flex flex-col md:flex-row items-center p-3">
				<Image
					src={cocktail.thumbnail}
					alt={cocktail.name}
					width={300}
					height={100}
					priority
					className="object-fill h-75 w-full border rounded-xl overflow-hidden"
				/>
				<div className="relative px-5 m-5 w-full">
					<AddToFavorite className="absolute top-0 right-0" />
					<h3 className="text-2xl">{cocktail.name}</h3>
					<p className="space-x-2 my-3 font-mono">
						<Badge>{cocktail.category}</Badge>
						<Badge>{cocktail.alcoholic}</Badge>
						<Badge>{cocktail.glass}</Badge>
					</p>
					<p>{cocktail.instructions}</p>
					<h4 className="uppercase font-semibold my-3">Ingredients</h4>
					<p className="space-x-2">
						{cocktail.ingredients.map((ing, index) => (
							<Badge
								key={index}
								className="space-x-3 font-mono">
								{ing.measure}
								{ing.name}
							</Badge>
						))}
					</p>
					<Button
						className="mt-3 rounded-xl"
						size={"sm"}>
						View Full Cocktail Details
					</Button>
				</div>
			</div>
		</Card>
	);
}
