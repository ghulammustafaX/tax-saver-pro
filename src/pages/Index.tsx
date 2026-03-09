import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import { PoundSterling, DollarSign, FileText, Calculator, CheckCircle, ArrowRight } from "lucide-react";

const FEATURES_UK = [
  {
    icon: <PoundSterling className="h-5 w-5" />,
    title: "Council Tax Band Checker",
    desc: "Validate your postcode, get direct links to the VOA, and run the 3 checks that reveal incorrect bandings.",
  },
  {
    icon: <Calculator className="h-5 w-5" />,
    title: "1991 Value Estimator",
    desc: "Enter your current value, property type, and region. We calculate your estimated 1991 value and correct band using historical HPI data.",
  },
  {
    icon: <PoundSterling className="h-5 w-5" />,
    title: "Savings Calculator",
    desc: "See exactly what you'd save annually and as a backdated lump sum going back to 1993 — for your council area.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Appeal Letter Generator",
    desc: "Generate a formal legal letter to the VOA using correct statutory language. Print or copy to submit.",
  },
];

const FEATURES_USA = [
  {
    icon: <DollarSign className="h-5 w-5" />,
    title: "State-by-State Appeal Guide",
    desc: "Step-by-step instructions, deadlines, and strategy for all 50 states — tailored to your location.",
  },
  {
    icon: <Calculator className="h-5 w-5" />,
    title: "Overpayment Estimator",
    desc: "Compare your effective tax rate to your state average. Instantly see if you're likely over-assessed.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Appeal Letter Generator",
    desc: "State-specific legal language for all 50 states. Generate a ready-to-file formal appeal letter in seconds.",
  },
];

const Index = () => {
  return (
    <>
      <Hero />

      {/* Tool overview */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Free Tools for UK &amp; USA Homeowners
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to check, challenge, and reduce your property tax bill — no sign-up required
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* UK Tools */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🇬🇧</span>
                <h3 className="font-display font-bold text-xl text-foreground">UK Council Tax Tools</h3>
              </div>
              <div className="space-y-3">
                {FEATURES_UK.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-background rounded-lg p-4 border border-border">
                    <div className="bg-primary text-primary-foreground rounded-lg p-2 flex-shrink-0">{f.icon}</div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{f.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/uk" className="mt-4 block">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Open UK Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* USA Tools */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🇺🇸</span>
                <h3 className="font-display font-bold text-xl text-foreground">USA Property Tax Tools</h3>
              </div>
              <div className="space-y-3">
                {FEATURES_USA.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-background rounded-lg p-4 border border-border">
                    <div className="bg-primary text-primary-foreground rounded-lg p-2 flex-shrink-0">{f.icon}</div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{f.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/usa" className="mt-4 block">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Open USA Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key stats */}
      <section className="py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "5M+", label: "UK properties in wrong band" },
              { value: "£400", label: "Average UK annual overpayment" },
              { value: "30–60%", label: "US properties over-assessed" },
              { value: "100%", label: "Free to use, no registration" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-5 bg-card rounded-xl border border-border shadow-card">
                <div className="text-3xl font-display font-black text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 bg-card border-y border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            How It Works — 3 Simple Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Check Your Band", desc: "Enter your postcode (UK) or state (USA). We guide you to the official data in 30 seconds." },
              { step: "2", title: "See If You're Overpaying", desc: "Our calculators compare your situation to official band values and state averages." },
              { step: "3", title: "Appeal for Free", desc: "Generate a formal appeal letter with correct legal language. Send it yourself — no solicitor needed." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-display font-black text-xl mx-auto mb-3 shadow-primary">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      {/* Footer CTA */}
      <section className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Start Checking Your Property Tax Now
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Free, no sign-up, and takes under 5 minutes. Thousands of homeowners have already used our tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/uk">
              <Button size="lg" className="bg-accent text-foreground hover:bg-accent/90 font-bold px-8">
                🇬🇧 Check UK Council Tax Band
              </Button>
            </Link>
            <Link to="/usa">
              <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 px-8">
                🇺🇸 USA Property Tax Guide
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-primary-foreground/60 flex-wrap">
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> 100% free</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> No registration</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Official data sources</span>
            <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5" /> Formal legal letters</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-3 text-background/60">
            <Link to="/uk" className="hover:text-background">UK Council Tax Checker</Link>
            <Link to="/usa" className="hover:text-background">USA Property Tax Guide</Link>
            <Link to="/faq" className="hover:text-background">FAQ</Link>
          </div>
          <p className="text-background/50 text-xs max-w-2xl mx-auto">
            TaxBandCheck is a free informational tool. We are not a regulated financial or legal firm. Information is based on official government sources. Always verify details with your local council or county assessor. No liability is accepted for decisions made based on this tool.
          </p>
          <p className="text-background/40 text-xs mt-2">© {new Date().getFullYear()} TaxBandCheck</p>
        </div>
      </footer>
    </>
  );
};

export default Index;
