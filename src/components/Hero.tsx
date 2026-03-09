import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-background pt-16 pb-12 md:pt-24 md:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Alert pill */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 border border-border bg-secondary text-muted-foreground rounded-full px-4 py-1.5 text-xs font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saving opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-saving"></span>
            </span>
            5 million UK homes may be in the wrong council tax band
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="font-display text-4xl md:text-6xl font-black text-foreground mb-5 leading-tight tracking-tight">
            Are you overpaying<br />
            <span className="text-primary">your property tax?</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Free tools to check, challenge, and reduce your council tax band (UK) or property tax assessment (USA) — no sign-up needed.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <Link
            to="/uk"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-colors shadow-primary"
          >
            🇬🇧 Check UK Council Tax Band
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/usa"
            className="inline-flex items-center gap-2 bg-secondary text-foreground font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-border transition-colors"
          >
            🇺🇸 USA Property Tax Guide
          </Link>
        </div>

        {/* Savings stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
          <div className="bg-saving-light border border-saving/20 rounded-2xl p-5 text-center">
            <div className="text-3xl font-display font-black text-saving mb-1">£400</div>
            <div className="text-xs text-muted-foreground font-medium">Average UK annual saving</div>
          </div>
          <div className="bg-saving-light border border-saving/20 rounded-2xl p-5 text-center">
            <div className="text-3xl font-display font-black text-saving mb-1">£12,000+</div>
            <div className="text-xs text-muted-foreground font-medium">Max backdated UK refund</div>
          </div>
          <div className="bg-saving-light border border-saving/20 rounded-2xl p-5 text-center">
            <div className="text-3xl font-display font-black text-saving mb-1">$1,500</div>
            <div className="text-xs text-muted-foreground font-medium">Average USA annual saving</div>
          </div>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-saving" />
            100% Free
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-saving" />
            No registration required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-saving" />
            Based on official VOA guidelines
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-saving" />
            30–60% of properties over-assessed
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
