import type { Metadata } from "next";
import { Footer } from "@/components/content";
import { Header } from "@/components/header";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy · FinAssetZ" };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="doc">
        <a className="back" href="/">
          Back to FinAssetZ
        </a>
        <h1>Privacy</h1>
        <p>
          This website tells you about {site.legal}, Chennai. It does not ask you to open an account
          here.
        </p>
        <h2>What we receive</h2>
        <p>
          If you email {site.email}, call {site.phoneDisplay}, or send a WhatsApp message, we use
          those details to reply to you. Client login is a separate system at {site.login}, and that
          system has its own privacy terms.
        </p>
        <h2>What this site shows</h2>
        <p>
          Index levels, share prices and RBI figures are delayed public information. They are not a
          record of your portfolio and they are not investment advice.
        </p>
        <h2>What we do not do</h2>
        <p>We do not sell personal information from this website.</p>
        <h2>Questions</h2>
        <p>
          Write to <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
          <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
