import { useState } from "react";
import PropertyTaxGuideUSA from "@/components/usa/PropertyTaxGuideUSA";
import OverpaymentEstimatorUSA from "@/components/usa/OverpaymentEstimatorUSA";
import AppealLetterUSA from "@/components/usa/AppealLetterUSA";
import SEO from "@/components/SEO";
import { usaFaqSchema, usaBreadcrumbSchema } from "@/lib/seo-schemas";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, BookOpen, BarChart2, FileText, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "guide",     label: "State Appeal Guide",      icon: BookOpen,   desc: "Step-by-step instructions for all 50 states" },
  { id: "estimator", label: "Overpayment Estimator",   icon: BarChart2,  desc: "Compare your rate to your state average" },
  { id: "letter",    label: "Appeal Letter",           icon: FileText,   desc: "Generate a state-specific formal appeal letter" },
];

const TRUST_TAGS = [
  "All 50 states covered",
  "Free appeal letter generator",
  "Based on state assessment records",
  "No lawyer required",
];

const USAPage = () => {
  const [active, setActive] = useState("guide");

  return (
    <main className="bg-background min-h-screen">
      <SEO
        title="USA Property Tax Appeal Guide 2025 — All 50 States | TaxBandCheck"
        description="30–60% of US properties are over-assessed. Free state-by-state property tax appeal guide, overpayment estimator, and appeal letter generator. Save $500–$2,000/year. No lawyer needed."
        canonical="/usa"
        jsonLd={[usaBreadcrumbSchema, usaFaqSchema]}
      />

      {/* Page header — clean light */}
      <div className="border-b border-border bg-background pt-10 pb-8">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl leading-none mt-1">🇺🇸</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">United States</p>
              <h1 className="font-display text-3xl md:text-4xl font-black text-foreground leading-tight">
                Property Tax Appeal Guide <span className="text-primary">2025</span>
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl leading-relaxed">
                30–60% of US properties are over-assessed. Successful appeals save homeowners an average of <strong className="text-foreground">$500–$2,000/year</strong>. Free tools for all 50 states.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            {TRUST_TAGS.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5 bg-secondary border border-border text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                <CheckCircle className="h-3 w-3 text-saving" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
        {/* Horizontal tab cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {TABS.map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                "group text-left rounded-xl border p-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active === id
                  ? "bg-primary border-primary text-primary-foreground shadow-primary"
                  : "bg-background border-border hover:border-primary/40 hover:bg-primary-subtle"
              )}
            >
              <Icon className={cn("h-4 w-4 mb-2.5", active === id ? "text-primary-foreground" : "text-primary")} />
              <div className={cn("text-sm font-semibold mb-1", active === id ? "text-primary-foreground" : "text-foreground")}>
                {label}
              </div>
              <div className={cn("text-xs leading-relaxed", active === id ? "text-primary-foreground/70" : "text-muted-foreground")}>
                {desc}
              </div>
            </button>
          ))}
        </div>

        {/* Tool content panel — keep all mounted to preserve form state across tabs */}
        <div className="bg-background rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="p-6 md:p-8">
            <div className={active === "guide"     ? "" : "hidden"}><PropertyTaxGuideUSA /></div>
            <div className={active === "estimator" ? "" : "hidden"}><OverpaymentEstimatorUSA /></div>
            <div className={active === "letter"    ? "" : "hidden"}><AppealLetterUSA /></div>
          </div>
        </div>

        {/* Professional services CTA */}
        <div className="mt-6 bg-secondary/60 rounded-2xl border border-border p-5 flex items-start gap-4">
          <div className="bg-background border border-border rounded-xl p-2.5 flex-shrink-0">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground mb-1">Professional Appeal Services</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Many property tax appeal firms work on contingency — they only charge if they save you money (typically 25–40% of your first year's savings).
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["No upfront cost", "Licensed professionals", "Higher success rates"].map(t => (
                <span key={t} className="bg-background border border-border text-muted-foreground text-xs px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Cross-link */}
        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Also paying UK council tax?</p>
          <Link to="/uk" className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:underline">
            UK Council Tax Band Checker <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default USAPage;
