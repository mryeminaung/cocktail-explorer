"use client";

import { drinkType } from "@/types/cocktail";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddToFavorite from "./add-to-favorite";

export default function CocktailDetail({ cocktail }: { cocktail: drinkType }) {
	const router = useRouter();

	const drink = {
		idDrink: cocktail.id,
		strDrink: cocktail.name,
		strDrinkThumb: cocktail.thumbnail,
	};

	const [ingredients, setIngredients] = useState<any[]>([]);

	useEffect(() => {
		if (!cocktail) return;

		fetchIngredientsWithImages(cocktail).then(setIngredients);
	}, [cocktail]);

	const fetchIngredientsWithImages = async (cocktail: any) => {
		const ingredientsWithThumbnails = await Promise.all(
			cocktail.ingredients.map(async (ingredient: any) => {
				if (!ingredient.name) return { ...ingredient, thumbnail: undefined };

				try {
					const res = await fetch(
						`/api/cocktails/ingredients/images?ingredient=${ingredient.name}`,
					);

					if (!res.ok) throw new Error("Failed to fetch image");

					const data = await res.json();
					return { ...ingredient, thumbnail: data.image || "/placeholder.png" };
				} catch (error) {
					console.error("Error fetching ingredient image:", error);
					return { ...ingredient, thumbnail: "/placeholder.png" };
				}
			}),
		);

		return ingredientsWithThumbnails;
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-10">
			{/* LEFT SIDE */}
			<div>
				<Image
					src={cocktail?.thumbnail || "/placeholder.png"}
					alt={cocktail?.name || "cocktail"}
					width={500}
					height={500}
					loading="eager"
					className="rounded-2xl object-cover w-full h-65 sm:h-80 md:h-95 lg:h-105"
				/>
			</div>

			{/* RIGHT SIDE */}
			<div>
				<div className="flex justify-between items-start gap-4">
					<h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold">
						{cocktail?.name}
					</h1>
					<AddToFavorite cocktail={drink} />
				</div>

				<div className="flex flex-wrap gap-2 sm:gap-3 mt-3 mb-6">
					<span className="px-3 py-1 text-xs sm:text-sm rounded-xl bg-muted">
						{cocktail.category}
					</span>
					<span className="px-3 py-1 text-xs sm:text-sm rounded-xl bg-muted">
						{cocktail.alcoholic}
					</span>
					<span className="px-3 py-1 text-xs sm:text-sm rounded-xl bg-muted">
						{cocktail.glass}
					</span>
				</div>

				{cocktail?.tags && cocktail.tags.length > 0 && (
					<div className="flex flex-wrap gap-2 mb-6">
						{cocktail.tags.map((tag: string, idx: number) => (
							<span
								key={idx}
								className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary">
								{tag}
							</span>
						))}
					</div>
				)}

				<h2 className="text-xs sm:text-sm tracking-widest text-muted-foreground mb-2">
					INSTRUCTIONS
				</h2>
				<p className="mb-8 text-sm sm:text-base leading-relaxed">
					{cocktail?.instructions}
				</p>

				<h2 className="text-xs sm:text-sm tracking-widest text-muted-foreground mb-4">
					INGREDIENTS
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					{cocktail?.ingredients &&
						ingredients.map((ingredient: any, i: any) => (
							<div
								key={i}
								onClick={() =>
									router.push(
										`/ingredients?q=${encodeURIComponent(ingredient.name)}`,
									)
								}
								className="flex items-center gap-4 p-2 rounded-xl border bg-muted/30 hover:bg-muted/50 transition hover:scale-105 hover:cursor-pointer">
								<Image
									src={ingredient?.thumbnail || "/placeholder.png"}
									alt={ingredient.name}
									width={48}
									height={48}
									loading="eager"
									className="rounded-md bg-muted w-10 h-10"
								/>

								<div className="flex-1">
									<p className="font-medium text-sm sm:text-base">
										{ingredient.name}
									</p>
									<p className="text-xs sm:text-sm text-muted-foreground">
										{ingredient.measure}
									</p>
								</div>

								<span className="text-muted-foreground text-sm">
									<ArrowUpRight className="w-4 h-4" />
								</span>
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

function CocktailDetailSkeleton() {}
