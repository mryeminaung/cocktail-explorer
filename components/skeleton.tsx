export default function Skeleton({
	type,
}: {
	type: "random" | "cocktail-card" | "ingredient-card" | "cocktail-detail";
}) {
	if (type === "random") {
		return (
			<div className="animate-pulse p-4 rounded-lg bg-gray-100 w-full max-w-md mx-auto">
				<div className="h-48 bg-gray-300 rounded mb-4" />
				<div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
				<div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
				<div className="h-4 bg-gray-200 rounded w-1/3" />
			</div>
		);
	}

	if (type === "cocktail-detail") {
		return (
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 animate-pulse">
				{/* LEFT SIDE - Image Skeleton */}
				<div>
					<div className="rounded-2xl w-full h-65 sm:h-80 md:h-95 lg:h-105 bg-primary" />
				</div>

				{/* RIGHT SIDE */}
				<div className="space-y-6">
					{/* Title & Heart */}
					<div className="flex justify-between items-start gap-4">
						<div className="h-8 sm:h-10 lg:h-12 w-3/4 bg-primary rounded-md" />
						<div className="w-6 h-6 sm:w-7 sm:h-7 bg-primary rounded-full" />
					</div>

					{/* Category, Alcoholic, Glass */}
					<div className="flex flex-wrap gap-2 sm:gap-3">
						<div className="h-6 w-20 sm:w-24 bg-primary rounded-xl" />
						<div className="h-6 w-20 sm:w-24 bg-primary rounded-xl" />
						<div className="h-6 w-20 sm:w-24 bg-primary rounded-xl" />
					</div>

					{/* Tags */}
					<div className="flex flex-wrap gap-2 mb-6">
						<div className="h-5 w-16 bg-primary/20 rounded-md" />
						<div className="h-5 w-16 bg-primary/20 rounded-md" />
					</div>

					{/* Instructions */}
					<div className="space-y-2">
						<div className="h-5 bg-primary rounded-md" />
					</div>

					{/* Ingredients */}
					<div className="space-y-4">
						{[...Array(2)].map((_, i) => (
							<div
								key={i}
								className="flex items-center gap-4 p-4 rounded-xl border bg-primary/30">
								<div className="w-10 h-10 rounded-md bg-primary" />
								<div className="flex-1 space-y-1">
									<div className="h-4 w-3/4 bg-primary rounded-md" />
									<div className="h-3 w-1/2 bg-primary rounded-md" />
								</div>
								<div className="w-4 h-4 bg-primary rounded-full" />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (type === "ingredient-card") {
		return (
			<div className="flex items-center mb-1 py-1 rounded-md gap-x-2 pl-2 animate-pulse">
				<div className="h-8 w-8 bg-primary/10 rounded-md" />
				<div className="h-4 w-full bg-primary/10 rounded-md" />
			</div>
		);
	}

	return (
		<div className="relative animate-pulse h-40 rounded-lg bg-primary">
			<div className="absolute bottom-3 left-3 py-3 w-25 rounded" />
		</div>
	);
}
