import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const type = searchParams.get("type");
	const key = searchParams.get("key");

	const res = await fetch(
		`${process.env.COCKTAIL_API_URL}/search.php?${type}=${key}`,
	);
	const data = await res.json();

	return NextResponse.json(data);
}
