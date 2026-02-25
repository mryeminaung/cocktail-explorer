import { redirect } from "next/navigation";

export default function CocktailPage() {
	redirect("/browse");
	return null;
}
