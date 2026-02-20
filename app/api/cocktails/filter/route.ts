import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const type = searchParams.get("type");
	const key = searchParams.get("key");

	const res = await fetch(
		`${process.env.COCKTAIL_API_URL}/filter.php?${type}=${key}`,
	);
	const data = await res.json();

	return NextResponse.json(data);
}
