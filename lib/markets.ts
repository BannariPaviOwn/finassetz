import { formatWhen } from "@/lib/format";
import type { MarketsResponse, Quote } from "@/lib/types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

const TTL = 60_000;

type Cache = { at: number; data: MarketsResponse };

const memory = globalThis as typeof globalThis & { __faMarkets?: Cache };

const WATCH = [
  { symbol: "^NSEI", name: "Nifty 50", shortName: "NIFTY", exchange: "NSE" },
  { symbol: "^BSESN", name: "S&P BSE Sensex", shortName: "SENSEX", exchange: "BSE" },
];

function empty(notice: string): MarketsResponse {
  return {
    ok: false,
    updatedAt: formatWhen(new Date()),
    indices: [],
    notice,
  };
}

function sample(values: number[], max = 36) {
  const clean = values.filter((n) => Number.isFinite(n));
  if (clean.length <= max) return clean;
  const step = (clean.length - 1) / (max - 1);
  return Array.from({ length: max }, (_, i) => clean[Math.round(i * step)]);
}

function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

async function readChart(symbol: string, interval: string, range: string) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}&includePrePost=false`;
  const response = await fetch(url, {
    cache: "no-store",
    headers: { "User-Agent": UA, Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return null;
  const body = await response.json();
  return body?.chart?.result?.[0] ?? null;
}

function lastNumber(values: unknown): number | null {
  if (!Array.isArray(values)) return null;
  for (let i = values.length - 1; i >= 0; i -= 1) {
    const value = num(values[i]);
    if (value != null) return value;
  }
  return null;
}

async function fetchQuote(item: (typeof WATCH)[number]): Promise<Quote | null> {
  const [intraday, daily] = await Promise.all([
    readChart(item.symbol, "5m", "1d"),
    readChart(item.symbol, "1d", "5d"),
  ]);
  const result = intraday ?? daily;
  const meta = result?.meta;
  const price = num(meta?.regularMarketPrice);
  const previous = num(meta?.chartPreviousClose) ?? num(meta?.previousClose);
  if (!result || !meta || price == null || previous == null || price <= 0) return null;

  const closes: number[] = intraday?.indicators?.quote?.[0]?.close ?? [];
  const day = daily?.indicators?.quote?.[0];
  const open = lastNumber(day?.open) ?? num(meta?.regularMarketOpen);
  const asOfMs = (num(meta?.regularMarketTime) ?? Date.now() / 1000) * 1000;

  return {
    symbol: item.symbol,
    name: item.name,
    shortName: item.shortName,
    exchange: item.exchange,
    price,
    change: price - previous,
    changePercent: ((price - previous) / previous) * 100,
    open,
    high: num(meta?.regularMarketDayHigh),
    low: num(meta?.regularMarketDayLow),
    previousClose: previous,
    fiftyTwoWeekHigh: num(meta?.fiftyTwoWeekHigh),
    fiftyTwoWeekLow: num(meta?.fiftyTwoWeekLow),
    asOf: formatWhen(new Date(asOfMs)),
    spark: sample(closes),
  };
}

async function load(): Promise<MarketsResponse> {
  const quotes = await Promise.all(WATCH.map((item) => fetchQuote(item).catch(() => null)));
  const indices = quotes.filter((quote): quote is Quote => quote != null);
  if (!indices.length) {
    return empty("Nifty and Sensex quotes are temporarily unavailable.");
  }
  const updatedAt = formatWhen(new Date());
  return {
    ok: true,
    updatedAt,
    indices: indices.map((quote) => ({ ...quote, asOf: updatedAt })),
    notice:
      "Delayed public quotes for Nifty 50 and S&P BSE Sensex, checked together. Refreshed about once a minute. For information only — not a live exchange feed and not investment advice.",
  };
}

export async function getMarkets(): Promise<MarketsResponse> {
  const hit = memory.__faMarkets;
  if (hit && Date.now() - hit.at < TTL) return hit.data;
  try {
    const data = await load();
    if (data.ok) memory.__faMarkets = { at: Date.now(), data };
    else if (hit) return hit.data;
    return data;
  } catch {
    if (hit) return hit.data;
    return empty("Nifty and Sensex quotes are temporarily unavailable.");
  }
}
