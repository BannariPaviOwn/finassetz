"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { services } from "@/components/services";

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const titleId = useId();
  const service = active === null ? null : services[active];

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("service-open");
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove("service-open");
      window.removeEventListener("keydown", onKey);
      cardRefs.current[active]?.focus();
    };
  }, [active]);

  return (
    <section className="section section-ice" id="services">
      <div className="wrap">
        <p className="eyebrow">04 — What we distribute</p>
        <div className="section-head">
          <h2>Products and services</h2>
          <p>Need-based distribution across funds, fixed income, markets, insurance and tax planning.</p>
        </div>
        <div className="service-grid">
          {services.map((item, index) => (
            <button
              className="service"
              key={item.slug}
              type="button"
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              onClick={() => setActive(index)}
            >
              <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <span className="service-more">Know more</span>
            </button>
          ))}
        </div>
      </div>
      {service
        ? createPortal(
            <div className="service-modal" onClick={() => setActive(null)}>
              <div
                className="service-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  className="service-close"
                  type="button"
                  aria-label="Close"
                  ref={closeRef}
                  onClick={() => setActive(null)}
                >
                  ×
                </button>
                <img src={service.image} alt={service.imageAlt} />
                <div className="service-dialog-body">
                  <p className="eyebrow">{String((active ?? 0) + 1).padStart(2, "0")} — The process</p>
                  <h3 id={titleId}>{service.title}</h3>
                  <p className="service-summary">{service.summary}</p>
                  <ol className="service-steps">
                    {service.steps.map((step, index) => (
                      <li key={step.title}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <strong>{step.title}</strong>
                          <p>{step.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="service-note">{service.note}</p>
                  <a className="btn btn-solid" href="#contact" onClick={() => setActive(null)}>
                    Speak with us
                  </a>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
