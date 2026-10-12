import { About, Contact, Footer, Hero, Leadership, WhatsApp } from "@/components/content";
import { Services } from "@/components/services";
import { Header } from "@/components/header";
import { MarketBoard, MarketProvider, Ticker } from "@/components/markets";
import { ShareTape } from "@/components/share-tape";
import { RatesBoard } from "@/components/rates";
import { getMarkets } from "@/lib/markets";
import { getRates } from "@/lib/rates";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [markets, rates] = await Promise.all([getMarkets(), getRates()]);

  return (
    <MarketProvider initial={markets}>
      <div className="topbar">
        <Header />
        <Ticker />
      </div>
      <ShareTape />
      <main>
        <Hero />
        <MarketBoard />
        <RatesBoard initial={rates} />
        <About />
        <Services />
        <Leadership />
        <Contact />
      </main>
      <Footer />
      <WhatsApp />
    </MarketProvider>
  );
}
