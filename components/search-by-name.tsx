import { Search } from "lucide-react";
import { useRef } from "react";
import { Input } from "./ui/input";

type SearchByNameProps = {
	setFilterKey: (key: string) => void;
};

export default function SearchByName({ setFilterKey }: SearchByNameProps) {
	const debounceRef = useRef<NodeJS.Timeout | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			setFilterKey(value);
		}, 300);
	};

	return (
		<div className="relative w-full">
			<Search
				className="absolute top-3 left-2 text-muted-foreground"
				size={20}
			/>
			<Input
				className="pl-10 py-5 bg-white"
				placeholder="Search By cocktail name..."
				onChange={handleChange}
			/>
		</div>
	);
}
