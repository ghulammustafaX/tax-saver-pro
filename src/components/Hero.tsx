import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingDown, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(38 90% 52%) 1px, transparent 1px),
                            radial-gradient(circle at 80% 50%, hsl(38 90% 52%) 1px, transparent 1px)`,
          backgroundSize: "60px 60px"
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Alert badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 text-accent rounded-full px-4 py-1.5 text-sm font-medium mb-6 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            5 million UK properties may be in the wrong council tax band
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-black mb-4 leading-tight animate-fade-up">
            Are You Overpaying<br />
            <span className="text-accent">Your Property Tax?</span>
          </h1>

          <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Check your council tax band (UK) or property tax assessment (USA) in minutes. 
            Free tools to challenge overpayments and reclaim what's yours.
          </p>

          {/* Savings highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-saving rounded-xl p-4 text-saving-foreground shadow-saving">
              <div className="text-3xl font-display font-black">£400</div>
              <div className="text-sm opacity-90">Average UK annual saving</div>
            </div>
            <div className="bg-saving rounded-xl p-4 text-saving-foreground shadow-saving">
              <div className="text-3xl font-display font-black">£12,000+</div>
              <div className="text-sm opacity-90">Max backdated UK refund (30 years)</div>
            </div>
            <div className="bg-saving rounded-xl p-4 text-saving-foreground shadow-saving">
              <div className="text-3xl font-display font-black">$1,500</div>
              <div className="text-sm opacity-90">Average USA annual saving</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link to="/uk">
              <Button size="lg" className="bg-accent text-foreground hover:bg-accent/90 font-bold text-base px-8 shadow-md">
                🇬🇧 Check UK Council Tax Band
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/usa">
              <Button size="lg" variant="outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8">
                🇺🇸 USA Property Tax Guide
              </Button>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-primary-foreground/70 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-saving" /> 100% Free</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-saving" /> No registration required</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-saving" /> Based on official VOA guidelines</span>
            <span className="flex items-center gap-1.5"><TrendingDown className="h-4 w-4 text-saving" /> 30-60% of properties over-assessed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
