"use client";

import { formatNum, formatSigned } from "@/lib/format";
import type { TapeResponse } from "@/lib/types";
import { useEffect, useState } from "react";

const TIMEOUT_MS = 20_000;

export function ShareTape() {
  const [data, setData] = useState<TapeResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [notice, setNotice] = useState("Nifty 50 share prices are temporarily unavailable.");

  useEffect(() => {
    let stop = false;

    async function pull() {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
      try {
        const response = await fetch("/api/tape", { cache: "no-store", signal: controller.signal });
        const next = (await response.json()) as TapeResponse;
        if (stop) return;
        if (!response.ok || !next.ok || next.shares.length === 0) {
          setNotice(next.notice || "Nifty 50 share prices are temporarily unavailable.");
          setStatus((current) => (current === "ready" ? "ready" : "error"));
          return;
        }
        setData(next);
        setStatus("ready");
      } catch {
        if (stop) return;
        setNotice("Nifty 50 share prices could not be loaded. They will be tried again in a minute.");
        setStatus((current) => (current === "ready" ? "ready" : "error"));
      } finally {
        window.clearTimeout(timer);
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
        <p className={status === "error" ? "tape-wait tape-error" : "tape-wait"} role={status === "error" ? "alert" : "status"}>
          {status === "error" ? notice : "Loading Nifty 50 shares…"}
        </p>
      )}
    </section>
  );
}
