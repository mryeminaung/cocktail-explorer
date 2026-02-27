"use client";

import Skeleton from "@/components/skeleton";
import CocktailDetail from "@/features/cocktails/components/cocktail-detail";
import { formatDrink } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import SimilarCocktails from "./components/similar-cocktails";

export default function CocktailDetailPage() {
	const { id } = useParams();

	const fetchCocktailDetail = async () => {
		const res = await fetch(`/api/cocktails/lookup?cocktailId=${id}`);
		if (!res.ok) throw new Error("Failed to fetch drink");
		return res.json();
	};

	const { data, isLoading, isError } = useQuery({
		queryKey: ["cocktail", id],
		queryFn: fetchCocktailDetail,
		enabled: !!id,
		select: (data) => {
			return data?.drinks.map(formatDrink);
		},
	});

	return (
		<section>
			{isError ? (
				<div className="flex flex-col items-center justify-center min-vh-100 px-6 py-24 text-center">
					{/* Subtle background glow/effect to match Liquid Index style */}
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[150px] pointer-events-none" />

					<h1 className="text-8xl font-black text-primary tracking-tighter mb-4">
						404
					</h1>

					<p className="text-muted-foreground max-w-md mb-10">
						The index entry you're looking for has been moved, archived, or
						never existed in this website.
					</p>

					<Link
						href="/"
						className="flex items-center justify-center gap-2 px-5 text-sm py-2 bg-primary text-white rounded-full  transition-all transform ">
						<Home size={18} />
						Back to Home
					</Link>
				</div>
			) : (
				<>
					<div className="md:px-10 lg:px-12">
						<Link
							href={"/"}
							className="text-sm mb-6 rounded-full bg-primary flex items-center gap-1 w-max px-3 py-1 text-white">
							<ArrowLeft className="w-4 h-4" />
							<span>Back</span>
						</Link>
						{isLoading ? (
							<Skeleton type="cocktail-detail" />
						) : (
							data && <CocktailDetail cocktail={data[0]} />
						)}
					</div>

					{data && <SimilarCocktails ingredient={data[0]?.ingredients[0]} />}
				</>
			)}
		</section>
	);
}
