"use client";

import { site } from "@/lib/site";
import { useState } from "react";

const links = [
  ["Markets", "#markets"],
  ["Rates", "#rates"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Leadership", "#leadership"],
  ["Contact", "#contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <a className="brand" href="#top">
        <span className="mark" aria-hidden>
          <svg viewBox="0 0 32 32">
            <path d="M8 23.5 13.2 11" />
            <path d="M14.2 25 19.6 9.5" />
            <path d="M20.4 26.5 26.2 8" />
          </svg>
        </span>
        <span>
          <strong>FinAssetZ</strong>
          <small>Investment Services</small>
        </span>
      </a>
      <nav className="nav-desktop" aria-label="Primary">
        {links.map(([label, href]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <a className="btn btn-solid" href={site.login} target="_blank" rel="noopener noreferrer">
          Client login
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>
      {open ? (
        <nav className="nav-panel" aria-label="Mobile">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <a href={site.login} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Client login
          </a>
        </nav>
      ) : null}
    </header>
  );
}
