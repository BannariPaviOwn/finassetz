import { formatWhen } from "@/lib/format";
import type { RateGroup, RateRow, RatesResponse } from "@/lib/types";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

const SOURCE = "https://www.rbi.org.in/";
const TTL = 60 * 60 * 1000;

type Cache = { at: number; data: RatesResponse };
const memory = globalThis as typeof globalThis & { __faRates?: Cache };

function decode(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function valueAfter(text: string, label: string) {
  const idx = text.toLowerCase().indexOf(label.toLowerCase());
  if (idx < 0) return null;
  const slice = text.slice(idx + label.length, idx + label.length + 56);
  const match = slice.match(
    /^\s*:?\s*(-\s*%|[+\-–]?\d[\d,]*(?:\.\d+)?(?:\s*%?\s*[–-]\s*\d[\d,]*(?:\.\d+)?\s*%?|\s*%)?)/,
  );
  if (!match) return null;
  return match[1].replace(/\s+/g, " ").replace(/\s%/g, "%").trim();
}

function rows(text: string, pairs: Array<[string, string]>) {
  const parsed: RateRow[] = [];
  for (const [label, needle] of pairs) {
    const value = valueAfter(text, needle);
    if (value && value !== "-%" && value !== "–%") parsed.push({ label, value });
  }
  return parsed;
}

function gsecRows(text: string): RateRow[] {
  const found: RateRow[] = [];
  const re = /(\d+\.\d+%\s*GS\s*\d{4})\s*:?\s*(\d+\.\d+\s*%)/gi;
  for (const match of text.matchAll(re)) {
    found.push({ label: match[1].replace(/\s+/g, " "), value: match[2].replace(/\s+/g, "") });
  }
  return found;
}

export function parseRates(text: string): RateGroup[] {
  const anchor = text.toLowerCase().indexOf("policy repo rate");
  const window = anchor >= 0 ? text.slice(Math.max(0, anchor - 40), anchor + 8000) : text;
  const asAt = window.match(/As at[^()]{0,80}/i)?.[0]?.trim();

  const groups: RateGroup[] = [
    {
      id: "policy",
      title: "Policy Rates",
      rows: rows(window, [
        ["Policy Repo Rate", "Policy Repo Rate"],
        ["Standing Deposit Facility Rate", "Standing Deposit Facility Rate"],
        ["Marginal Standing Facility Rate", "Marginal Standing Facility Rate"],
        ["Bank Rate", "Bank Rate"],
        ["Fixed Reverse Repo Rate", "Fixed Reverse Repo Rate"],
      ]),
    },
    {
      id: "reserves",
      title: "Reserve Ratios",
      rows: rows(window, [
        ["Cash Reserve Ratio (CRR)", "CRR"],
        ["Statutory Liquidity Ratio (SLR)", "SLR"],
      ]),
    },
    {
      id: "exchange",
      title: "Exchange Rates",
      note: asAt ? `${asAt} (Source: FBIL)` : "Reference rates published by RBI (Source: FBIL).",
      rows: rows(window, [
        ["INR / 1 USD", "INR / 1 USD"],
        ["INR / 1 GBP", "INR / 1 GBP"],
        ["INR / 1 EUR", "INR / 1 EUR"],
        ["INR / 100 JPY", "INR / 100 JPY"],
        ["INR / 1 AED", "INR / 1 AED"],
      ]),
    },
    {
      id: "lending",
      title: "Lending / Deposit Rates",
      rows: rows(window, [
        ["Base Rate", "Base Rate"],
        ["MCLR (Overnight)", "MCLR (Overnight)"],
        ["Savings Deposit Rate", "Savings Deposit Rate"],
        ["Term Deposit Rate > 1 Year", "Term Deposit Rate > 1 Year"],
      ]),
    },
    {
      id: "trends",
      title: "Market Trends",
      note: "Reference figures as published by RBI, with RBI’s own as-of dates. These are not live market ticks.",
      rows: [
        ...rows(window, [
          ["Call Rates", "Call Rates"],
          ["91 day T-bills", "91 day T-bills"],
          ["182 day T-bills", "182 day T-bills"],
          ["364 day T-bills", "364 day T-bills"],
        ]),
        ...gsecRows(window),
      ],
    },
  ];

  return groups.filter((group) => group.rows.length > 0);
}

function fallback(): RatesResponse {
  return {
    ok: true,
    live: false,
    updatedAt: "12 Oct 2026",
    source: SOURCE,
    notice:
      "Showing the latest confirmed reading from the RBI homepage (12 October 2026). A live read was not available just now.",
    groups: [
      {
        id: "policy",
        title: "Policy Rates",
        rows: [
          { label: "Policy Repo Rate", value: "5.50%" },
          { label: "Standing Deposit Facility Rate", value: "5.25%" },
          { label: "Marginal Standing Facility Rate", value: "5.75%" },
          { label: "Bank Rate", value: "5.75%" },
          { label: "Fixed Reverse Repo Rate", value: "3.35%" },
        ],
      },
      {
        id: "reserves",
        title: "Reserve Ratios",
        rows: [
          { label: "Cash Reserve Ratio (CRR)", value: "3.00%" },
          { label: "Statutory Liquidity Ratio (SLR)", value: "18.00%" },
        ],
      },
      {
        id: "exchange",
        title: "Exchange Rates",
        note: "As at 1.00 pm of October 12, 2026 (Source: FBIL)",
        rows: [
          { label: "INR / 1 USD", value: "95.7485" },
          { label: "INR / 1 GBP", value: "126.9185" },
          { label: "INR / 1 EUR", value: "107.3022" },
          { label: "INR / 100 JPY", value: "60.4600" },
          { label: "INR / 1 AED", value: "26.0686" },
        ],
      },
      {
        id: "lending",
        title: "Lending / Deposit Rates",
        rows: [
          { label: "Base Rate", value: "8.40% - 10.00%" },
          { label: "MCLR (Overnight)", value: "7.80% - 8.00%" },
          { label: "Savings Deposit Rate", value: "2.50%" },
          { label: "Term Deposit Rate > 1 Year", value: "6.00% - 6.75%" },
        ],
      },
    ],
  };
}

function acceptable(groups: RateGroup[]) {
  const policy = groups.find((group) => group.id === "policy");
  const repo = policy?.rows.find((row) => row.label === "Policy Repo Rate")?.value ?? "";
  return /^\d+(\.\d+)?%$/.test(repo.replace(/\s/g, ""));
}

async function load(): Promise<RatesResponse> {
  const response = await fetch(SOURCE, {
    cache: "no-store",
    headers: { "User-Agent": UA, Accept: "text/html" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) return fallback();
  const groups = parseRates(decode(await response.text()));
  if (!acceptable(groups)) return fallback();
  return {
    ok: true,
    live: true,
    updatedAt: formatWhen(new Date()),
    source: SOURCE,
    groups,
    notice: "Read from the Reserve Bank of India homepage. Policy rates change only when the Monetary Policy Committee changes them.",
  };
}

export async function getRates(): Promise<RatesResponse> {
  const hit = memory.__faRates;
  if (hit && Date.now() - hit.at < TTL) return hit.data;
  try {
    const data = await load();
    if (data.live) memory.__faRates = { at: Date.now(), data };
    else if (hit) return hit.data;
    return data;
  } catch {
    if (hit) return hit.data;
    return fallback();
  }
}
