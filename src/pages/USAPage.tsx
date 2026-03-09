import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyTaxGuideUSA from "@/components/usa/PropertyTaxGuideUSA";
import OverpaymentEstimatorUSA from "@/components/usa/OverpaymentEstimatorUSA";
import AppealLetterUSA from "@/components/usa/AppealLetterUSA";
import { Link } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";

const USAPage = () => {
  return (
    <main>
      {/* Page header */}
      <div className="bg-primary text-primary-foreground py-10 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🇺🇸</span>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">Property Tax Appeal Guide 2025</h1>
              <p className="text-primary-foreground/70 text-sm">Lower Your Property Tax Bill — State-by-State Guide</p>
            </div>
          </div>
          <p className="text-primary-foreground/80 text-sm max-w-2xl">
            30–60% of US properties are over-assessed. Successful appeals save homeowners an average of $500–$2,000 per year. Our free tools guide you through every step, for all 50 states.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            {["All 50 states covered", "Free appeal letter generator", "Based on state assessment records", "No lawyer required"].map((tag) => (
              <span key={tag} className="bg-primary-foreground/10 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full border border-primary-foreground/20">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="guide" className="w-full">
          <div className="overflow-x-auto -mx-4 px-4 mb-6">
            <TabsList className="bg-secondary border border-border h-auto p-1 flex gap-1 w-max min-w-full md:min-w-0">
              <TabsTrigger value="guide" className="text-xs md:text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
                📋 State Appeal Guide
              </TabsTrigger>
              <TabsTrigger value="estimator" className="text-xs md:text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
                📊 Overpayment Estimator
              </TabsTrigger>
              <TabsTrigger value="letter" className="text-xs md:text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
                📝 Appeal Letter
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="guide">
            <PropertyTaxGuideUSA />
          </TabsContent>
          <TabsContent value="estimator">
            <OverpaymentEstimatorUSA />
          </TabsContent>
          <TabsContent value="letter">
            <AppealLetterUSA />
          </TabsContent>
        </Tabs>

        {/* Professional services CTA */}
        <div className="mt-10 bg-card rounded-xl border border-border shadow-card p-6">
          <div className="flex items-start gap-4">
            <div className="bg-accent-light rounded-lg p-3 flex-shrink-0">
              <Building2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground mb-1">Professional Appeal Services</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Many property tax appeal firms work on contingency — they only charge if they save you money (typically 25–40% of your first year's savings). For high-value properties or complex cases, this is often worth it.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="bg-secondary px-2 py-1 rounded">No upfront cost</span>
                <span className="bg-secondary px-2 py-1 rounded">Licensed professionals</span>
                <span className="bg-secondary px-2 py-1 rounded">Higher success rates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-link to UK */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Also paying UK council tax?</p>
          <Link to="/uk" className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:underline">
            Check UK Council Tax Band Checker <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default USAPage;
