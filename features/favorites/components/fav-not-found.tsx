import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavNotFound() {
	return (
		<div className="flex items-center flex-col py-20">
			<Heart className="text-primary cursor-pointer size-4 md:size-12" />
			<h3 className="font-semibold text-lg">No favorites yet</h3>
			<p className="max-w-105 my-3 text-sm text-center text-muted-foreground">
				Start exploring cocktails and tap the heart icon to save your favorite
				drinks here.
			</p>
			<Link
				className="bg-primary text-sm font-mono px-5 rounded-lg text-white py-2"
				href={"/browse"}>
				Explore Cocktails
			</Link>
		</div>
	);
}
