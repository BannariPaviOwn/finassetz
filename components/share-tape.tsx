"use client";

import { formatNum, formatSigned } from "@/lib/format";
import type { TapeResponse } from "@/lib/types";
import { useEffect, useState } from "react";

export function ShareTape() {
  const [data, setData] = useState<TapeResponse | null>(null);

  useEffect(() => {
    let stop = false;

    async function pull() {
      try {
        const response = await fetch("/api/tape", { cache: "no-store" });
        if (!response.ok || stop) return;
        const next = (await response.json()) as TapeResponse;
        if (next.ok) setData(next);
      } catch {
        /* Keep the last tape on screen. */
      }
    }

    pull();
    const timer = window.setInterval(pull, 60_000);
    return () => {
      stop = true;
      window.clearInterval(timer);
    };
  }, []);

  const shares = data?.shares ?? [];

  return (
    <section className="share-tape" aria-label="Nifty 50 share prices">
      <p className="tape-label">Nifty 50</p>
      {shares.length ? (
        <div className="tape-window">
          <div className="tape-track">
            {[0, 1].map((copy) => (
              <div className="tape-set" key={copy} aria-hidden={copy === 1}>
                {shares.map((share) => {
                  const tone = share.change > 0 ? "up" : share.change < 0 ? "down" : "flat";
                  return (
                    <span className="tape-item" key={`${copy}-${share.symbol}`}>
                      <strong>{share.symbol}</strong>
                      <span className="tape-price">{formatNum(share.price)}</span>
                      <span className={`tape-change ${tone}`}>
                        {formatSigned(share.change)} ({formatSigned(share.changePercent)}%)
                      </span>
                    </span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="tape-wait">Loading Nifty 50 shares…</p>
      )}
    </section>
  );
}
