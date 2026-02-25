"use client";

import { cn, formatDrink } from "@/lib/utils";
import { drinkType } from "@/types/cocktail";
import { useQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddToFavorite from "./add-to-favorite";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

async function fetchRandomDrink() {
	const res = await fetch(`/api/cocktails/random`);
	if (!res.ok) throw new Error("Failed to fetch drink");
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
		<div className="mb-5">
			<div className="flex items-center justify-between gap-4 mb-6">
				<div>
					<span className="text-primary tracking-wider font-semibold uppercase text-[12px]">
						✨ Featured
					</span>
					<h2 className="text-4xl md:text-5xl font-semibold font-serif">
						Cocktail of the moment
					</h2>
					<p className="text-muted-foreground">
						Discover something new with every refresh
					</p>
				</div>
				<Button
					disabled={isFetching}
					onClick={() => refetch()}
					className="shrink-0 bg-primary rounded-full">
					<RefreshCw
						className={cn(isFetching ? "animate-spin" : "")}
						size={18}
					/>
					Shuffle
				</Button>
			</div>

			{isLoading ? (
				<Card className="h-100 flex items-center justify-center">
					<p className="animate-pulse">Mixing your drink...</p>
				</Card>
			) : (
				data && <RandomCocktailCard cocktail={data[0]} />
			)}
		</div>
	);
}

function RandomCocktailCard({ cocktail }: { cocktail: drinkType }) {
	const router = useRouter();

	const drink = {
		strDrink: cocktail.name,
		strDrinkThumb: cocktail.thumbnail,
		idDrink: cocktail.id,
	};

	return (
		<Card className="p-0 overflow-hidden border-none shadow-lg">
			<div className="grid grid-cols-1 md:grid-cols-2 min-h-125">
				{/* Left Side: Image (The 50%) */}
				<div className="relative w-full h-80 md:h-full">
					<Image
						src={cocktail.thumbnail}
						alt={cocktail.name}
						fill
						priority
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-cover"
					/>
				</div>

				{/* Right Side: Content (The other 50%) */}
				<div className="relative p-8 md:p-12 flex flex-col justify-center bg-card">
					<AddToFavorite
						cocktail={drink}
						className="absolute top-6 right-6 scale-110"
					/>

					<div className="space-y-2">
						<h3 className="text-3xl font-serif md:text-4xl font-bold tracking-tight">
							{cocktail.name}
						</h3>

						<div className="flex flex-wrap gap-2 pt-2">
							<Badge
								variant="secondary"
								className="rounded-md">
								{cocktail.category}
							</Badge>
							<Badge
								variant="outline"
								className="rounded-md">
								{cocktail.alcoholic}
							</Badge>
							<Badge
								variant="outline"
								className="rounded-md">
								{cocktail.glass}
							</Badge>
						</div>
					</div>

					<div className="mt-6">
						<h4 className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
							Instructions
						</h4>
						<p className="text-sm leading-relaxed text-balance">
							{cocktail.instructions}
						</p>
					</div>

					<div className="mt-6">
						<h4 className="text-[12px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
							Ingredients
						</h4>
						<div className="flex flex-wrap gap-2">
							{cocktail.ingredients.map((ing, index) => (
								<Badge
									key={index}
									variant="secondary"
									className="font-mono text-[10px] px-2 py-0.5">
									{ing.measure && (
										<span className="opacity-70 mr-1">{ing.measure}</span>
									)}
									{ing.name}
								</Badge>
							))}
						</div>
					</div>

					<Button
						onClick={() => router.push(`/cocktail/${cocktail.id}`)}
						className="mt-8 w-fit font-medium rounded-full px-8"
						size="sm">
						View Full Cocktail Details
					</Button>
				</div>
			</div>
		</Card>
	);
}
