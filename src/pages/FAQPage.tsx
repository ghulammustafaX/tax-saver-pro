import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import { fullFaqSchema, faqBreadcrumbSchema } from "@/lib/seo-schemas";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

const FAQPage = () => {
  return (
    <main className="bg-background min-h-screen">
      <SEO
        title="Council Tax & Property Tax FAQ — Everything You Need to Know"
        description="Answers to the most common questions about UK council tax bands, how to appeal, backdated refunds, USA property tax over-assessment, and appeal deadlines for all 50 states."
        canonical="/faq"
        jsonLd={[faqBreadcrumbSchema, fullFaqSchema]}
      />

      {/* Page header */}
      <div className="border-b border-border pt-10 pb-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Help Centre</p>
          <h1 className="font-display text-3xl md:text-4xl font-black text-foreground mb-3">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
            Everything you need to know about council tax bands, property tax appeals, and how to reduce your bill.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {["UK council tax", "USA property tax", "Appeals process", "Discounts & refunds"].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5 bg-secondary border border-border text-muted-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                <CheckCircle className="h-3 w-3 text-saving" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ content */}
      <FAQ />

      {/* CTA footer */}
      <div className="border-t border-border py-12 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Still have questions?</p>
          <h2 className="font-display font-black text-xl text-foreground mb-2">Ready to check your property tax?</h2>
          <p className="text-sm text-muted-foreground mb-6">Use our free tools — takes under 5 minutes, no sign-up needed.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/uk"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-primary"
            >
              🇬🇧 UK Council Tax Checker <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/usa"
              className="inline-flex items-center gap-2 bg-background border border-border text-foreground font-semibold text-sm px-6 py-3 rounded-xl hover:bg-secondary transition-colors"
            >
              🇺🇸 USA Property Tax Guide
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FAQPage;
