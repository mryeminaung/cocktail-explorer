import { Compass } from "lucide-react";
import BrowseCocktails from "./components/browse-cocktails";

export default function BrowsePage() {
	return (
		<>
			<div className="">
				<span className="flex items-center gap-x-2 text-primary tracking-wider font-semibold uppercase text-[12px]">
					<Compass size={18} /> Explore
				</span>
				<h2 className="text-5xl font-semibold font-serif">Browse Cocktails</h2>
				<p className="text-muted-foreground">
					Explore drinks by category, glass type, or alcoholic content
				</p>
			</div>
			<BrowseCocktails />
		</>
	);
}
