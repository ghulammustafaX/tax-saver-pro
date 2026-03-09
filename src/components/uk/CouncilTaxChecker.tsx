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
  <div className="flex items-center gap-3 mb-5">
    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
      {number}
    </div>
    <div>
      <h3 className="font-semibold text-foreground leading-tight">{title}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
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
    <div className="space-y-5">
      {/* Step 1 */}
      <div>
        <Step number="1" title="Enter your postcode" subtitle="We'll guide you to your official council tax band" />
        <div className="flex gap-2">
          <Input
            placeholder="e.g. SW1A 1AA"
            value={postcode}
            onChange={(e) => { setPostcode(e.target.value); setSubmitted(false); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            className="font-mono uppercase text-base h-11"
            maxLength={8}
          />
          <Button onClick={handleCheck} className="h-11 px-6 font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
            Check
          </Button>
        </div>
        {error && (
          <p className="text-destructive text-xs mt-2 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" /> {error}
          </p>
        )}
      </div>

      {submitted && (
        <div className="space-y-4 animate-fade-in">
          {/* Divider */}
          <div className="border-t border-border" />

          {/* Step 2 */}
          <div>
            <Step number="2" title="Find your current band" subtitle="Check the official VOA register — free and takes 30 seconds" />
            <div className="bg-primary-subtle border border-primary/15 rounded-xl p-4 mb-3">
              <p className="text-sm text-foreground mb-3">
                Search for your property at <strong>{formattedPostcode}</strong> and note your band (A–H):
              </p>
              <a
                href="https://www.gov.uk/council-tax-bands"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Open Official VOA Band Checker
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="flex items-start gap-2.5 p-3 bg-secondary rounded-lg border border-border text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-primary" />
              <span><strong className="text-foreground">Can't find it?</strong> Try searching by street name only, or call the VOA on <strong className="text-foreground">03000 501 501</strong> (Mon–Fri, 8.30am–5pm).</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Step 3 */}
          <div>
            <Step number="3" title="Is your band wrong? Run these 3 checks" subtitle="Any one of these could be grounds for a successful appeal" />

            <div className="space-y-3">
              {/* Check 1 */}
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Check 1</span>
                  <span className="font-semibold text-sm text-foreground">Comparable Properties</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Look up your neighbours on the VOA website. If similar houses on your street are in a lower band, yours may be wrong — this is the strongest grounds for appeal.
                </p>
                <a
                  href="https://www.gov.uk/council-tax-bands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary text-xs font-semibold hover:underline"
                >
                  Search neighbour bands on VOA <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Check 2 */}
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Check 2</span>
                  <span className="font-semibold text-sm text-foreground">1991 Value Test</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  Bands were set using 1991 property values. Use our <strong className="text-foreground">1991 Estimator</strong> tab to see if your 1991 value matches your current band.
                </p>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5">
                  {UK_BANDS.map((b) => (
                    <div key={b.band} className="bg-secondary rounded-lg px-1.5 py-2 text-center border border-border">
                      <div className="font-bold text-xs text-primary">Band {b.band}</div>
                      <div className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Check 3 */}
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Check 3</span>
                  <span className="font-semibold text-sm text-foreground">Recent Changes</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Has your property been subdivided, merged, or significantly altered since 1991? Was a new band set recently after you moved in? These can create a fresh appeal window.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-saving-light border border-saving/30 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-saving mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Think you're in the wrong band?</p>
              <p className="text-xs text-muted-foreground mb-2 leading-relaxed">Use the other tabs to estimate your 1991 value, calculate savings, and generate a free appeal letter.</p>
              <p className="text-xs font-semibold text-saving flex items-center gap-1">
                <ArrowRight className="h-3 w-3" />
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
