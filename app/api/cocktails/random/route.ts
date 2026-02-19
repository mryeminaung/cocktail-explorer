import { NextResponse } from "next/server";

export async function GET() {
	const res = await fetch(`${process.env.COCKTAIL_API_URL}/random.php`);
	const data = await res.json();

	return NextResponse.json(data);
}
