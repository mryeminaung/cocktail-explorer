import { cn } from "@/lib/utils";
import Image from "next/image";

type IngredientType = {
	name: string;
	thumbnail: string;
};

export default function IngredientCard({
	ingredient,
	currentIngredient,
	setIngredientQuery,
	setCurrentIngredient,
}: {
	ingredient: IngredientType;
	currentIngredient: IngredientType | null;
	setIngredientQuery: (query: string) => void;
	setCurrentIngredient: (ingredient: IngredientType) => void;
}) {
	return (
		<div
			className={cn(
				"flex items-center mb-1 py-1 rounded-md hover:cursor-pointer hover:bg-primary/10 transition-colors gap-x-2 pl-2",
				currentIngredient?.name === ingredient.name && "bg-primary/20",
			)}
			onClick={() => {
				setCurrentIngredient(ingredient);
			}}>
			<Image
				alt={ingredient.name}
				src={ingredient.thumbnail}
				width={30}
				height={10}
				className="h-8 w-auto bg-primary/10 rounded-md"
			/>
			<p>{ingredient.name}</p>
		</div>
	);
}
