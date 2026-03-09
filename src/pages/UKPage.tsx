import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CouncilTaxChecker from "@/components/uk/CouncilTaxChecker";
import ValueEstimator1991 from "@/components/uk/ValueEstimator1991";
import AppealLetterUK from "@/components/uk/AppealLetterUK";
import SavingsCalculatorUK from "@/components/uk/SavingsCalculatorUK";
import ReductionCheckerUK from "@/components/uk/ReductionCheckerUK";
import { Link } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";

const UKPage = () => {
  return (
    <main>
      {/* Page header */}
      <div className="bg-primary text-primary-foreground py-10 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🇬🇧</span>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold">Council Tax Band Checker 2025</h1>
              <p className="text-primary-foreground/70 text-sm">Are You Paying Too Much? Check and Appeal for Free</p>
            </div>
          </div>
          <p className="text-primary-foreground/80 text-sm max-w-2xl">
            5 million UK properties are in the wrong council tax band. The average overpayment is £400/year — with backdated refunds possible going back to 1993. Use our free tools below.
          </p>

          {/* SEO meta info for users */}
          <div className="flex flex-wrap gap-3 mt-4">
            {["Free to use", "Based on official VOA guidelines", "Formal appeal letter included", "No win, no fee services available"].map((tag) => (
              <span key={tag} className="bg-primary-foreground/10 text-primary-foreground text-xs font-medium px-3 py-1 rounded-full border border-primary-foreground/20">
                ✓ {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="checker" className="w-full">
          <div className="overflow-x-auto -mx-4 px-4 mb-6">
            <TabsList className="bg-secondary border border-border h-auto p-1 flex gap-1 w-max min-w-full md:min-w-0">
              <TabsTrigger value="checker" className="text-xs md:text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
                🔍 Band Checker
              </TabsTrigger>
              <TabsTrigger value="estimator" className="text-xs md:text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
                📊 1991 Estimator
              </TabsTrigger>
              <TabsTrigger value="savings" className="text-xs md:text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
                💰 Savings Calculator
              </TabsTrigger>
              <TabsTrigger value="letter" className="text-xs md:text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
                📝 Appeal Letter
              </TabsTrigger>
              <TabsTrigger value="discounts" className="text-xs md:text-sm font-medium whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2">
                🎁 Discounts
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="checker">
            <CouncilTaxChecker />
          </TabsContent>
          <TabsContent value="estimator">
            <ValueEstimator1991 />
          </TabsContent>
          <TabsContent value="savings">
            <SavingsCalculatorUK />
          </TabsContent>
          <TabsContent value="letter">
            <AppealLetterUK />
          </TabsContent>
          <TabsContent value="discounts">
            <ReductionCheckerUK />
          </TabsContent>
        </Tabs>

        {/* Professional services CTA */}
        <div className="mt-10 bg-card rounded-xl border border-border shadow-card p-6">
          <div className="flex items-start gap-4">
            <div className="bg-accent-light rounded-lg p-3 flex-shrink-0">
              <Building2 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground mb-1">Want Expert Help? No Win, No Fee Services</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Some professional appeal firms handle everything for you — and only charge a fee if they win (typically 25–35% of your first year's saving). For complex cases or if DIY appeals have been refused, this can be worthwhile.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="bg-secondary px-2 py-1 rounded">No upfront cost</span>
                <span className="bg-secondary px-2 py-1 rounded">Experts handle all paperwork</span>
                <span className="bg-secondary px-2 py-1 rounded">Higher success rates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cross-link to USA */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Also paying US property tax?</p>
          <Link to="/usa" className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:underline">
            Check USA Property Tax Guide <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UKPage;
