const marketNote =
  "This is how the desk works through the process. It is not a recommendation and it does not indicate a return. Suitability depends on the product documents and your own circumstances.";

type Step = { title: string; text: string };

type Service = {
  slug: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  summary: string;
  steps: Step[];
  note: string;
};

export const services: Service[] = [
  {
    slug: "mutual-funds",
    title: "Mutual Fund Distribution",
    copy: "Need-based funds for individuals, families, corporates and institutions.",
    image: "/services/mutual-funds.jpg",
    imageAlt: "A navy portfolio and a tablet on a pale desk, prepared for a fund review.",
    summary:
      "FAIS distributes mutual funds as an AMFI-registered distributor. The work starts from the client’s need, then moves through scheme documents, onboarding and execution.",
    steps: [
      {
        title: "Understand the brief",
        text: "The desk notes the goal, the time available, the need for liquidity, and how much movement in value the client can accept.",
      },
      {
        title: "Study the schemes",
        text: "Suitable fund categories are discussed against that brief. Scheme information documents are shared before any application is made.",
      },
      {
        title: "Complete onboarding",
        text: "KYC and the distributor application are completed where they are not already in place, including the details the fund house requires.",
      },
      {
        title: "Place the transaction",
        text: "A purchase, SIP, switch or redemption is executed through the distribution platform once the client has confirmed the instruction.",
      },
      {
        title: "Review",
        text: "The holding is looked at again when the goal, the cash need, or the market context changes. The client decides what happens next.",
      },
    ],
    note: `${marketNote} Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.`,
  },
  {
    slug: "specialised-investment-funds",
    title: "Specialised Investment Funds",
    copy: "SIFs distributed through the same fund practice.",
    image: "/services/sif.jpg",
    imageAlt: "A closed navy portfolio on a stone table in a glass meeting room.",
    summary:
      "Specialised Investment Funds sit alongside the mutual fund practice. FAIS distributes them as an AMFI-registered SIF distributor. The strategy, the eligibility and the scheme documents come before any commitment.",
    steps: [
      {
        title: "Separate the need from a plain fund",
        text: "The conversation establishes whether a specialised strategy is actually what the brief requires, rather than a conventional mutual fund.",
      },
      {
        title: "Read the scheme",
        text: "The offer and scheme documents set out the strategy, the risks, the costs and who may invest. Those documents govern the decision.",
      },
      {
        title: "Confirm eligibility",
        text: "Onboarding checks that the client meets the conditions in the scheme documents before an application is prepared.",
      },
      {
        title: "Execute",
        text: "The application and the funding instruction are placed only after the client has confirmed them.",
      },
      {
        title: "Stay with the holding",
        text: "Reporting from the scheme is reviewed with the client. Changes follow the terms of the fund, not an informal request.",
      },
    ],
    note: marketNote,
  },
  {
    slug: "fixed-income-bonds",
    title: "Fixed Income Bonds",
    copy: "Bond distribution for clients allocating to fixed income.",
    image: "/services/bonds.jpg",
    imageAlt: "Blank cotton paper, pale blue envelopes and a pen arranged for a bond discussion.",
    summary:
      "Bond distribution is for clients who want a fixed-income allocation. The desk works through tenor, issuer risk, liquidity and the documents for the issue before an order is placed.",
    steps: [
      {
        title: "Set the fixed-income brief",
        text: "The client’s horizon, income need and tolerance for issuer and interest-rate risk are written down before any bond is discussed.",
      },
      {
        title: "Review the available issue",
        text: "The term sheet or offer document is studied for coupon, maturity, credit, security and how the bond can be sold if liquidity is needed.",
      },
      {
        title: "Complete the paperwork",
        text: "Demat, KYC and the application for that issue are completed as the issue requires.",
      },
      {
        title: "Settle the purchase",
        text: "The order is placed and settlement follows the market process for that bond. The client receives confirmation of what was allotted.",
      },
      {
        title: "Track maturity",
        text: "Interest dates and maturity are noted so the proceeds can be discussed again rather than left unattended.",
      },
    ],
    note: `${marketNote} A bond can fall in price, and an issuer can fail to pay. Past coupons are not a promise of the next one.`,
  },
  {
    slug: "portfolio-management-schemes",
    title: "Portfolio Management Schemes",
    copy: "PMS distribution for clients who want a managed portfolio.",
    image: "/services/pms.jpg",
    imageAlt: "Two navy chairs and a closed portfolio on a white table beside a window.",
    summary:
      "FAIS distributes portfolio management schemes as an APMI-registered PMS distributor. The portfolio itself is managed by the PMS provider under that provider’s agreement.",
    steps: [
      {
        title: "Describe the mandate",
        text: "The client’s objective, horizon and constraints are set out so the desk can see which management styles are worth a closer look.",
      },
      {
        title: "Introduce the provider",
        text: "The PMS agreement, the strategy note and the fee schedule are shared. The regulatory minimum and the provider’s own conditions apply.",
      },
      {
        title: "Agree the relationship",
        text: "The client signs with the portfolio manager. FAIS remains the distributor; the manager runs the portfolio.",
      },
      {
        title: "Fund the account",
        text: "Money or securities move only on the client’s instruction and under the manager’s funding process.",
      },
      {
        title: "Review the reports",
        text: "The desk reads the manager’s reports with the client and records whether the original brief still holds.",
      },
    ],
    note: marketNote,
  },
  {
    slug: "investment-banking",
    title: "Investment Banking",
    copy: "Investment banking mandates, handled with the same desk.",
    image: "/services/banking.jpg",
    imageAlt: "A boardroom with a long table, navy chairs and a single folder, overlooking a city.",
    summary:
      "Investment banking work is taken up as a mandate. The scope is agreed first, then the desk prepares what a counterparty needs and stays with the process through to a close or a clear stop.",
    steps: [
      {
        title: "Hear the mandate",
        text: "The client explains the transaction: a raise, a sale, a purchase, or another strategic step. The desk says whether that work fits the practice.",
      },
      {
        title: "Agree the scope",
        text: "What will be prepared, who will be approached, and how the engagement is charged are written down before work begins.",
      },
      {
        title: "Prepare the materials",
        text: "The information a counterparty needs is assembled with the client. Nothing is circulated until the client has approved it.",
      },
      {
        title: "Run the process",
        text: "Introductions, questions and revisions are managed so the client has one place to follow the mandate.",
      },
      {
        title: "Close or stop",
        text: "If terms are agreed, the desk helps the client through the remaining documents. If they are not, the mandate is closed cleanly.",
      },
    ],
    note: "A mandate is not an offer to the public and it is not a promise that a transaction will complete.",
  },
  {
    slug: "listed-and-private-markets",
    title: "Equities, AIFs, REITs, InvITs",
    copy: "Listed equities and private-market products, including AIFs, REITs and InvITs.",
    image: "/services/markets.jpg",
    imageAlt: "Glass office towers reflected in calm water at blue hour.",
    summary:
      "This shelf covers listed equities and private-market products such as alternative investment funds, REITs and InvITs. Each product has its own documents and its own test of who may invest.",
    steps: [
      {
        title: "Name the exposure",
        text: "The client says whether the need is a listed share, a REIT or InvIT, or a private-market fund. Those are not treated as one product.",
      },
      {
        title: "Read the documents",
        text: "For a fund, REIT or InvIT, the offer document sets out the asset, the risks, the costs and the eligibility. For a listed share, the company disclosures do that work.",
      },
      {
        title: "Check eligibility",
        text: "Private-market products often have a minimum and an investor category. The client is taken forward only where those conditions are met.",
      },
      {
        title: "Execute",
        text: "The order or the application is placed after the client confirms it, through the route that product uses.",
      },
      {
        title: "Review the position",
        text: "Listed prices move every session. Fund and trust reports arrive on their own calendar. Both are reviewed against the original reason for investing.",
      },
    ],
    note: `${marketNote} Listed prices can fall. Private-market holdings can be difficult to sell.`,
  },
  {
    slug: "insurance",
    title: "General & Health Insurance",
    copy: "General and health cover, placed alongside the investments.",
    image: "/services/insurance.jpg",
    imageAlt: "A bright living room with a closed navy umbrella by the door and a plain folder on a cabinet.",
    summary:
      "General and health insurance is arranged as part of the same client conversation as the investments. The policy, not a conversation, decides what is covered.",
    steps: [
      {
        title: "Note what needs cover",
        text: "Health, home, business or another risk is written down, including who is to be covered and what limit the client has in mind.",
      },
      {
        title: "Compare policies",
        text: "Suitable policies are set side by side on cover, exclusions, waiting periods and premium. The insurer’s brochure is shared.",
      },
      {
        title: "Make the disclosures",
        text: "The proposal is completed with the facts the insurer asks for. An omitted fact can affect a later claim.",
      },
      {
        title: "Issue the policy",
        text: "The insurer accepts or declines. When it accepts, the policy schedule is checked with the client against what was requested.",
      },
      {
        title: "If a claim arises",
        text: "The desk helps the client gather what the insurer has asked for. The insurer decides the claim under the policy.",
      },
    ],
    note: "Cover exists only as the policy wording describes it. Premiums and terms are set by the insurer.",
  },
  {
    slug: "tax-planning",
    title: "Tax Planning",
    copy: "Tax planning kept in the same conversation as the portfolio.",
    image: "/services/tax.jpg",
    imageAlt: "A calculator, a navy pen and a blank desk calendar on a pale wooden desk.",
    summary:
      "Tax planning at FAIS is the part of the investment conversation that asks what a product, a holding period or a timing choice may mean for tax. It is not a tax opinion.",
    steps: [
      {
        title: "Start from the portfolio",
        text: "The question is tied to a real investment decision: a purchase, a sale, a switch, or the shape of the holdings.",
      },
      {
        title: "Identify the tax question",
        text: "Holding period, product structure and the timing of a transaction are noted. The answer still depends on the client’s full tax position.",
      },
      {
        title: "Bring in the tax adviser",
        text: "Where the question needs a tax computation or a filing decision, the client’s tax adviser is the right person. The desk does not replace that advice.",
      },
      {
        title: "Keep the investment choice intact",
        text: "A product is not chosen only because it sounds efficient for tax. The investment brief still has to make sense on its own.",
      },
      {
        title: "Record what was decided",
        text: "The choice and the reason are noted, so a later sale or switch can be looked at with the same facts.",
      },
    ],
    note: "Tax treatment depends on the law and on your circumstances, and it can change. This page is not tax advice.",
  },
];

export function getService(slug: string) {
  return services.find((item) => item.slug === slug);
}
