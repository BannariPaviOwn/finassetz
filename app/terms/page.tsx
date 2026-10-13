import type { Metadata } from "next";
import { Footer } from "@/components/content";
import { Header } from "@/components/header";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms · FinAssetZ" };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="doc">
        <a className="back" href="/">
          Back to FinAssetZ
        </a>
        <h1>Terms</h1>
        <p>
          The pages on this site describe how {site.legal} works with clients. They are not an offer,
          a recommendation, or a promise of a return.
        </p>
        <h2>Products</h2>
        <p>
          Mutual fund investments are subject to market risks. Read all scheme-related documents
          carefully. Portfolio management schemes are subject to market risks. Read the disclosure
          document and the provider’s agreement. The portfolio manager, not FinAssetZ, runs the
          portfolio. Bonds, equities, AIFs, REITs and InvITs can fall in value, and some of them are
          difficult to sell. Insurance cover exists only as the policy describes it.
        </p>
        <h2>Registrations</h2>
        <p>
          FinAssetZ is an AMFI-registered mutual fund distributor and SIF distributor, and an
          APMI-registered PMS distributor. The ARN and the APMI registration number are confirmed by
          the desk before an application is made. They are not printed on this site. No IRDAI
          registration number is published here.
        </p>
        <h2>Market figures</h2>
        <p>
          Nifty, Sensex, share prices and RBI rates are delayed public figures. They can be late or
          unavailable. They are not a live exchange feed.
        </p>
        <h2>Other websites</h2>
        <p>
          Links to NSE, BSE, Moneycontrol, CCIL, RBI, LinkedIn and the client login leave this site.
          Those sites have their own terms.
        </p>
        <h2 id="grievance">Grievance redressal</h2>
        <p>
          Write to <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>. The registered office is{" "}
          {site.address}
        </p>
        <p>
          For a complaint about a securities product, you can also use{" "}
          <a href="https://scores.sebi.gov.in/" target="_blank" rel="noopener noreferrer">
            SEBI SCORES
          </a>
          . For an insurance claim, start with the insurer named on the policy.
        </p>
      </main>
      <Footer />
    </>
  );
}
