import { site } from "@/lib/site";

const audiences = [
  "Individuals",
  "Corporates",
  "Institutions",
  "Trusts",
  "Family offices",
  "SMEs",
  "Non-resident Indians",
];

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">Chennai · Distribution & execution</p>
          <h1>
            <span>Aspire</span>
            <span className="plan">Plan</span>
            <span>Execute</span>
          </h1>
          <p className="lede">We assist in building a brighter future.</p>
          <p className="hero-copy">
            FinAssetZ Investment Services is a professionally managed practice in the distribution and
            execution of financial products, with need-based solutions for individuals, corporates,
            institutions, trusts, family offices, SMEs and non-resident Indians.
          </p>
          <div className="actions">
            <a className="btn btn-solid" href="#contact">
              Speak with us
            </a>
            <a className="btn btn-line" href={site.login} target="_blank" rel="noopener noreferrer">
              Client login
            </a>
          </div>
          <ul className="trust">
            <li>AMFI registered mutual fund distributor and SIF distributor</li>
            <li>APMI registered PMS distributor</li>
          </ul>
        </div>
        <aside className="hero-panel">
          <p>Who we work with</p>
          <ul>
            {audiences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="hero-hours">Client desk · 24×7</p>
        </aside>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="section about" id="about">
      <div className="wrap about-panel">
        <div>
          <p className="eyebrow">03 — The firm</p>
          <h2>About us</h2>
        </div>
        <div className="prose">
          <p>
            FinAssetZ Investment Services (FAIS) is a professionally managed financial services
            provider, operating in distribution and execution services of various financial products.
          </p>
          <p>
            The company offers need-based and customised solutions to individuals, corporates,
            institutions, trusts, family offices, SMEs and non-resident individuals.
          </p>
        </div>
      </div>
    </section>
  );
}

const siteNotes: Record<string, string> = {
  NSE: "National Stock Exchange",
  BSE: "BSE India",
  Moneycontrol: "Markets and news",
  CCIL: "Clearing Corporation of India",
  RBI: "Reserve Bank of India",
};

export function UsefulSites() {
  return (
    <section className="section" id="links">
      <div className="wrap">
        <div className="section-head">
          <h2>Useful sites</h2>
          <p>The exchanges, the clearing house and the Reserve Bank, opened from this page.</p>
        </div>
        <div className="site-list">
          {site.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              <span>{siteNotes[link.label]}</span>
              <strong>{link.label}</strong>
              <em>Open</em>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Leadership() {
  return (
    <section className="section section-dark" id="leadership">
      <div className="wrap leader">
        <div className="leader-top">
          <div>
            <h2>S. Arun Kumar Saladi</h2>
            <p className="leader-role">Founder & Managing Partner</p>
          </div>
          <img
            className="leader-photo"
            src="/arun-saladi.png?v=5"
            alt="S. Arun Kumar Saladi, Founder and Managing Partner of FinAssetZ"
          />
        </div>
        <div className="leader-copy">
          <p>
            Arun Saladi has almost three decades of experience in debt capital markets, investment
            management, wealth management, mutual funds and distribution of financial products. He
            has managed and advised assets of more than $2 billion, and built business operations
            across the southern region.
          </p>
          <p>
            His work has focused on institutions, corporates, retirement trusts, family offices and
            HNIs. A client-centric approach and deep market knowledge have enabled many
            first-of-its-kind transactions in the southern market.
          </p>
          <a className="leader-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden>
              <path
                fill="currentColor"
                d="M6.5 9H4V20h2.5V9zM5.2 4C4.3 4 3.6 4.7 3.6 5.6c0 .9.7 1.6 1.7 1.6.9 0 1.6-.7 1.6-1.6C6.9 4.7 6.2 4 5.2 4zM20 20h-2.5v-5.6c0-1.6-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V20H11V9h2.4v1.5c.4-.7 1.3-1.8 3.2-1.8 2.3 0 4 1.5 4 4.8V20z"
              />
            </svg>
            LinkedIn
          </a>
        </div>
        <figure className="leader-quote">
          <blockquote>
            “How you start is irrelevant. How you finish determines what you are.”
          </blockquote>
          <figcaption>Arun Saladi</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap split">
        <div>
          <p className="eyebrow">06 — Contact</p>
          <h2>FinAssetZ Investment Services</h2>
          <p className="lede">Registered office</p>
          <p>{site.address}</p>
        </div>
        <div className="contact-card">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>
          <p>Client desk · 24×7</p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-panel">
        <div className="footer-grid">
          <div>
            <strong>FinAssetZ</strong>
            <ul className="reg-marks">
              <li>AMFI registered mutual fund distributor and SIF distributor</li>
              <li>APMI registered PMS distributor</li>
            </ul>
          </div>
          <div>
            <p className="footer-label">Useful sites</p>
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
          <div>
            <p className="footer-label">Desk</p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
            </p>
          </div>
        </div>
        <div className="legal">
          <p>Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.</p>
          <p>Copyright © {new Date().getFullYear()} FinAssetZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsApp() {
  return (
    <a className="wa" href={site.whatsapp} target="_blank" rel="noopener noreferrer">
      <svg viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.15h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.85c-.24.68-1.2 1.24-1.96 1.4-.52.11-1.2.2-3.48-.75-2.92-1.21-4.8-4.17-4.94-4.36-.14-.2-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.26.64-.38.85-.38.2 0 .42 0 .6.01.19.01.45-.07.7.54.26.64.89 2.2.97 2.36.08.16.13.35.03.56-.1.22-.16.35-.31.54-.16.19-.33.42-.47.56-.16.16-.32.33-.14.64.19.31.83 1.37 1.78 2.22 1.22 1.09 2.25 1.43 2.57 1.59.32.16.5.13.69-.08.19-.21.79-.92 1-1.23.21-.32.42-.26.7-.16.28.1 1.79.84 2.1.99.3.16.51.23.58.36.07.13.07.76-.17 1.44z"
        />
      </svg>
      WhatsApp
    </a>
  );
}
