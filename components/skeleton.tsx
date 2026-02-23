export default function Skeleton({
	type,
}: {
	type: "random" | "cocktail-card";
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

	return (
		<div className="relative animate-pulse rounded-lg bg-gray-100">
			<div className="h-32 bg-gray-300 rounded mb-3" />
		</div>
	);
}
