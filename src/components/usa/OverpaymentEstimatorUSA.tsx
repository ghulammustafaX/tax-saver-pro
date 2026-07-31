import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, Info, ArrowRight } from "lucide-react";

const STATE_RATES: Record<string, { rate: number; avgBill: number; label: string; appealDeadline: string }> = {
  AL: { rate: 0.41, avgBill: 646,  label: "Alabama",              appealDeadline: "30 days after assessment notice" },
  AK: { rate: 1.04, avgBill: 3564, label: "Alaska",               appealDeadline: "30 days after assessment" },
  AZ: { rate: 0.60, avgBill: 1648, label: "Arizona",              appealDeadline: "60 days after assessment" },
  AR: { rate: 0.64, avgBill: 812,  label: "Arkansas",             appealDeadline: "30 days after assessment" },
  CA: { rate: 0.73, avgBill: 4279, label: "California",           appealDeadline: "Sep 15 – Nov 30 (varies by county)" },
  CO: { rate: 0.49, avgBill: 1868, label: "Colorado",             appealDeadline: "June 1 (odd years)" },
  CT: { rate: 2.14, avgBill: 5746, label: "Connecticut",          appealDeadline: "February (varies by town)" },
  DE: { rate: 0.56, avgBill: 1570, label: "Delaware",             appealDeadline: "April 1 most counties" },
  FL: { rate: 0.86, avgBill: 2143, label: "Florida",              appealDeadline: "25 days after assessment notice (Sep)" },
  GA: { rate: 0.83, avgBill: 1920, label: "Georgia",              appealDeadline: "45 days after assessment" },
  HI: { rate: 0.29, avgBill: 1971, label: "Hawaii",               appealDeadline: "April 9 – April 9" },
  ID: { rate: 0.67, avgBill: 1492, label: "Idaho",                appealDeadline: "June 15" },
  IL: { rate: 2.07, avgBill: 4942, label: "Illinois",             appealDeadline: "30 days after publication" },
  IN: { rate: 0.83, avgBill: 1388, label: "Indiana",              appealDeadline: "June 15" },
  IA: { rate: 1.53, avgBill: 2382, label: "Iowa",                 appealDeadline: "April 30" },
  KS: { rate: 1.29, avgBill: 2445, label: "Kansas",               appealDeadline: "30 days after notice of value" },
  KY: { rate: 0.83, avgBill: 1382, label: "Kentucky",             appealDeadline: "May 20" },
  LA: { rate: 0.55, avgBill: 983,  label: "Louisiana",            appealDeadline: "August (15 days after notice)" },
  ME: { rate: 1.04, avgBill: 2756, label: "Maine",                appealDeadline: "180 days after tax bill" },
  MD: { rate: 1.04, avgBill: 3633, label: "Maryland",             appealDeadline: "January – February" },
  MA: { rate: 1.20, avgBill: 5646, label: "Massachusetts",        appealDeadline: "February 1" },
  MI: { rate: 1.38, avgBill: 2551, label: "Michigan",             appealDeadline: "July 31" },
  MN: { rate: 1.02, avgBill: 2767, label: "Minnesota",            appealDeadline: "April 30" },
  MS: { rate: 0.73, avgBill: 861,  label: "Mississippi",          appealDeadline: "60 days after notice" },
  MO: { rate: 0.96, avgBill: 1706, label: "Missouri",             appealDeadline: "July 10" },
  MT: { rate: 0.74, avgBill: 1706, label: "Montana",              appealDeadline: "June 1" },
  NE: { rate: 1.73, avgBill: 3390, label: "Nebraska",             appealDeadline: "June 30" },
  NV: { rate: 0.55, avgBill: 1729, label: "Nevada",               appealDeadline: "January 15" },
  NH: { rate: 2.09, avgBill: 6478, label: "New Hampshire",        appealDeadline: "September – March" },
  NJ: { rate: 2.49, avgBill: 8797, label: "New Jersey",           appealDeadline: "April 1" },
  NM: { rate: 0.55, avgBill: 1252, label: "New Mexico",           appealDeadline: "30 days after assessment" },
  NY: { rate: 1.69, avgBill: 6673, label: "New York",             appealDeadline: "March 1 (varies by county)" },
  NC: { rate: 0.78, avgBill: 1603, label: "North Carolina",       appealDeadline: "30 days after notice" },
  ND: { rate: 0.98, avgBill: 2165, label: "North Dakota",         appealDeadline: "November 1" },
  OH: { rate: 1.59, avgBill: 2682, label: "Ohio",                 appealDeadline: "March 31" },
  OK: { rate: 0.87, avgBill: 1264, label: "Oklahoma",             appealDeadline: "10 days after assessment" },
  OR: { rate: 0.90, avgBill: 3041, label: "Oregon",               appealDeadline: "December 31" },
  PA: { rate: 1.43, avgBill: 2994, label: "Pennsylvania",         appealDeadline: "August 1" },
  RI: { rate: 1.53, avgBill: 4560, label: "Rhode Island",         appealDeadline: "December 31" },
  SC: { rate: 0.55, avgBill: 1322, label: "South Carolina",       appealDeadline: "90 days after notice" },
  SD: { rate: 1.17, avgBill: 2493, label: "South Dakota",         appealDeadline: "November 10" },
  TN: { rate: 0.63, avgBill: 1255, label: "Tennessee",            appealDeadline: "September – November" },
  TX: { rate: 1.60, avgBill: 3797, label: "Texas",                appealDeadline: "May 15 (or 30 days after notice)" },
  UT: { rate: 0.52, avgBill: 1837, label: "Utah",                 appealDeadline: "September 16" },
  VT: { rate: 1.83, avgBill: 4680, label: "Vermont",              appealDeadline: "April 1 – July 31" },
  VA: { rate: 0.82, avgBill: 2952, label: "Virginia",             appealDeadline: "June 1 – October 31" },
  WA: { rate: 1.02, avgBill: 4432, label: "Washington",           appealDeadline: "July 1" },
  WV: { rate: 0.53, avgBill: 698,  label: "West Virginia",        appealDeadline: "October – January" },
  WI: { rate: 1.61, avgBill: 3472, label: "Wisconsin",            appealDeadline: "First Monday in May" },
  WY: { rate: 0.56, avgBill: 1439, label: "Wyoming",              appealDeadline: "30 days after assessment" },
  DC: { rate: 0.55, avgBill: 4129, label: "District of Columbia", appealDeadline: "April 1" },
};

const OverpaymentEstimatorUSA = () => {
  const [state, setState] = useState("");
  const [homeValue, setHomeValue] = useState("");
  const [currentBill, setCurrentBill] = useState("");
  const [result, setResult] = useState<{
    effectiveRate: number; stateRate: number; diff: number;
    overAmt: number; isOver: boolean; stateData: typeof STATE_RATES[string];
  } | null>(null);

  const calculate = () => {
    const val = parseFloat(homeValue.replace(/[$,]/g, ""));
    const bill = parseFloat(currentBill.replace(/[$,]/g, ""));
    if (!val || !bill || !state) return;
    const stateData = STATE_RATES[state];
    const effectiveRate = (bill / val) * 100;
    const stateRate = stateData.rate;
    const diff = effectiveRate - stateRate;
    const expectedBill = (val * stateRate) / 100;
    const overAmt = Math.round(bill - expectedBill);
    setResult({ effectiveRate, stateRate, diff, overAmt, isOver: overAmt > 50, stateData });
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  const isValid = state && homeValue.trim() && currentBill.trim();

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-foreground mb-1">Property Tax Overpayment Estimator</h3>
        <p className="text-sm text-muted-foreground">
          Compare your effective tax rate to your state average. If you're paying more, you may be over-assessed.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger className="h-12 text-base font-semibold border-2 border-[#1f2937] bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-md hover:shadow-lg hover:border-[#374151] hover:from-[#e5e7eb] hover:to-[#d1d5db] transition-all">
              <SelectValue placeholder="Select state…" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {Object.entries(STATE_RATES).map(([code, s]) => (
                <SelectItem key={code} value={code}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Estimated home value ($)</Label>
          <Input
            value={homeValue}
            onChange={(e) => setHomeValue(e.target.value)}
            placeholder="e.g. 350,000"
            className="font-mono"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Current annual tax bill ($)</Label>
          <Input
            value={currentBill}
            onChange={(e) => setCurrentBill(e.target.value)}
            placeholder="e.g. 5,200"
            className="font-mono"
          />
        </div>
      </div>

      <Button
        onClick={calculate}
        disabled={!isValid}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
      >
        Estimate Overpayment
      </Button>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in pt-2 border-t border-border">
          {/* Rate comparison cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-secondary border border-border rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Your rate</p>
              <p className={`text-2xl font-display font-black ${result.isOver ? "text-destructive" : "text-saving"}`}>
                {result.effectiveRate.toFixed(2)}%
              </p>
            </div>
            <div className="bg-secondary border border-border rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">State avg</p>
              <p className="text-2xl font-display font-black text-foreground">{result.stateRate.toFixed(2)}%</p>
              <p className="text-[10px] text-muted-foreground">{result.stateData.label}</p>
            </div>
            {result.isOver ? (
              <div className="bg-saving rounded-xl p-4 text-center">
                <p className="text-xs text-saving-foreground/70 uppercase tracking-wide mb-1">Est. overpayment</p>
                <p className="text-2xl font-display font-black text-saving-foreground">{fmt(result.overAmt)}</p>
                <p className="text-[10px] text-saving-foreground/70">per year</p>
              </div>
            ) : (
              <div className="bg-saving-light border border-saving/20 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">State avg bill</p>
                <p className="text-2xl font-display font-black text-saving">{fmt(result.stateData.avgBill)}</p>
                <p className="text-[10px] text-muted-foreground">{result.stateData.label}</p>
              </div>
            )}
          </div>

          {/* Verdict */}
          <div className={`rounded-xl border p-4 flex items-start gap-3 ${result.isOver ? "bg-saving-light border-saving/30" : "bg-secondary border-border"}`}>
            {result.isOver
              ? <AlertTriangle className="h-4 w-4 text-saving flex-shrink-0 mt-0.5" />
              : <CheckCircle className="h-4 w-4 text-saving flex-shrink-0 mt-0.5" />}
            <div>
              <p className="font-semibold text-sm text-foreground mb-0.5">
                {result.isOver ? "⚠️ You may be over-assessed" : "✅ Your rate looks reasonable"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {result.isOver
                  ? `Your effective rate (${result.effectiveRate.toFixed(2)}%) is higher than the ${result.stateData.label} average (${result.stateRate.toFixed(2)}%). Consider filing an appeal.`
                  : `Your effective rate is close to the ${result.stateData.label} state average. You may still benefit from a review if comparable homes are lower-assessed.`}
              </p>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-start gap-3 bg-secondary border border-border rounded-xl p-4">
            <div className="text-lg flex-shrink-0">🗓️</div>
            <div>
              <p className="font-semibold text-sm text-foreground">{result.stateData.label} Appeal Deadline</p>
              <p className="text-xs text-muted-foreground mt-0.5">{result.stateData.appealDeadline}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Deadlines vary by county — confirm with your county assessor's office.</p>
            </div>
          </div>

          {/* Next steps */}
          {result.isOver && (
            <div className="bg-primary-subtle border border-primary/15 rounded-xl p-4">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">Your Next Steps</p>
              <ol className="space-y-2">
                {[
                  "Request your property record card — check square footage, bedroom count, and condition",
                  "Find 3+ comparable homes (comps) sold recently in your area via Zillow or Redfin",
                  "File a formal appeal before the deadline — use the Appeal Letter tab",
                  "Attend the hearing with your comparables — success rates are 40–60% with evidence",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground">
                    <ArrowRight className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Note */}
          <div className="flex items-start gap-2.5 p-3 bg-secondary rounded-lg border border-border text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-primary" />
            <span>
              State averages are from 2023 data. Actual rates vary by county and municipality. This tool provides an estimate only — consult your county assessor for exact figures.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export { STATE_RATES };
export default OverpaymentEstimatorUSA;
