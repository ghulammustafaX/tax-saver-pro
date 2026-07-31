import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import { organizationSchema, webSiteSchema, fullFaqSchema } from "@/lib/seo-schemas";
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
    desc: "See your annual saving and backdated lump sum going back to 1993 for your council area.",
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
    desc: "Step-by-step instructions, deadlines, and strategy for all 50 states tailored to your location.",
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
      <SEO
        title="Free Council Tax Band Checker & Property Tax Appeal Tools | TaxBandCheck"
        description="Check if your UK council tax band is wrong and appeal for free. USA property tax appeal tools for all 50 states. Free appeal letter generator. Average saving £400/year."
        canonical="/"
        jsonLd={[organizationSchema, webSiteSchema, fullFaqSchema]}
      />

      <Hero />

      {/* Tool overview */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
              Free Tools for UK &amp; USA Homeowners
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              Everything you need to check, challenge, and reduce your property tax bill — no sign-up required
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {/* UK Tools */}
            <div className="group bg-card rounded-3xl p-6 border border-border hover:shadow-soft-lg transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-11 h-11 bg-[#E8EAF6] rounded-full flex items-center justify-center">
                  <span className="text-[13px] font-bold text-[#3F51B5]">GB</span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">UK Council Tax Tools</h3>
              </div>
              <div className="space-y-3.5 mb-6 flex-grow">
                {FEATURES_UK.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-[#192c58]/5 text-[#192c58] rounded-lg p-2 flex-shrink-0 mt-0.5">{f.icon}</div>
                    <div>
                      <div className="font-semibold text-[14px] text-foreground mb-0.5">{f.title}</div>
                      <div className="text-[12px] text-muted-foreground leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/uk"
                className="flex items-center justify-center gap-2 w-full bg-[#192c58] text-white font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-[#192c58]/90 transition-all active:scale-[0.98]"
              >
                Open UK Tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* USA Tools */}
            <div className="group bg-card rounded-3xl p-6 border border-border hover:shadow-soft-lg transition-all duration-300 flex flex-col">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-11 h-11 bg-[#E3F2FD] rounded-full flex items-center justify-center">
                  <span className="text-[13px] font-bold text-[#1976D2]">US</span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">USA Property Tax Tools</h3>
              </div>
              <div className="space-y-3.5 mb-6 flex-grow">
                {FEATURES_USA.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-[#1E3A8A]/5 text-[#1E3A8A] rounded-lg p-2 flex-shrink-0 mt-0.5">{f.icon}</div>
                    <div>
                      <div className="font-semibold text-[14px] text-foreground mb-0.5">{f.title}</div>
                      <div className="text-[12px] text-muted-foreground leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/usa"
                className="flex items-center justify-center gap-2 w-full bg-[#1E3A8A] text-white font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-[#1E3A8A]/90 transition-all active:scale-[0.98]"
              >
                Open USA Tools <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Combined How It Works + Stats Section - fits in one screen */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-[#FFF5F5] via-[#FFFBFB] to-[#F9FAFB]">
        {/* Animated radial gradient backgrounds */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-[#E74C4C]/20 via-[#E74C4C]/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-[#192c58]/20 via-[#192c58]/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-[#2D9B8E]/15 via-[#2D9B8E]/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* How It Works - Top Section */}
          <div className="max-w-5xl mx-auto mb-12 md:mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-8 md:mb-12 tracking-tight">
              How It Works — 3 Simple Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {HOW_IT_WORKS.map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="relative inline-flex mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#192c58] to-[#1E3A8A] rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-[#192c58] to-[#1E3A8A] text-white rounded-full w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-display font-black text-lg md:text-xl shadow-soft-md group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs md:text-[13px] text-muted-foreground leading-relaxed px-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Stats - Bottom Section with continuous sliding animation */}
          <div className="relative -mx-4 md:-mx-6 px-4 md:px-6 py-8 bg-gradient-to-r from-[#192c58] via-[#1E3A8A] to-[#192c58] overflow-hidden">
            {/* Subtle overlay pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"></div>
            </div>
            
            <div className="relative">
              {/* Sliding container with multiple duplicates for smooth continuous loop */}
              <div className="flex animate-slide-infinite">
                {/* Repeat stats multiple times for seamless continuous scrolling */}
                {[...Array(6)].map((_, setIndex) => (
                  <div key={`set-${setIndex}`} className="flex flex-shrink-0">
                    {STATS.map((stat, i) => (
                      <div key={`stat-${setIndex}-${i}`} className="flex-shrink-0 text-center px-12 md:px-16 min-w-[280px]">
                        <div className="text-3xl md:text-4xl font-display font-black text-white mb-1.5">
                          {stat.value}
                        </div>
                        <div className="text-xs md:text-[13px] text-white/80 font-medium leading-snug whitespace-nowrap">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Footer CTA */}
      <section className="relative bg-gradient-to-br from-[#192c58] via-[#1E3A8A] to-[#2D4A8E] py-20 md:py-24 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-white/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Start Checking Your Property Tax Now
          </h2>
          <p className="text-white/80 mb-10 max-w-xl mx-auto text-[12px] leading-relaxed">
            Free, no sign-up, and takes under 5 minutes. Thousands of homeowners have already used our tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              to="/uk"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#192c58] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-all shadow-soft-lg active:scale-[0.98] min-w-[240px]"
            >
              🇬🇧 Check UK Council Tax Band
            </Link>
            <Link
              to="/usa"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all active:scale-[0.98] min-w-[240px]"
            >
              🇺🇸 USA Property Tax Guide
            </Link>
          </div>
          <div className="flex items-center justify-center gap-6 text-[13px] text-white/60 flex-wrap">
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> 100% free</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> No registration</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Official data sources</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-3.5 w-3.5" /> Formal legal letters</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F1419] text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Footer links */}
            <div className="flex flex-wrap justify-center gap-8 mb-8 text-[13px]">
              <Link to="/uk" className="text-white/60 hover:text-white transition-colors">UK Council Tax Checker</Link>
              <Link to="/usa" className="text-white/60 hover:text-white transition-colors">USA Property Tax Guide</Link>
            </div>
            
            {/* Divider */}
            <div className="h-px bg-white/10 mb-8"></div>
            
            {/* Disclaimer and copyright */}
            <div className="text-center">
              <p className="text-white/40 text-[12px] max-w-3xl mx-auto leading-relaxed mb-4">
                TaxBandCheck is a free informational tool. We are not a regulated financial or legal firm. Information is based on official government sources. Always verify details with your local council or county assessor. No liability is accepted for decisions made based on this tool.
              </p>
              <p className="text-white/30 text-[11px]">© {new Date().getFullYear()} TaxBandCheck. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
