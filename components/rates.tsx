"use client";

import type { RatesResponse } from "@/lib/types";
import { useState } from "react";

export function RatesBoard({ initial }: { initial: RatesResponse }) {
  const [data, setData] = useState(initial);
  const [open, setOpen] = useState(initial.groups[0]?.id ?? "policy");
  const [refreshing, setRefreshing] = useState(false);

  async function refresh() {
    setRefreshing(true);
    try {
      const response = await fetch("/api/rates", { cache: "no-store" });
      if (!response.ok) return;
      const next = (await response.json()) as RatesResponse;
      if (next.ok && next.groups.length) {
        setData(next);
        setOpen((current) => (next.groups.some((group) => group.id === current) ? current : next.groups[0].id));
      }
    } catch {
      /* Keep the rates already on screen. */
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <section className="section section-ice" id="rates">
      <div className="wrap rates-layout">
        <div className="rates-copy">
          <p className="eyebrow">02 — Current rates</p>
          <h2>RBI reference desk</h2>
          <p className="lede">
            Policy rates, reserve ratios, reference exchange rates and lending rates, read from the
            Reserve Bank of India.
          </p>
          <p className="fine">
            {data.notice} Last checked {data.updatedAt}.{" "}
            <a href={data.source} target="_blank" rel="noopener noreferrer">
              rbi.org.in
            </a>
          </p>
          <button className="btn btn-line refresh-btn" type="button" onClick={refresh} disabled={refreshing}>
            {refreshing ? "Checking RBI…" : "Check RBI again"}
          </button>
        </div>
        <div className="acc">
          {data.groups.map((group, index) => {
            const expanded = open === group.id;
            return (
              <div className={expanded ? "acc-item open" : "acc-item"} key={group.id}>
                <button
                  className="acc-head"
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? "" : group.id)}
                >
                  <span className="acc-index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="acc-title">{group.title}</span>
                  <svg viewBox="0 0 20 20" aria-hidden>
                    <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>
                <div className="acc-panel" aria-hidden={!expanded}>
                  <div className="acc-inner">
                    {group.rows.map((row) => (
                      <div className="rate-row" key={row.label}>
                        <span>{row.label}</span>
                        <strong>{row.value}</strong>
                      </div>
                    ))}
                    {group.note ? <p className="acc-note">{group.note}</p> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
