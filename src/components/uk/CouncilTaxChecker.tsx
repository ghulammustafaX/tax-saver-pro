import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, CheckCircle, AlertTriangle, Info } from "lucide-react";

// UK council tax bands based on 1991 property values
export const UK_BANDS = [
  { band: "A", min: 0, max: 40000, label: "Up to £40,000" },
  { band: "B", min: 40001, max: 52000, label: "£40,001 – £52,000" },
  { band: "C", min: 52001, max: 68000, label: "£52,001 – £68,000" },
  { band: "D", min: 68001, max: 88000, label: "£68,001 – £88,000" },
  { band: "E", min: 88001, max: 120000, label: "£88,001 – £120,000" },
  { band: "F", min: 120001, max: 160000, label: "£120,001 – £160,000" },
  { band: "G", min: 160001, max: 320000, label: "£160,001 – £320,000" },
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
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">Enter Your Postcode</h3>
            <p className="text-muted-foreground text-sm mt-0.5">We'll guide you to look up your council tax band for free</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="postcode" className="sr-only">Postcode</Label>
            <Input
              id="postcode"
              placeholder="e.g. SW1A 1AA"
              value={postcode}
              onChange={(e) => { setPostcode(e.target.value); setSubmitted(false); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              className="text-lg font-mono uppercase"
              maxLength={8}
            />
          </div>
          <Button onClick={handleCheck} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6">
            Check
          </Button>
        </div>
        {error && (
          <p className="text-destructive text-sm mt-2 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" /> {error}
          </p>
        )}
      </div>

      {submitted && (
        <>
          {/* Step 2 */}
          <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-fade-up">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Find Your Current Band</h3>
                <p className="text-muted-foreground text-sm mt-0.5">Check the official VOA register — it's free and takes 30 seconds</p>
              </div>
            </div>
            <div className="bg-primary-subtle rounded-lg p-4 mb-4 border border-primary/20">
              <p className="text-sm text-foreground font-medium mb-3">
                👉 Click the link below, search for your property in <strong>{formattedPostcode}</strong>, and note your band (A–H):
              </p>
              <a
                href={`https://www.gov.uk/council-tax-bands`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-colors"
              >
                Open Official VOA Band Checker
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="flex items-start gap-2 p-3 bg-accent-light rounded-lg border border-accent/30">
              <Info className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">
                <strong>Can't find it?</strong> Try searching by street name only, or call the VOA on <strong>03000 501 501</strong> (Mon–Fri, 8.30am–5pm).
              </p>
            </div>
          </div>

          {/* Step 3 — 3 Checks */}
          <div className="bg-card rounded-xl border border-border shadow-card p-6 animate-fade-up">
            <div className="flex items-start gap-3 mb-5">
              <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
              <div>
                <h3 className="font-display font-bold text-lg text-foreground">Is Your Band Wrong? Run These 3 Checks</h3>
                <p className="text-muted-foreground text-sm mt-0.5">Any one of these could be grounds for a successful appeal</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Check 1 */}
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-accent text-foreground text-xs font-bold px-2 py-0.5 rounded">CHECK 1</span>
                  <span className="font-semibold text-foreground">Comparable Properties</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Look up your neighbours on the VOA website. If similar houses on your street are in a lower band, yours may be wrong. This is the strongest grounds for appeal.
                </p>
                <a
                  href="https://www.gov.uk/council-tax-bands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-sm font-medium hover:underline inline-flex items-center gap-1"
                >
                  Search neighbour bands on VOA <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* Check 2 */}
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-accent text-foreground text-xs font-bold px-2 py-0.5 rounded">CHECK 2</span>
                  <span className="font-semibold text-foreground">1991 Value Test</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Council tax bands were set in 1991. Use our estimator below (Tool 2) to find your property's approximate 1991 value and see if it matches your current band.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {UK_BANDS.map((b) => (
                    <div key={b.band} className="bg-secondary rounded px-2 py-1 text-center">
                      <div className="font-bold text-primary">Band {b.band}</div>
                      <div className="text-muted-foreground">{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Check 3 */}
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-accent text-foreground text-xs font-bold px-2 py-0.5 rounded">CHECK 3</span>
                  <span className="font-semibold text-foreground">Recent Changes</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Has your property been significantly altered, subdivided, or merged since 1991? Was a new band set recently after you moved in? These can create a fresh appeal window. Contact the VOA to request a review.
                </p>
              </div>
            </div>
          </div>

          {/* Next steps CTA */}
          <div className="bg-saving-light border border-saving rounded-xl p-5 animate-fade-up">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-saving mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-display font-bold text-foreground mb-1">Think You're in the Wrong Band?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Use the tabs below to estimate your 1991 value, calculate your potential savings, and generate a free formal appeal letter.
                </p>
                <p className="text-sm font-semibold text-saving">
                  💰 A successful appeal could save you £400+/year and secure a backdated refund going back to 1993.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CouncilTaxChecker;
