import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const letter = searchParams.get("letter");

	const res = await fetch(
		`${process.env.COCKTAIL_API_URL}/search.php?f=${letter}`,
	);

	const data = await res.json();

	return NextResponse.json(data);
}
