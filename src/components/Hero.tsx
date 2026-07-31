import { Link } from "react-router-dom";
import { ArrowRight, TrendingDown, PoundSterling } from "lucide-react";

const AnimatedDashboard = () => (
  <div className="relative w-full h-full min-h-[420px] flex items-center justify-center select-none">
    {/* Subtle background glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-saving/3 rounded-3xl blur-2xl" />

    {/* Main card - more compact */}
    <div className="relative z-10 w-full max-w-md">
      {/* Band result card - compact Apple style */}
      <div className="bg-card border border-border rounded-[24px] shadow-soft-md p-5 mb-3 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Your Council Tax Band</div>
          <span className="text-[11px] bg-accent-light text-accent-brand font-semibold px-2 py-0.5 rounded-full border border-accent/20">Live Check</span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-center flex-1">
            <div className="text-4xl font-display font-bold text-muted-foreground line-through decoration-destructive decoration-2">D</div>
            <div className="text-[10px] text-muted-foreground mt-1.5 font-medium">Current</div>
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center gap-1.5 bg-saving-light rounded-full px-3 py-1 border border-saving/20">
              <TrendingDown className="h-3.5 w-3.5 text-saving" />
              <span className="text-[11px] font-semibold text-saving">Should be</span>
            </div>
          </div>
          <div className="text-center flex-1">
            <div className="text-4xl font-display font-bold text-saving">B</div>
            <div className="text-[10px] text-muted-foreground mt-1.5 font-medium">Correct</div>
          </div>
        </div>
        <div className="pt-4 border-t border-border">
          <div className="text-[11px] text-muted-foreground mb-1.5 font-medium">Annual overpayment</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-display font-bold text-foreground">£412</span>
            <span className="text-sm font-medium text-muted-foreground">/ year</span>
          </div>
        </div>
      </div>

      {/* Savings breakdown - compact */}
      <div className="bg-saving text-white rounded-[24px] p-5 shadow-saving animate-fade-in" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
        <div className="flex items-center gap-2 mb-2 opacity-90">
          <PoundSterling className="h-4 w-4" />
          <span className="text-xs font-semibold">Backdated refund (since 1993)</span>
        </div>
        <div className="text-[36px] font-display font-bold leading-none mb-1.5">£12,360</div>
        <div className="text-xs opacity-80 font-medium">30 years × £412/year</div>
      </div>
    </div>

    {/* Decorative floating dots - subtle */}
    <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-saving/25 animate-[pulse_3s_ease-in-out_infinite]" />
    <div className="absolute bottom-12 left-5 w-1 h-1 rounded-full bg-primary/20 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
    <div className="absolute top-1/2 right-3 w-1 h-1 rounded-full bg-accent/25 animate-[pulse_2.5s_ease-in-out_infinite_1s]" />
  </div>
);

const Hero = () => {
  return (
    <section className="bg-background pb-12 md:pb-16 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 pt-10 md:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">

          {/* Left — Headline & CTAs */}
          <div className="animate-fade-in">
            {/* Alert pill - compact */}
            <div className="inline-flex items-center gap-2 bg-card border border-border text-muted-foreground rounded-full px-3.5 py-1.5 text-[11px] font-medium mb-6 shadow-soft-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saving opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-saving"></span>
              </span>
              <span className="text-foreground font-semibold">5 million UK homes may be in the wrong band</span>
            </div>

            {/* Headline - more compact */}
            <h1 className="font-display text-4xl md:text-5xl xl:text-[56px] font-bold text-foreground mb-4 leading-[1.08] tracking-tight">
              Are you overpaying<br />
              your property<br />
              <span className="text-primary">tax?</span>
            </h1>

            <p className="text-muted-foreground text-base leading-relaxed mb-7">
              Millions overpay every year. Check your band, spot errors, and challenge your assessment completely free, takes 2 minutes.
            </p>

            {/* CTAs - country branded colors */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link
                to="/uk"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-full hover:bg-primary-light transition-all active-scale shadow-soft-sm"
              >
                🇬🇧 Check UK Council Tax
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/usa"
                className="inline-flex items-center justify-center gap-2 bg-[#1E3A8A] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#1E40AF] transition-all active-scale shadow-soft-sm"
              >
                🇺🇸 USA Property Tax Guide
              </Link>
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
