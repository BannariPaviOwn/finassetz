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
          Fz
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
