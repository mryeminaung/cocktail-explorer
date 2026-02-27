"use client";

import CocktailCard from "@/components/cocktail-card";
import Skeleton from "@/components/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Drink } from "@/types/cocktail";
import { useQuery } from "@tanstack/react-query";
import { Flame, GlassWater, Wine, X } from "lucide-react";
import { useState } from "react";
import { categories, glasses, types } from "../constants";

type FilterCardProps = {
	title: string;
	options: { id: number; name: string }[];
	setFilterKey: (name: string) => void;
	info: string;
	filterKey: string;
	isLoading: boolean;
	icon?: React.ReactNode;
	countInfo: string;
	drinks?: Drink[];
};

function FilterCard({
	title,
	options,
	filterKey,
	setFilterKey,
	isLoading,
	info,
	icon,
	countInfo,
	drinks,
}: FilterCardProps) {
	return (
		<>
			<Card className="p-3 gap-2 my-5">
				<div className="flex items-center justify-between">
					<h3 className="text-md uppercase font-semibold">{title}</h3>
					{filterKey && (
						<Badge
							className="hover:cursor-default"
							onClick={() => setFilterKey("")}>
							Clear
							<X size={16} />
						</Badge>
					)}
				</div>

				<div className="flex flex-wrap gap-2">
					{options.map((option) => (
						<Button
							onClick={() => setFilterKey(option.name)}
							key={option.id}
							size={"sm"}
							className={cn(
								"p-4 border rounded-full text-sm",
								option.name === filterKey
									? "bg-primary text-primary-foreground"
									: "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary",
							)}>
							{option.name}
						</Button>
					))}
				</div>
			</Card>
			{drinks !== undefined && (
				<>
					<div className="flex items-center justify-between">
						<h3 className="text-2xl">{filterKey}</h3>
						<Badge>{drinks.length} results</Badge>
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-5">
						{drinks.length > 0 &&
							drinks.map((drink) => (
								<CocktailCard
									key={drink.idDrink}
									cocktail={drink}
								/>
							))}
					</div>
				</>
			)}

			{isLoading && (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 my-5">
					{Array.from({ length: 8 }).map((_, idx) => (
						<Skeleton
							key={idx}
							type="cocktail-card"
						/>
					))}
				</div>
			)}

			{!filterKey && (
				<Card className="border text-muted-foreground border-dashed border-primary items-center py-20 gap-0">
					<span className="rounded-full bg-primary-foreground p-4">{icon}</span>
					<p>{info}</p>
					<p className="text-sm">{countInfo}</p>
				</Card>
			)}
		</>
	);
}

export default function BrowseCocktails() {
	const [activeTab, setActiveTab] = useState<"category" | "glass" | "type">(
		"category",
	);
	const [filterKey, setFilterKey] = useState<string>("");

	const fetchDrinks = async () => {
		let filterType = "";
		const filterMap = {
			category: "c",
			glass: "g",
			type: "a",
		};
		filterType = filterMap[activeTab];

		const res = await fetch(
			`/api/cocktails/filter?type=${filterType}&key=${filterKey}`,
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
			<div className="flex items-center flex-wrap gap-3 my-5">
				<Button
					onClick={() => {
						setActiveTab("category");
						setFilterKey("");
					}}
					className={cn(
						"py-5 px-8! rounded-full",
						activeTab === "category"
							? "bg-primary text-primary-foreground"
							: "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary",
					)}>
					<Wine className="mr-1 size-4" />
					By Category
				</Button>
				<Button
					onClick={() => {
						setActiveTab("glass");
						setFilterKey("");
					}}
					className={cn(
						"py-5! px-8! rounded-full",
						activeTab === "glass"
							? "bg-primary text-primary-foreground"
							: "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary",
					)}>
					<GlassWater className="mr-1 size-4" />
					By Glass
				</Button>
				<Button
					onClick={() => {
						setActiveTab("type");
						setFilterKey("");
					}}
					className={cn(
						"py-5 px-8! rounded-full",
						activeTab === "type"
							? "bg-primary text-primary-foreground"
							: "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary",
					)}>
					<Flame className="mr-1 size-4" />
					By Type
				</Button>
			</div>

			{activeTab === "category" && (
				<FilterCard
					title="Category"
					options={categories}
					setFilterKey={setFilterKey}
					drinks={data?.drinks}
					isLoading={isLoading}
					filterKey={filterKey}
					icon={<Wine size={24} />}
					info="Select a filter above to discover cocktails"
					countInfo={`Browse through ${categories.length} options in the category`}
				/>
			)}

			{activeTab === "glass" && (
				<FilterCard
					title="Glass Type"
					options={glasses}
					setFilterKey={setFilterKey}
					drinks={data?.drinks}
					isLoading={isLoading}
					filterKey={filterKey}
					icon={<GlassWater size={24} />}
					info="Select a filter above to discover cocktails"
					countInfo={`Browse through ${glasses.length} options in the glass type`}
				/>
			)}

			{activeTab === "type" && (
				<FilterCard
					title="Type"
					options={types}
					setFilterKey={setFilterKey}
					drinks={data?.drinks}
					isLoading={isLoading}
					filterKey={filterKey}
					icon={<Flame size={24} />}
					info="Select a filter above to discover cocktails"
					countInfo={`Browse through ${types.length} options in the type`}
				/>
			)}
		</section>
	);
}
