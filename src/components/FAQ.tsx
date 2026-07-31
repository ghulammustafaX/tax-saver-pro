import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    a: "Compare your property's assessed value to recent sales of similar homes (comparables or 'comps') in your area. If your home's assessed value is higher than comparable sales, you may be over-assessed. Our estimator compares your effective tax rate to your state average a higher rate is a strong indicator of over-assessment."
  },
  {
    q: "How do I appeal my property tax assessment?",
    a: "First, request your property record card from your county assessor's office to check for errors (incorrect square footage, wrong number of bedrooms, etc.). Then gather comparable property data. File a formal appeal before your county's deadline most counties have a 30–90 day window after assessment notices are mailed. Our state-by-state guide shows exact deadlines."
  },
  {
    q: "How much can I save by appealing my property tax?",
    a: "Successful property tax appeals save homeowners an average of $500–$2,000 per year. Studies show 30–60% of properties are over-assessed, and appeal success rates typically range from 40–60% when supported by comparable evidence. Savings compound every year going forward."
  },
  {
    q: "Do I need a lawyer to appeal my property tax?",
    a: "No. most homeowners can file a property tax appeal themselves for free. You'll need your property record, comparable sales data (available through your county assessor or sites like Zillow/Redfin), and a completed appeal form. Our free appeal letter generator creates a professional letter with state-specific language."
  }
];

const FAQItem = ({ q, a, index, isOpen, onToggle }: { q: string; a: string; index: number; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-6 group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 min-w-0 flex-1">
          <span className="text-[11px] font-bold text-primary/40 mt-1 w-6 flex-shrink-0 font-mono">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={cn(
            "font-semibold text-[15px] leading-snug transition-colors",
            isOpen ? "text-primary" : "text-foreground"
          )}>
            {q}
          </span>
        </div>
        <ChevronDown className={cn(
          "h-5 w-5 flex-shrink-0 mt-1 transition-all duration-300 text-muted-foreground",
          isOpen && "rotate-180 text-primary"
        )} />
      </button>
      {isOpen && (
        <div className="pb-5 pl-10 pr-2 animate-fade-in">
          <div className="bg-gray-100 rounded-2xl px-5 py-4 border border-gray-200">
            <p className="text-[13px] text-muted-foreground leading-relaxed">{a}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const FAQGroup = ({ flag, label, faqs, openIndex, onToggle }: { flag: string; label: string; faqs: typeof ukFAQs; openIndex: number | null; onToggle: (index: number) => void }) => (
  <div>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-11 h-11 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center text-xl">
        {flag}
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
    </div>
    <div className="bg-card rounded-3xl border border-border/60 overflow-hidden shadow-soft-sm">
      <div className="divide-y divide-border/50 px-6">
        {faqs.map((faq, i) => (
          <FAQItem 
            key={i} 
            q={faq.q} 
            a={faq.a} 
            index={i} 
            isOpen={openIndex === i}
            onToggle={() => onToggle(i)}
          />
        ))}
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openUKIndex, setOpenUKIndex] = useState<number | null>(null);
  const [openUSAIndex, setOpenUSAIndex] = useState<number | null>(null);

  const handleUKToggle = (index: number) => {
    setOpenUKIndex(openUKIndex === index ? null : index);
  };

  const handleUSAToggle = (index: number) => {
    setOpenUSAIndex(openUSAIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-4">FAQ</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-[15px] max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about council tax bands and property tax appeals
          </p>
        </div>

        <div className="space-y-12">
          <FAQGroup flag="🇬🇧" label="UK Council Tax Questions" faqs={ukFAQs} openIndex={openUKIndex} onToggle={handleUKToggle} />
          <FAQGroup flag="🇺🇸" label="USA Property Tax Questions" faqs={usaFAQs} openIndex={openUSAIndex} onToggle={handleUSAToggle} />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
