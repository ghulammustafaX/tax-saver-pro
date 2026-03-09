import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import { PoundSterling, DollarSign, FileText, Calculator, CheckCircle, ArrowRight } from "lucide-react";

const FEATURES_UK = [
  {
    icon: <PoundSterling className="h-4 w-4" />,
    title: "Council Tax Band Checker",
    desc: "Validate your postcode, get direct links to the VOA, and run the 3 checks that reveal incorrect bandings.",
  },
  {
    icon: <Calculator className="h-4 w-4" />,
    title: "1991 Value Estimator",
    desc: "Enter your current value and region — we calculate your 1991 estimated value and correct band using historical HPI data.",
  },
  {
    icon: <PoundSterling className="h-4 w-4" />,
    title: "Savings Calculator",
    desc: "See your annual saving and backdated lump sum going back to 1993 — for your council area.",
  },
  {
    icon: <FileText className="h-4 w-4" />,
    title: "Appeal Letter Generator",
    desc: "Generate a formal legal letter to the VOA with correct statutory language. Print or copy to submit.",
  },
];

const FEATURES_USA = [
  {
    icon: <DollarSign className="h-4 w-4" />,
    title: "State-by-State Appeal Guide",
    desc: "Step-by-step instructions, deadlines, and strategy for all 50 states — tailored to your location.",
  },
  {
    icon: <Calculator className="h-4 w-4" />,
    title: "Overpayment Estimator",
    desc: "Compare your effective tax rate to your state average. Instantly see if you're likely over-assessed.",
  },
  {
    icon: <FileText className="h-4 w-4" />,
    title: "Appeal Letter Generator",
    desc: "State-specific legal language for all 50 states. Generate a ready-to-file formal appeal letter in seconds.",
  },
];

const STATS = [
  { value: "5M+", label: "UK properties in wrong band" },
  { value: "£400", label: "Average UK annual overpayment" },
  { value: "30–60%", label: "US properties over-assessed" },
  { value: "100%", label: "Free to use, no registration" },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Check Your Band", desc: "Enter your postcode (UK) or state (USA). We guide you to the official data in 30 seconds." },
  { step: "2", title: "See If You're Overpaying", desc: "Our calculators compare your situation to official band values and state averages." },
  { step: "3", title: "Appeal for Free", desc: "Generate a formal appeal letter with correct legal language. Send it yourself — no solicitor needed." },
];

const Index = () => {
  return (
    <>
      <Hero />

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Tool overview */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Free Tools for UK &amp; USA Homeowners
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              Everything you need to check, challenge, and reduce your property tax bill — no sign-up required
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* UK Tools */}
            <div className="bg-secondary/50 rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">🇬🇧</span>
                <h3 className="font-display font-bold text-lg text-foreground">UK Council Tax Tools</h3>
              </div>
              <div className="space-y-2.5 mb-5">
                {FEATURES_UK.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-background rounded-xl p-3.5 border border-border">
                    <div className="bg-primary-subtle text-primary rounded-lg p-2 flex-shrink-0 mt-0.5">{f.icon}</div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{f.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/uk"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Open UK Tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* USA Tools */}
            <div className="bg-secondary/50 rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xl">🇺🇸</span>
                <h3 className="font-display font-bold text-lg text-foreground">USA Property Tax Tools</h3>
              </div>
              <div className="space-y-2.5 mb-5">
                {FEATURES_USA.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-background rounded-xl p-3.5 border border-border">
                    <div className="bg-primary-subtle text-primary rounded-lg p-2 flex-shrink-0 mt-0.5">{f.icon}</div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{f.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/usa"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Open USA Tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-12 bg-primary-subtle border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center p-5">
                <div className="text-3xl font-display font-black text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            How It Works — 3 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-primary text-primary-foreground rounded-2xl w-12 h-12 flex items-center justify-center font-display font-black text-lg mx-auto mb-4 shadow-primary">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      <FAQ />

      {/* Footer CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Start Checking Your Property Tax Now
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto text-sm">
            Free, no sign-up, and takes under 5 minutes. Thousands of homeowners have already used our tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/uk"
              className="inline-flex items-center gap-2 bg-accent text-foreground font-bold px-7 py-3.5 rounded-xl hover:bg-accent/90 transition-colors"
            >
              🇬🇧 Check UK Council Tax Band
            </Link>
            <Link
              to="/usa"
              className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground font-semibold px-7 py-3.5 rounded-xl hover:bg-primary-foreground/10 transition-colors"
            >
              🇺🇸 USA Property Tax Guide
            </Link>
          </div>
          <div className="flex items-center justify-center gap-5 mt-8 text-xs text-primary-foreground/50 flex-wrap">
            <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> 100% free</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> No registration</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Official data sources</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Formal legal letters</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 md:px-6 text-center text-sm">
          <div className="flex flex-wrap justify-center gap-5 mb-4 text-background/50 text-xs">
            <Link to="/uk" className="hover:text-background transition-colors">UK Council Tax Checker</Link>
            <Link to="/usa" className="hover:text-background transition-colors">USA Property Tax Guide</Link>
            <Link to="/faq" className="hover:text-background transition-colors">FAQ</Link>
          </div>
          <p className="text-background/40 text-xs max-w-2xl mx-auto leading-relaxed">
            TaxBandCheck is a free informational tool. We are not a regulated financial or legal firm. Information is based on official government sources. Always verify details with your local council or county assessor. No liability is accepted for decisions made based on this tool.
          </p>
          <p className="text-background/30 text-xs mt-3">© {new Date().getFullYear()} TaxBandCheck</p>
        </div>
      </footer>
    </>
  );
};

export default Index;
