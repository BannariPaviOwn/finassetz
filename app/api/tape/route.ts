import { getTape } from "@/lib/tape";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getTape();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=30, s-maxage=60" },
  });
}
