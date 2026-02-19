export type drinkType = {
	id: string;
	name: string;
	category: string;
	alcoholic: string;
	glass: string;
	instructions: string;
	thumbnail: string;
	ingredients: { name: string; measure: string }[];
};
