import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, TrendingDown, PoundSterling } from "lucide-react";

const AnimatedDashboard = () => (
  <div className="relative w-full h-full min-h-[420px] flex items-center justify-center select-none">
    {/* Background glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-saving/5 rounded-3xl" />

    {/* Main card */}
    <div className="relative z-10 w-full max-w-sm">
      {/* Band result card */}
      <div className="bg-background border border-border rounded-2xl shadow-card p-5 mb-3 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your Council Tax Band</div>
          <span className="text-xs bg-saving-light text-saving font-semibold px-2 py-0.5 rounded-full">Live Check</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-display font-black text-muted-foreground line-through decoration-destructive">D</div>
            <div className="text-xs text-muted-foreground mt-1">Current</div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-1.5 bg-saving-light rounded-full px-3 py-1">
              <TrendingDown className="h-3.5 w-3.5 text-saving" />
              <span className="text-xs font-semibold text-saving">Should be</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-display font-black text-saving">B</div>
            <div className="text-xs text-muted-foreground mt-1">Correct</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-1">Annual overpayment</div>
          <div className="text-2xl font-display font-black text-foreground">£412 <span className="text-sm font-body font-normal text-muted-foreground">/ year</span></div>
        </div>
      </div>

      {/* Savings breakdown */}
      <div className="bg-saving text-saving-foreground rounded-2xl p-4 mb-3 shadow-saving animate-fade-in" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
        <div className="flex items-center gap-2 mb-2">
          <PoundSterling className="h-4 w-4 opacity-80" />
          <span className="text-xs font-semibold opacity-90">Backdated refund (since 1993)</span>
        </div>
        <div className="text-3xl font-display font-black">£12,360</div>
        <div className="text-xs opacity-70 mt-1">30 years × £412/year</div>
      </div>

      {/* Floating check items */}
      <div className="grid grid-cols-2 gap-2 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
        <div className="bg-background border border-border rounded-xl p-3 flex items-center gap-2">
          <CheckCircle className="h-3.5 w-3.5 text-saving flex-shrink-0" />
          <span className="text-xs font-medium text-foreground">Postcode verified</span>
        </div>
        <div className="bg-background border border-border rounded-xl p-3 flex items-center gap-2">
          <CheckCircle className="h-3.5 w-3.5 text-saving flex-shrink-0" />
          <span className="text-xs font-medium text-foreground">1991 value matched</span>
        </div>
        <div className="bg-background border border-border rounded-xl p-3 flex items-center gap-2">
          <CheckCircle className="h-3.5 w-3.5 text-saving flex-shrink-0" />
          <span className="text-xs font-medium text-foreground">Neighbours checked</span>
        </div>
        <div className="bg-primary-subtle border border-primary/20 rounded-xl p-3 flex items-center gap-2">
          <span className="text-xs">📄</span>
          <span className="text-xs font-medium text-primary">Letter ready</span>
        </div>
      </div>
    </div>

    {/* Decorative floating dots */}
    <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-saving opacity-40 animate-[pulse_3s_ease-in-out_infinite]" />
    <div className="absolute bottom-10 left-4 w-1.5 h-1.5 rounded-full bg-primary opacity-30 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
    <div className="absolute top-1/2 right-2 w-1 h-1 rounded-full bg-accent opacity-50 animate-[pulse_2.5s_ease-in-out_infinite_1s]" />
  </div>
);

const Hero = () => {
  return (
    <section className="bg-background pt-14 pb-12 md:pt-20 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">

          {/* Left — Headline & CTAs */}
          <div className="animate-fade-in">
            {/* Alert pill */}
            <div className="inline-flex items-center gap-2 border border-border bg-secondary text-muted-foreground rounded-full px-4 py-1.5 text-xs font-medium mb-7">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saving opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-saving"></span>
              </span>
              5 million UK homes may be in the wrong band
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-black text-foreground mb-5 leading-[1.08] tracking-tight">
              Are you overpaying<br />
              <span className="text-primary">your property<br />tax?</span>
            </h1>

            <p className="text-muted-foreground text-base md:text-lg max-w-lg leading-relaxed mb-8">
              Free tools to check, challenge, and reduce your council tax band (UK) or property tax assessment (USA) — no sign-up needed.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                to="/uk"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-primary/90 transition-colors shadow-primary"
              >
                🇬🇧 Check UK Council Tax
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/usa"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-foreground font-semibold text-sm px-6 py-3.5 rounded-xl hover:bg-border transition-colors border border-border"
              >
                🇺🇸 USA Property Tax Guide
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-saving" />
                100% Free
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-saving" />
                No registration
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-saving" />
                Official VOA guidelines
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-saving" />
                30–60% over-assessed
              </span>
            </div>
          </div>

          {/* Right — Animated dashboard */}
          <div className="lg:pl-6 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            <AnimatedDashboard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
