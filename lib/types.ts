export type Quote = {
  symbol: string;
  name: string;
  shortName: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  open: number | null;
  high: number | null;
  low: number | null;
  previousClose: number | null;
  fiftyTwoWeekHigh: number | null;
  fiftyTwoWeekLow: number | null;
  asOf: string;
  spark: number[];
};

export type TapeQuote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

export type TapeResponse = {
  ok: boolean;
  updatedAt: string;
  source: string;
  shares: TapeQuote[];
  notice: string;
};

export type MarketsResponse = {
  ok: boolean;
  updatedAt: string;
  indices: Quote[];
  notice: string;
};

export type RateRow = { label: string; value: string };

export type RateGroup = {
  id: string;
  title: string;
  rows: RateRow[];
  note?: string;
};

export type RatesResponse = {
  ok: boolean;
  live: boolean;
  updatedAt: string;
  source: string;
  groups: RateGroup[];
  notice: string;
};
