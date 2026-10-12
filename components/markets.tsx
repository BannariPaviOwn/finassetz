"use client";

import { formatNum, formatSigned } from "@/lib/format";
import { site } from "@/lib/site";
import type { MarketsResponse, Quote } from "@/lib/types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type MarketState = {
  data: MarketsResponse;
  refreshing: boolean;
  refresh: () => void;
};

const MarketContext = createContext<MarketState | null>(null);

function useMarkets() {
  const value = useContext(MarketContext);
  if (!value) throw new Error("Market data is unavailable");
  return value;
}

export function MarketProvider({
  initial,
  children,
}: {
  initial: MarketsResponse;
  children: React.ReactNode;
}) {
  const [data, setData] = useState(initial);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/api/markets", { cache: "no-store" });
      if (!response.ok) return;
      const next = (await response.json()) as MarketsResponse;
      if (next.ok) setData(next);
    } catch {
      /* Keep the last good quote on screen. */
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(refresh, 60_000);
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  return (
    <MarketContext.Provider value={{ data, refreshing, refresh }}>{children}</MarketContext.Provider>
  );
}

function Spark({ values, up }: { values: number[]; up: boolean }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const width = 128;
  const height = 40;
  const path = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = max === min ? height / 2 : height - ((value - min) / (max - min)) * (height - 6) - 3;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg className="spark" viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <path d={path} fill="none" stroke={up ? "#067647" : "#B42318"} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Delta({ quote }: { quote: Quote }) {
  const up = quote.change > 0;
  const flat = quote.change === 0;
  return (
    <span className={flat ? "delta flat" : up ? "delta up" : "delta down"}>
      {formatSigned(quote.change)} ({formatSigned(quote.changePercent)}%)
    </span>
  );
}

export function Ticker() {
  const { data, refreshing, refresh } = useMarkets();

  return (
    <div className="ticker">
      <div className="ticker-track">
        {data.indices.length ? (
          data.indices.map((quote) => (
            <div className="tick" key={quote.symbol}>
              <span className="tick-name">{quote.shortName}</span>
              <span className="tick-price">{formatNum(quote.price)}</span>
              <Delta quote={quote} />
              <Spark values={quote.spark} up={quote.change >= 0} />
            </div>
          ))
        ) : (
          <p className="tick-empty">{data.notice}</p>
        )}
      </div>
      <div className="ticker-meta">
        <span>{data.indices[0]?.asOf ? `As of ${data.indices[0].asOf} IST` : "Quotes unavailable"}</span>
        <button type="button" onClick={refresh} disabled={refreshing}>
          {refreshing ? "Updating" : "Refresh"}
        </button>
      </div>
    </div>
  );
}

export function MarketBoard() {
  const { data } = useMarkets();

  return (
    <section className="section" id="markets">
      <div className="wrap">
        <p className="eyebrow">01 — Markets</p>
        <div className="section-head">
          <h2>Nifty and Sensex</h2>
          <p>
            Both indices update from a free delayed quote. Levels move through the session and stay
            on the last traded price after the close.
          </p>
        </div>
        {data.indices.length ? (
          <div className="market-grid">
            {data.indices.map((quote) => (
              <article className="quote-card" key={quote.symbol}>
                <div className="quote-top">
                  <div>
                    <p className="exchange">{quote.exchange}</p>
                    <h3>{quote.name}</h3>
                  </div>
                  <Spark values={quote.spark} up={quote.change >= 0} />
                </div>
                <p className="quote-price">{formatNum(quote.price)}</p>
                <Delta quote={quote} />
                <dl className="stats">
                  <div>
                    <dt>Open</dt>
                    <dd>{formatNum(quote.open)}</dd>
                  </div>
                  <div>
                    <dt>High</dt>
                    <dd>{formatNum(quote.high)}</dd>
                  </div>
                  <div>
                    <dt>Low</dt>
                    <dd>{formatNum(quote.low)}</dd>
                  </div>
                  <div>
                    <dt>Prev close</dt>
                    <dd>{formatNum(quote.previousClose)}</dd>
                  </div>
                </dl>
                <p className="range">
                  52-week {formatNum(quote.fiftyTwoWeekLow)} – {formatNum(quote.fiftyTwoWeekHigh)}
                </p>
                <p className="asof">As of {quote.asOf} IST</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="banner">{data.notice}</p>
        )}
        <div className="useful">
          <p>Useful sites</p>
          <ul>
            {site.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.linkedinCompany} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <p className="fine">{data.notice}</p>
      </div>
    </section>
  );
}
