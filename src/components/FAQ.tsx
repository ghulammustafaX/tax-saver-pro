import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ukFAQs = [
  {
    q: "How do I check my council tax band?",
    a: "Visit the Valuation Office Agency (VOA) website at voa.gov.uk and search for your property address. Your band (A through H) will be displayed immediately. You can also call the VOA on 03000 501 501. Your council tax bill also shows your band each year."
  },
  {
    q: "Can I appeal my council tax band?",
    a: "Yes! If you believe your band is wrong, you have the right to appeal to the VOA. The most common grounds are: your home is in a higher band than similar properties nearby, the 1991 valuation was incorrect, or your property has been altered since banding. Use our free appeal letter generator above."
  },
  {
    q: "How far back can council tax refunds go?",
    a: "If your appeal is successful, your rebanding can be backdated to 1 April 1993 (when council tax began) — meaning some households are owed thousands of pounds. However, you must act — the rebanding only applies once you've made a formal challenge. It does NOT happen automatically."
  },
  {
    q: "What is the council tax band checker?",
    a: "A council tax band checker is a tool to help you identify if your property is in the correct valuation band (A–H). Bands were set in 1991 based on estimated property values. Our free tool guides you through how to verify your band and challenge it if necessary."
  },
  {
    q: "What are the council tax bands from A to H?",
    a: "Council tax bands are based on 1991 property values: Band A (up to £40,000), Band B (£40,001–£52,000), Band C (£52,001–£68,000), Band D (£68,001–£88,000), Band E (£88,001–£120,000), Band F (£120,001–£160,000), Band G (£160,001–£320,000), Band H (over £320,000)."
  },
  {
    q: "Who qualifies for a council tax single person discount?",
    a: "If you are the only adult living in a property, you are entitled to a 25% discount on your council tax bill. Students, people with severe mental impairments, and care workers may not count as 'adults' for this purpose, meaning you could still qualify even if others live with you."
  },
  {
    q: "How long does a council tax appeal take?",
    a: "The VOA aims to acknowledge your proposal within 2 weeks and decide within 6 months, though complex cases can take longer. If you disagree with the VOA's decision, you can appeal to an independent tribunal — this is still free and you don't need a solicitor."
  },
  {
    q: "Am I in the wrong council tax band?",
    a: "Studies suggest up to 5 million UK properties may be in the wrong band. Key signs: similar properties on your street are in a lower band, or your estimated 1991 property value falls in a lower band range. Use our free 1991 value estimator and comparable property checker above."
  }
];

const usaFAQs = [
  {
    q: "How do I know if I'm overpaying property tax?",
    a: "Compare your property's assessed value to recent sales of similar homes (comparables or 'comps') in your area. If your home's assessed value is higher than comparable sales, you may be over-assessed. Our estimator compares your effective tax rate to your state average — a higher rate is a strong indicator of over-assessment."
  },
  {
    q: "How do I appeal my property tax assessment?",
    a: "First, request your property record card from your county assessor's office to check for errors (incorrect square footage, wrong number of bedrooms, etc.). Then gather comparable property data. File a formal appeal before your county's deadline — most counties have a 30–90 day window after assessment notices are mailed. Our state-by-state guide shows exact deadlines."
  },
  {
    q: "How much can I save by appealing my property tax?",
    a: "Successful property tax appeals save homeowners an average of $500–$2,000 per year. Studies show 30–60% of properties are over-assessed, and appeal success rates typically range from 40–60% when supported by comparable evidence. Savings compound every year going forward."
  },
  {
    q: "Do I need a lawyer to appeal my property tax?",
    a: "No — most homeowners can file a property tax appeal themselves for free. You'll need your property record, comparable sales data (available through your county assessor or sites like Zillow/Redfin), and a completed appeal form. Our free appeal letter generator creates a professional letter with state-specific language."
  }
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground">{q}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 text-muted-foreground border-t border-border bg-card">
          <p className="leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about council tax bands and property tax appeals
          </p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center gap-2 font-display font-bold text-lg text-primary mb-4">
            <span>🇬🇧</span> UK Council Tax Questions
          </h3>
          <div className="flex flex-col gap-2">
            {ukFAQs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-display font-bold text-lg text-primary mb-4">
            <span>🇺🇸</span> USA Property Tax Questions
          </h3>
          <div className="flex flex-col gap-2">
            {usaFAQs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
