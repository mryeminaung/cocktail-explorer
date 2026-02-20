"use client";

import CocktailCard from "@/components/cocktail-card";
import AppLayout from "@/layouts/app-layout";
import { useFavCocktail } from "@/stores/useFavCocktailStore";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
	const favCocktails = useFavCocktail((state) => state.favCocktails);

	return (
		<AppLayout>
			<div className="">
				<h2 className="text-3xl">Your Favorites</h2>
				<p>{favCocktails.length} saved cocktails</p>
			</div>
			{favCocktails.length > 0 ? (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-5">
					{favCocktails.map((cocktail) => (
						<CocktailCard
							key={cocktail.idDrink}
							cocktail={cocktail}
						/>
					))}
				</div>
			) : (
				<div className="flex items-center flex-col py-20">
					<Heart className="cursor-pointer size-4 md:size-12" />
					<h3 className="font-semibold text-lg">No favorites yet</h3>
					<p className="max-w-105 my-3 text-sm text-center">
						Start exploring cocktails and tap the heart icon to save your
						favorite drinks here.
					</p>
					<Link
						className="bg-black text-sm font-mono px-5 rounded-lg text-white py-2"
						href={"/browse"}>
						Explore Cocktails
					</Link>
				</div>
			)}
		</AppLayout>
	);
}
