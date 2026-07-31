import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, CheckCircle, AlertTriangle, Info, ArrowRight } from "lucide-react";

export const UK_BANDS = [
  { band: "A", min: 0,      max: 40000,   label: "Up to £40,000" },
  { band: "B", min: 40001,  max: 52000,   label: "£40,001 – £52,000" },
  { band: "C", min: 52001,  max: 68000,   label: "£52,001 – £68,000" },
  { band: "D", min: 68001,  max: 88000,   label: "£68,001 – £88,000" },
  { band: "E", min: 88001,  max: 120000,  label: "£88,001 – £120,000" },
  { band: "F", min: 120001, max: 160000,  label: "£120,001 – £160,000" },
  { band: "G", min: 160001, max: 320000,  label: "£160,001 – £320,000" },
  { band: "H", min: 320001, max: Infinity, label: "Over £320,000" },
];

export function getBandFromValue(value1991: number): string {
  for (const b of UK_BANDS) {
    if (value1991 <= b.max) return b.band;
  }
  return "H";
}

function validateUKPostcode(postcode: string): boolean {
  const re = /^[A-Z]{1,2}[0-9][0-9A-Z]?\s*[0-9][ABD-HJLNP-UW-Z]{2}$/i;
  return re.test(postcode.trim());
}

const Step = ({ number, title, subtitle }: { number: string; title: string; subtitle: string }) => (
  <div className="flex items-center gap-3.5 mb-6">
    <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm flex-shrink-0 shadow-soft-xs">
      {number}
    </div>
    <div>
      <h3 className="font-semibold text-foreground leading-tight tracking-tight text-base">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 font-medium">{subtitle}</p>
    </div>
  </div>
);

const CouncilTaxChecker = () => {
  const [postcode, setPostcode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleCheck = () => {
    const clean = postcode.trim().toUpperCase();
    if (!validateUKPostcode(clean)) {
      setError("Please enter a valid UK postcode (e.g. SW1A 1AA)");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const formattedPostcode = postcode.trim().toUpperCase();

  return (
    <div className="space-y-6">
      {/* Step 1 */}
      <div>
        <Step number="1" title="Enter your postcode" subtitle="We'll guide you to your official council tax band" />
        <div className="flex gap-3">
          <Input
            placeholder="e.g. SW1A 1AA"
            value={postcode}
            className="h-12 text-base font-semibold border-2 border-[#192c58] bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-md hover:shadow-lg hover:border-[#1E3A8A] focus:border-[#1E3A8A] hover:from-[#e5e7eb] hover:to-[#d1d5db] transition-all"
            onChange={(e) => { setPostcode(e.target.value); setSubmitted(false); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            className="font-mono uppercase text-sm h-12 bg-input border-border rounded-xl px-4 focus:bg-card transition-colors"
            maxLength={8}
          />
          <Button onClick={handleCheck} className="h-12 px-6 font-semibold text-sm rounded-xl bg-primary text-primary-foreground hover:bg-primary-light active-scale shadow-soft-sm">
            Check
          </Button>
        </div>
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-3.5 py-2.5 mt-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 text-destructive" />
            <p className="text-destructive text-sm font-semibold">{error}</p>
          </div>
        )}
      </div>

      {submitted && (
        <div className="space-y-5 animate-fade-in">
          {/* Divider */}
          <div className="border-t border-border" />

          {/* Step 2 */}
          <div>
            <Step number="2" title="Find your current band" subtitle="Check the official VOA register — free and takes 30 seconds" />
            <div className="bg-primary-subtle border border-primary/20 rounded-2xl p-5 mb-3 shadow-soft-sm">
              <p className="text-sm text-foreground mb-4 font-medium">
                Search for your property at <strong className="font-semibold text-primary">{formattedPostcode}</strong> and note your band (A–H):
              </p>
              <a
                href="https://www.gov.uk/council-tax-bands"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-primary text-primary-foreground text-sm font-semibold px-5 py-3 rounded-xl hover:bg-primary-light transition-all active-scale shadow-soft-xs"
              >
                Open Official VOA Band Checker
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="flex items-start gap-3 p-3.5 bg-card rounded-xl border border-border text-sm text-muted-foreground shadow-soft-xs">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="font-medium"><strong className="text-foreground font-semibold">Can't find it?</strong> Try searching by street name only, or call the VOA on <strong className="text-foreground font-semibold">03000 501 501</strong> (Mon–Fri, 8.30am–5pm).</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Step 3 */}
          <div>
            <Step number="3" title="Is your band wrong? Run these 3 checks" subtitle="Any one of these could be grounds for a successful appeal" />

            <div className="space-y-3">
              {/* Check 1 */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft-sm hover:shadow-soft-md transition-shadow">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Check 1</span>
                  <span className="font-semibold text-sm text-foreground tracking-tight">Comparable Properties</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3.5 leading-relaxed font-medium">
                  Look up your neighbours on the VOA website. If similar houses on your street are in a lower band, yours may be wrong — this is the strongest grounds for appeal.
                </p>
                <a
                  href="https://www.gov.uk/council-tax-bands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:text-primary-light transition-colors"
                >
                  Search neighbour bands on VOA <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Check 2 */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft-sm hover:shadow-soft-md transition-shadow">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Check 2</span>
                  <span className="font-semibold text-sm text-foreground tracking-tight">1991 Value Test</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed font-medium">
                  Bands were set using 1991 property values. Use our <strong className="text-foreground font-semibold">1991 Estimator</strong> tab to see if your 1991 value matches your current band.
                </p>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                  {UK_BANDS.map((b) => (
                    <div key={b.band} className="bg-secondary rounded-xl px-2 py-2.5 text-center border border-border shadow-soft-xs">
                      <div className="font-semibold text-xs text-primary">Band {b.band}</div>
                      <div className="text-[9px] text-muted-foreground mt-1 leading-tight font-medium">{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Check 3 */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-soft-sm hover:shadow-soft-md transition-shadow">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Check 3</span>
                  <span className="font-semibold text-sm text-foreground tracking-tight">Recent Changes</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  Has your property been subdivided, merged, or significantly altered since 1991? Was a new band set recently after you moved in? These can create a fresh appeal window.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-saving-light border border-saving/30 rounded-2xl p-5 flex items-start gap-3.5 shadow-soft-sm">
            <div className="w-8 h-8 rounded-xl bg-saving flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1.5 tracking-tight">Think you're in the wrong band?</p>
              <p className="text-sm text-muted-foreground mb-2.5 leading-relaxed font-medium">Use the other tabs to estimate your 1991 value, calculate savings, and generate a free appeal letter.</p>
              <p className="text-sm font-semibold text-saving flex items-center gap-1.5">
                <ArrowRight className="h-3.5 w-3.5" />
                A successful appeal could save £400+/year with a backdated refund back to 1993
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouncilTaxChecker;
