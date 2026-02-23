import { Card, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import AddToFavorite from "./add-to-favorite";

type CocktailCardProps = {
	cocktail: {
		strDrink: string;
		strDrinkThumb: string;
		idDrink: string;
		[key: string]: string | undefined;
	};
};

export default function CocktailCard({ cocktail }: CocktailCardProps) {
	const drink = {
		strDrink: cocktail.strDrink,
		strDrinkThumb: cocktail.strDrinkThumb,
		idDrink: cocktail.idDrink,
	};

	return (
		<Card className="relative overflow-hidden p-0 group hover:cursor-pointer">
			<Image
				src={cocktail.strDrinkThumb}
				alt="Event cover"
				width={100}
				height={50}
				className="object-cover w-full transition-transform duration-300 group-hover:scale-110"
			/>
			<AddToFavorite
				cocktail={drink}
				className="absolute top-2 right-2"
			/>
			<CardTitle className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-primary bg-white px-2 rounded-full font-serif text-[12px] sm:text-sm font-medium">
				{cocktail.strDrink}
			</CardTitle>
		</Card>
	);
}
