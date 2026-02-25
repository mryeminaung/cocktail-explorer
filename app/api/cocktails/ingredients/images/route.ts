import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const ingredient = searchParams.get("ingredient");

	if (!ingredient) {
		return NextResponse.json(
			{ error: "Missing ingredient parameter" },
			{ status: 400 },
		);
	}

	const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredient}-small.png`;

	return NextResponse.json({ image: imageUrl });
}
