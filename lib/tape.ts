import { formatWhen } from "@/lib/format";
import type { TapeResponse } from "@/lib/types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

const LIST_URLS = [
  "https://archives.nseindia.com/content/indices/ind_nifty50list.csv",
  "https://www.niftyindices.com/IndexConstituent/ind_nifty50list.csv",
];

const LIST_TTL = 12 * 60 * 60 * 1000;
const PRICE_TTL = 60_000;

/** Last confirmed Nifty 50 symbols, used only if the official file cannot be read. */
const FALLBACK = [
  "ADANIENT",
  "ADANIPORTS",
  "APOLLOHOSP",
  "ASIANPAINT",
  "AXISBANK",
  "BSE",
  "BAJAJ-AUTO",
  "BAJFINANCE",
  "BAJAJFINSV",
  "BEL",
  "BHARTIARTL",
  "CIPLA",
  "COALINDIA",
  "DRREDDY",
  "EICHERMOT",
  "ETERNAL",
  "GRASIM",
  "HCLTECH",
  "HDFCBANK",
  "HDFCLIFE",
  "HINDALCO",
  "HINDUNILVR",
  "ICICIBANK",
  "ITC",
  "INFY",
  "INDIGO",
  "JSWSTEEL",
  "JIOFIN",
  "KOTAKBANK",
  "LT",
  "M&M",
  "MARUTI",
  "MAXHEALTH",
  "NTPC",
  "NESTLEIND",
  "ONGC",
  "POWERGRID",
  "RELIANCE",
  "SBILIFE",
  "SHRIRAMFIN",
  "SBIN",
  "SUNPHARMA",
  "TCS",
  "TATACONSUM",
  "TMPV",
  "TATASTEEL",
  "TECHM",
  "TITAN",
  "TRENT",
  "ULTRACEMCO",
];

type Memory = {
  __faTapeList?: { at: number; symbols: string[] };
  __faTape?: { at: number; data: TapeResponse };
};

const memory = globalThis as typeof globalThis & Memory;

function symbolsFromCsv(csv: string) {
  const symbols: string[] = [];
  for (const line of csv.split(/\r?\n/)) {
    const match = line.match(/,([A-Z][A-Z0-9&-]{1,15}),EQ,/);
    if (match) symbols.push(match[1]);
  }
  return symbols;
}

async function constituentSymbols() {
  const hit = memory.__faTapeList;
  if (hit && Date.now() - hit.at < LIST_TTL && hit.symbols.length >= 40) return hit.symbols;

  for (const url of LIST_URLS) {
    try {
      const response = await fetch(url, {
        cache: "no-store",
        headers: { "User-Agent": UA, Accept: "text/csv" },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) continue;
      const symbols = symbolsFromCsv(await response.text());
      if (symbols.length >= 40) {
        memory.__faTapeList = { at: Date.now(), symbols };
        return symbols;
      }
    } catch {
      /* Try the next official file. */
    }
  }

  return hit?.symbols?.length ? hit.symbols : FALLBACK;
}

async function quote(symbol: string) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(`${symbol}.NS`)}?interval=1d&range=1d&includePrePost=false`;
  const response = await fetch(url, {
    cache: "no-store",
    headers: { "User-Agent": UA, Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return null;
  const body = await response.json();
  const meta = body?.chart?.result?.[0]?.meta;
  const price = meta?.regularMarketPrice;
  const previous = meta?.chartPreviousClose ?? meta?.previousClose;
  if (typeof price !== "number" || typeof previous !== "number" || price <= 0 || previous <= 0) return null;
  return {
    symbol,
    price,
    change: price - previous,
    changePercent: ((price - previous) / previous) * 100,
  };
}

async function mapPool<T, R>(items: T[], limit: number, task: (item: T) => Promise<R>) {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await task(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

async function load(): Promise<TapeResponse> {
  const symbols = await constituentSymbols();
  const quotes = await mapPool(symbols, 8, (symbol) => quote(symbol).catch(() => null));
  const shares = quotes.filter((item): item is NonNullable<typeof item> => item != null);
  return {
    ok: shares.length > 0,
    updatedAt: formatWhen(new Date()),
    source: "Nifty 50 constituent list, NSE Indices",
    shares,
    notice:
      "Nifty 50 shares. The names come from the current NSE Indices constituent file. Prices are delayed public quotes.",
  };
}

export async function getTape(): Promise<TapeResponse> {
  const hit = memory.__faTape;
  if (hit && Date.now() - hit.at < PRICE_TTL && hit.data.shares.length > 0) return hit.data;
  try {
    const data = await load();
    if (data.ok) memory.__faTape = { at: Date.now(), data };
    else if (hit) return hit.data;
    return data;
  } catch {
    if (hit) return hit.data;
    return {
      ok: false,
      updatedAt: formatWhen(new Date()),
      source: "Nifty 50 constituent list, NSE Indices",
      shares: [],
      notice: "Nifty 50 share prices are temporarily unavailable.",
    };
  }
}
