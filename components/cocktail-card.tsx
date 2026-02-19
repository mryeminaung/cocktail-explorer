import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import AddToFavorite from "./add-to-favorite";

export default function CocktailCard({ cocktail }: { cocktail: any }) {
	return (
		<Card className="relative overflow-hidden p-0 group hover:cursor-pointer">
			<Image
				src={cocktail.strDrinkThumb}
				alt="Event cover"
				width={100}
				height={50}
				className="object-cover w-full transition-transform duration-300 group-hover:scale-110"
			/>
			<AddToFavorite className="absolute top-2 right-2" />
			<CardTitle className="absolute z-100 bottom-3 left-3 sm:bottom-5 sm:left-5 text-white text-[13px] sm:text-sm">
				{cocktail.strDrink}
			</CardTitle>
		</Card>
	);
}
