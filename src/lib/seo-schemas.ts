const BASE_URL = "https://taxbandcheck.com";

// ─── Org / WebSite schema (used on every page) ────────────────────────────
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TaxBandCheck",
  url: BASE_URL,
  description:
    "Free UK council tax band checker and USA property tax appeal tools. Check if you're overpaying and generate formal appeal letters.",
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TaxBandCheck",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/uk?postcode={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// ─── UK Page schemas ───────────────────────────────────────────────────────
export const ukBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "UK Council Tax Checker", item: `${BASE_URL}/uk` },
  ],
};

export const ukHowToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Check and Appeal Your UK Council Tax Band",
  description:
    "A free step-by-step guide to checking if your council tax band is wrong and appealing to the VOA for a refund.",
  step: [
    {
      "@type": "HowToStep",
      name: "Check your postcode",
      text: "Enter your postcode in the band checker to find your current council tax band via the Valuation Office Agency.",
    },
    {
      "@type": "HowToStep",
      name: "Estimate your 1991 value",
      text: "Use the 1991 Value Estimator to calculate what your property was worth in 1991 — the year bands were set.",
    },
    {
      "@type": "HowToStep",
      name: "Calculate your savings",
      text: "The savings calculator shows your annual saving and the backdated lump sum you could receive back to 1993.",
    },
    {
      "@type": "HowToStep",
      name: "Generate an appeal letter",
      text: "Use the free appeal letter generator to create a formal VOA proposal letter with correct statutory language.",
    },
  ],
};

export const ukFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I check my council tax band?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit the Valuation Office Agency (VOA) website at voa.gov.uk and search for your property address. Your band (A–H) will be displayed immediately. You can also call the VOA on 03000 501 501.",
      },
    },
    {
      "@type": "Question",
      name: "Can I appeal my council tax band?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If your home is in a higher band than similar properties nearby, or the 1991 valuation was incorrect, you can make a formal proposal to the VOA. There is no fee and no lawyer required.",
      },
    },
    {
      "@type": "Question",
      name: "How far back can council tax refunds go?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A successful challenge can be backdated to 1 April 1993 when council tax started, potentially worth thousands of pounds. You must make a formal challenge — it does not happen automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Am I in the wrong council tax band?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studies suggest up to 5 million UK properties may be in the wrong band. Key signs: similar properties on your street are in a lower band, or your estimated 1991 property value falls in a lower band range.",
      },
    },
  ],
};

// ─── USA Page schemas ──────────────────────────────────────────────────────
export const usaBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "USA Property Tax Guide", item: `${BASE_URL}/usa` },
  ],
};

export const usaFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I know if I'm overpaying property tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Compare your property's assessed value to recent sales of similar homes in your area. If your home's assessed value is higher than comparable sales, you may be over-assessed. Studies show 30–60% of US properties are over-assessed.",
      },
    },
    {
      "@type": "Question",
      name: "How do I appeal my property tax assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Request your property record card from your county assessor's office, gather comparable sales data, then file a formal appeal before your county's deadline (usually 30–90 days after assessment notices are mailed).",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a lawyer to appeal my property tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — most homeowners can file a property tax appeal themselves for free. You need your property record, comparable sales data, and a completed appeal form. Our free appeal letter generator creates a professional letter with state-specific legal language.",
      },
    },
    {
      "@type": "Question",
      name: "How much can I save by appealing my property tax?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Successful appeals save homeowners an average of $500–$2,000 per year. Appeal success rates typically range from 40–60% when supported by comparable evidence.",
      },
    },
  ],
};

// ─── FAQ page schema ───────────────────────────────────────────────────────
export const fullFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    ...ukFaqSchema.mainEntity,
    ...usaFaqSchema.mainEntity,
  ],
};

export const faqBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "FAQ", item: `${BASE_URL}/faq` },
  ],
};
