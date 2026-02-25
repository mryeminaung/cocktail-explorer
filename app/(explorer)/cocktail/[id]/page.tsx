"use client";

import { useParams } from "next/navigation";

import CocktailDetail from "@/components/cocktail-detail";
import SimilarCocktails from "@/components/similar-cocktails";
import Skeleton from "@/components/skeleton";
import { formatDrink } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CocktailDetailPage() {
	const { id } = useParams();
	const [cocktail, setCocktail] = useState<any>(null);

	const fetchCocktailDetail = async () => {
		const res = await fetch(`/api/cocktails/lookup?cocktailId=${id}`);
		if (!res.ok) throw new Error("Failed to fetch drink");
		return res.json();
	};

	const { data, isLoading } = useQuery({
		queryKey: ["cocktail", id],
		queryFn: fetchCocktailDetail,
		enabled: !!id,
		select: (data) => {
			return data?.drinks.map(formatDrink);
		},
	});

	console.log("detail : ", data);

	return (
		<div className="md:px-10 lg:px-16">
			<Link
				href={"/"}
				className="text-sm mb-6 rounded-full bg-primary flex items-center gap-1 w-max px-3 py-1 text-white">
				<ArrowLeft className="w-4 h-4" />
				<span>Back</span>
			</Link>

			{isLoading ? (
				<Skeleton type="random" />
			) : (
				<CocktailDetail cocktail={data[0]} />
			)}

			{data && <SimilarCocktails ingredient={data[0]?.ingredients[0]} />}
		</div>
	);
}
