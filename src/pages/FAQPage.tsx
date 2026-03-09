import FAQ from "@/components/FAQ";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FAQPage = () => {
  return (
    <main>
      <div className="bg-primary text-primary-foreground py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-primary-foreground/70 text-sm max-w-2xl">
            Everything you need to know about council tax bands, property tax appeals, and how to reduce your bill.
          </p>
        </div>
      </div>
      <FAQ />
      <div className="bg-card border-t border-border py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-xl text-foreground mb-3">Ready to Check Your Property Tax?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/uk">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                🇬🇧 UK Council Tax Checker <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/usa">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary-subtle font-semibold">
                🇺🇸 USA Property Tax Guide <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FAQPage;
