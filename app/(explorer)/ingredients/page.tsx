import IngredientsPage from "@/features/ingredients";

export default async function Ingredients({
	searchParams,
}: {
	searchParams: Promise<{ q?: string }>;
}) {
	const { q } = await searchParams;
	const ingredientQuery = q || "";

	return <IngredientsPage initialQuery={ingredientQuery} />;
}
