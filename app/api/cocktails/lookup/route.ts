import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const cocktailId = searchParams.get("cocktailId");

	const res = await fetch(
		`${process.env.COCKTAIL_API_URL}/lookup.php?i=${cocktailId}`,
	);
	const data = await res.json();

	return NextResponse.json(data);
}
