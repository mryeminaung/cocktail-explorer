import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

export default function AddToFavorite({ className }: { className?: string }) {
	return (
		<div className={cn("p-2 rounded-full bg-white/80", className)}>
			<Heart
				className="cursor-pointer size-4 md:size-7"
				onClick={() => console.log("Add to Fav")}
			/>
		</div>
	);
}
