import { getMarkets } from "@/lib/markets";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getMarkets();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=30, s-maxage=60" },
  });
}
