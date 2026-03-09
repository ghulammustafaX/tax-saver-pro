import { useState } from "react";
import CouncilTaxChecker from "@/components/uk/CouncilTaxChecker";
import ValueEstimator1991 from "@/components/uk/ValueEstimator1991";
import AppealLetterUK from "@/components/uk/AppealLetterUK";
import SavingsCalculatorUK from "@/components/uk/SavingsCalculatorUK";
import ReductionCheckerUK from "@/components/uk/ReductionCheckerUK";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Search, BarChart2, Calculator, FileText, Tag, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "checker",   label: "Band Checker",        icon: Search,      desc: "Validate your postcode & find your current band" },
  { id: "estimator", label: "1991 Estimator",       icon: BarChart2,   desc: "Calculate what your home was worth in 1991" },
  { id: "savings",   label: "Savings Calculator",   icon: Calculator,  desc: "See your annual saving & backdated refund" },
  { id: "letter",    label: "Appeal Letter",        icon: FileText,    desc: "Generate a formal VOA appeal letter" },
  { id: "discounts", label: "Discounts Checker",    icon: Tag,         desc: "Find out if you qualify for a reduction" },
];

const TRUST_TAGS = [
  "Free to use",
  "Based on official VOA guidelines",
  "Formal appeal letter included",
  "No win, no fee services available",
];

const UKPage = () => {
  const [active, setActive] = useState("checker");

  return (
    <main className="bg-background min-h-screen">
      {/* Page header — clean light */}
      <div className="border-b border-border bg-background pt-10 pb-8">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl leading-none mt-1">🇬🇧</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">United Kingdom</p>
              <h1 className="font-display text-3xl md:text-4xl font-black text-foreground leading-tight">
                Council Tax Band Checker <span className="text-primary">2025</span>
              </h1>
              <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl leading-relaxed">
                5 million UK properties are in the wrong band. The average overpayment is <strong className="text-foreground">£400/year</strong> — with refunds possible back to 1993. Check and appeal for free.
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
          {TABS.map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                "group text-left rounded-xl border p-3.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active === id
                  ? "bg-primary border-primary text-primary-foreground shadow-primary"
                  : "bg-background border-border hover:border-primary/40 hover:bg-primary-subtle"
              )}
            >
              <Icon className={cn("h-4 w-4 mb-2", active === id ? "text-primary-foreground" : "text-primary")} />
              <div className={cn("text-xs font-semibold leading-tight", active === id ? "text-primary-foreground" : "text-foreground")}>
                {label}
              </div>
            </button>
          ))}
        </div>

        {/* Active tab description strip */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          {(() => { const t = TABS.find(t => t.id === active)!; const Icon = t.icon; return <><Icon className="h-4 w-4 text-primary" /><span>{t.desc}</span></>; })()}
        </div>

        {/* Tool content panel — keep all mounted to preserve form state across tabs */}
        <div className="bg-background rounded-2xl border border-border shadow-card overflow-hidden">
          <div className="p-6 md:p-8">
            <div className={active === "checker"   ? "" : "hidden"}><CouncilTaxChecker /></div>
            <div className={active === "estimator" ? "" : "hidden"}><ValueEstimator1991 /></div>
            <div className={active === "savings"   ? "" : "hidden"}><SavingsCalculatorUK /></div>
            <div className={active === "letter"    ? "" : "hidden"}><AppealLetterUK /></div>
            <div className={active === "discounts" ? "" : "hidden"}><ReductionCheckerUK /></div>
          </div>
        </div>

        {/* Professional services CTA */}
        <div className="mt-6 bg-secondary/60 rounded-2xl border border-border p-5 flex items-start gap-4">
          <div className="bg-background border border-border rounded-xl p-2.5 flex-shrink-0">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-foreground mb-1">Want Expert Help? No Win, No Fee Services</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Professional appeal firms handle everything for you — and only charge if they win (typically 25–35% of your first year's saving).
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["No upfront cost", "Experts handle all paperwork", "Higher success rates"].map(t => (
                <span key={t} className="bg-background border border-border text-muted-foreground text-xs px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Cross-link */}
        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Also paying US property tax?</p>
          <Link to="/usa" className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:underline">
            USA Property Tax Guide <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UKPage;
