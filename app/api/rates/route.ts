import { getRates } from "@/lib/rates";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getRates();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=3600" },
  });
}
