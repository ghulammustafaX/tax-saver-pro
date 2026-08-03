import { useState } from "react";
import PropertyTaxGuideUSA from "@/components/usa/PropertyTaxGuideUSA";
import OverpaymentEstimatorUSA from "@/components/usa/OverpaymentEstimatorUSA";
import AppealLetterUSA from "@/components/usa/AppealLetterUSA";
import TaxIllustrationUSA from "@/components/TaxIllustrationUSA";
import SEO from "@/components/SEO";
import { usaFaqSchema, usaBreadcrumbSchema } from "@/lib/seo-schemas";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, BookOpen, BarChart2, FileText, CheckCircle, TrendingDown, Home, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "guide",     label: "State Appeal Guide",      icon: BookOpen,   desc: "Step-by-step instructions for all 50 states" },
  { id: "estimator", label: "Overpayment Estimator",   icon: BarChart2,  desc: "Compare your rate to your state average" },
  { id: "letter",    label: "Appeal Letter",           icon: FileText,   desc: "Generate a state-specific formal appeal letter" },
];

const TRUST_TAGS = [
  { label: "All 50 states covered" },
  { label: "Free appeal letter" },
  { label: "State assessment data" },
  { label: "No lawyer required" },
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

      {/* Apple-style hero section - USA themed with Old Glory gray */}
      <section className="relative min-h-[82vh] overflow-hidden bg-gradient-to-br from-[#1f2937] via-[#374151] to-[#4b5563] flex flex-col">
        {/* Subtle gradient overlays - Apple style */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-[25%] right-[30%] w-[500px] h-[500px] bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-[30%] left-[25%] w-[400px] h-[400px] bg-gradient-radial from-white/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
        </div>
        
        {/* Main hero content - perfectly balanced */}
        <div className="container relative z-10 mx-auto flex flex-1 max-w-7xl items-center justify-center px-6 lg:pl-14 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 lg:gap-6 items-center w-full">
            
            {/* Left side - Illustration */}
            <div className="flex items-center justify-center lg:justify-end order-2 lg:order-1">
              <div className="relative w-full max-w-[335px] md:max-w-[385px] lg:max-w-[435px] lg:-mr-1" style={{ transform: 'translateZ(0)', willChange: 'transform' }}>
                {/* Decorative backdrop circle */}
                <div className="absolute inset-0 bg-gradient-radial from-white/8 via-white/3 to-transparent rounded-full blur-3xl scale-110 animate-pulse" style={{ animationDuration: '4s' }}></div>
                
                {/* Custom SVG Illustration */}
                <div className="relative">
                  <TaxIllustrationUSA />
                </div>
              </div>
            </div>

            {/* Right side - Hero content perfectly spaced */}
            <div className="text-center lg:text-left space-y-3.5 order-1 lg:order-2 lg:pl-1 lg:pr-8">
              {/* Hero headline - bold and clear */}
              <div className="space-y-2">
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                  Property Tax <span className="text-red-400">Appeal</span>
                </h1>
                <p className="font-sans text-2xl md:text-3xl lg:text-4xl font-semibold text-white/90 leading-tight">
                  Save $500–$2,000/Year
                </p>
              </div>
              
              {/* Description - concise */}
              <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                <span className="text-white font-bold">30-60% of US properties</span> are over-assessed. 
                Appeal in minutes with our state-specific guides — all 50 states covered.
              </p>

              {/* All 3 stats - responsive: horizontal on desktop, vertical stack on mobile */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 justify-center lg:justify-start pt-2">
                {/* Properties stat */}
                <div className="group backdrop-blur-xl bg-white/12 hover:bg-white/18 border border-white/30 rounded-full px-4 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/15 rounded-full flex items-center justify-center group-hover:bg-white/25 transition-colors">
                      <Home className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-display font-black text-white leading-none tabular-nums">60%</span>
                      <span className="text-white/70 text-[10px] font-semibold whitespace-nowrap">Over-assessed</span>
                    </div>
                  </div>
                </div>

                {/* Savings stat */}
                <div className="group backdrop-blur-xl bg-white/12 hover:bg-white/18 border border-white/30 rounded-full px-4 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/15 rounded-full flex items-center justify-center group-hover:bg-white/25 transition-colors">
                      <TrendingDown className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-lg font-display font-black text-white leading-none tabular-nums">$500-$2K</span>
                      <span className="text-white/70 text-[10px] font-semibold whitespace-nowrap ml-0.5">Avg savings</span>
                    </div>
                  </div>
                </div>

                {/* States stat */}
                <div className="group backdrop-blur-xl bg-white/12 hover:bg-white/18 border border-white/30 rounded-full px-4 py-2.5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/15 rounded-full flex items-center justify-center group-hover:bg-white/25 transition-colors">
                      <Clock className="h-3 w-3 text-white" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-display font-black text-white leading-none tabular-nums">50</span>
                      <span className="text-white/70 text-[10px] font-semibold whitespace-nowrap">States covered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges slider - bottom of hero, Apple-style frosted */}
        <div className="relative z-20 border-t border-white/10 bg-white/5 backdrop-blur-2xl py-4 overflow-hidden">
          <div className="flex gap-12 animate-slide-infinite">
            {[...Array(3)].map((_, setIndex) => (
              <div key={`set-${setIndex}`} className="flex gap-12 flex-shrink-0">
                {TRUST_TAGS.map((tag, i) => (
                  <div
                    key={`badge-${setIndex}-${i}`}
                    className="flex items-center gap-2.5 text-white/90 text-sm font-semibold whitespace-nowrap"
                  >
                    <CheckCircle className="h-4 w-4 text-white/75 flex-shrink-0" />
                    <span>{tag.label}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-background relative z-20">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-12 max-w-6xl">
          {/* Premium tab cards with hover effects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {TABS.map(({ id, label, icon: Icon, desc }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={cn(
                  "group relative text-center rounded-3xl border-2 p-6 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  active === id
                    ? "bg-gradient-to-br from-[#1f2937] to-[#374151] border-[#1f2937] text-white shadow-soft-lg scale-105"
                    : "bg-white border-border hover:border-[#4b5563]/40 hover:shadow-soft-md hover:scale-105"
                )}
              >
                {/* Icon with glow effect when active */}
                <div className={cn(
                  "relative inline-flex mb-4 transition-all duration-300",
                  active === id && "drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                )}>
                  <Icon className={cn("h-7 w-7", active === id ? "text-white" : "text-[#1f2937]")} />
                </div>
                <div className={cn("text-[14px] font-bold leading-tight", active === id ? "text-white" : "text-foreground")}>
                  {label}
                </div>
                {/* Active indicator */}
                {active === id && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Premium content card with glass effect */}
          <div className="relative">
            {/* Glowing background effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#4b5563]/20 via-white/10 to-[#4b5563]/20 rounded-[2rem] blur-xl opacity-50"></div>
            
            {/* Main content */}
            <div className="relative bg-white rounded-[2rem] border-2 border-border shadow-soft-lg overflow-hidden">
              {/* Active tab description header */}
              <div className="bg-gradient-to-r from-[#F9FAFB] to-[#F3F4F6] border-b-2 border-border px-6 md:px-8 py-5">
                <div className="flex items-center gap-3 text-[15px] font-semibold text-foreground">
                  {(() => { const t = TABS.find(t => t.id === active)!; const Icon = t.icon; return (
                    <>
                      <div className="w-10 h-10 bg-[#4b5563]/10 rounded-xl flex items-center justify-center">
                        <Icon className="h-5 w-5 text-[#1f2937]" />
                      </div>
                      <span>{t.desc}</span>
                    </>
                  ); })()}
                </div>
              </div>
              
              {/* Tool content */}
              <div className="p-6 md:p-10">
                <div className={active === "guide"     ? "" : "hidden"}><PropertyTaxGuideUSA /></div>
                <div className={active === "estimator" ? "" : "hidden"}><OverpaymentEstimatorUSA /></div>
                <div className={active === "letter"    ? "" : "hidden"}><AppealLetterUSA /></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium services CTA with gradient */}
      <div className="bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F4F6] py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4b5563]/20 to-white/10 rounded-[2rem] blur-xl opacity-40"></div>
            
            <div className="relative bg-white rounded-[2rem] border-2 border-border p-8 md:p-10 flex flex-col md:flex-row items-start gap-6 shadow-soft-lg">
              <div className="bg-gradient-to-br from-[#4b5563]/10 to-white/5 border-2 border-[#4b5563]/20 rounded-2xl p-4 flex-shrink-0 shadow-soft-sm">
                <Building2 className="h-8 w-8 text-[#1f2937]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display font-bold text-xl md:text-2xl text-foreground mb-3">Professional Appeal Services</h3>
                <p className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed mb-5">
                  Many property tax appeal firms work on contingency — they only charge if they save you money (typically 25–40% of your first year's savings). <strong className="text-foreground">No upfront cost, licensed professionals.</strong>
                </p>
                <div className="flex flex-wrap gap-2.5 mb-5">
                  {["No upfront cost", "Licensed professionals", "Higher success rates"].map(t => (
                    <span key={t} className="bg-gradient-to-r from-[#F9FAFB] to-[#F3F4F6] border border-border text-foreground text-[13px] font-semibold px-4 py-2 rounded-full shadow-soft-xs">{t}</span>
                  ))}
                </div>
                <a 
                  href="mailto:support@taxbandcheck.com?subject=Property Tax Appeal Service Inquiry"
                  className="inline-flex items-center gap-2 bg-[#1f2937] text-white font-semibold text-[14px] px-6 py-3.5 rounded-full hover:bg-[#1f2937]/90 transition-all shadow-soft-md active:scale-95"
                >
                  Contact Expert Team <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-link section */}
      <div className="bg-background py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between flex-wrap gap-6 p-8 bg-gradient-to-r from-[#F9FAFB] to-white rounded-3xl border border-border">
            <div>
              <p className="text-[15px] font-semibold text-foreground mb-1">Also paying UK council tax?</p>
              <p className="text-[13px] text-muted-foreground">Check and appeal your UK council tax band</p>
            </div>
            <Link to="/uk" className="inline-flex items-center gap-2 bg-[#192c58] text-white font-semibold text-[14px] px-6 py-3.5 rounded-full hover:bg-[#192c58]/90 transition-all shadow-soft-md active:scale-95">
              UK Council Tax Guide <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

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
    </main>
  );
};

export default USAPage;
