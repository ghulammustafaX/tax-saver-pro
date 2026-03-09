import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

// Average effective property tax rates by state (2023 data, %)
const STATE_RATES: Record<string, { rate: number; avgBill: number; label: string; appealDeadline: string }> = {
  AL: { rate: 0.41, avgBill: 646, label: "Alabama", appealDeadline: "30 days after assessment notice" },
  AK: { rate: 1.04, avgBill: 3564, label: "Alaska", appealDeadline: "30 days after assessment" },
  AZ: { rate: 0.60, avgBill: 1648, label: "Arizona", appealDeadline: "60 days after assessment" },
  AR: { rate: 0.64, avgBill: 812, label: "Arkansas", appealDeadline: "30 days after assessment" },
  CA: { rate: 0.73, avgBill: 4279, label: "California", appealDeadline: "Sep 15 – Nov 30 (varies by county)" },
  CO: { rate: 0.49, avgBill: 1868, label: "Colorado", appealDeadline: "June 1 (odd years)" },
  CT: { rate: 2.14, avgBill: 5746, label: "Connecticut", appealDeadline: "February (varies by town)" },
  DE: { rate: 0.56, avgBill: 1570, label: "Delaware", appealDeadline: "April 1 most counties" },
  FL: { rate: 0.86, avgBill: 2143, label: "Florida", appealDeadline: "25 days after assessment notice (Sep)" },
  GA: { rate: 0.83, avgBill: 1920, label: "Georgia", appealDeadline: "45 days after assessment" },
  HI: { rate: 0.29, avgBill: 1971, label: "Hawaii", appealDeadline: "April 9 – April 9" },
  ID: { rate: 0.67, avgBill: 1492, label: "Idaho", appealDeadline: "June 15" },
  IL: { rate: 2.07, avgBill: 4942, label: "Illinois", appealDeadline: "30 days after publication" },
  IN: { rate: 0.83, avgBill: 1388, label: "Indiana", appealDeadline: "June 15" },
  IA: { rate: 1.53, avgBill: 2382, label: "Iowa", appealDeadline: "April 30" },
  KS: { rate: 1.29, avgBill: 2445, label: "Kansas", appealDeadline: "30 days after notice of value" },
  KY: { rate: 0.83, avgBill: 1382, label: "Kentucky", appealDeadline: "May 20" },
  LA: { rate: 0.55, avgBill: 983, label: "Louisiana", appealDeadline: "August (15 days after notice)" },
  ME: { rate: 1.04, avgBill: 2756, label: "Maine", appealDeadline: "180 days after tax bill" },
  MD: { rate: 1.04, avgBill: 3633, label: "Maryland", appealDeadline: "January – February" },
  MA: { rate: 1.20, avgBill: 5646, label: "Massachusetts", appealDeadline: "February 1" },
  MI: { rate: 1.38, avgBill: 2551, label: "Michigan", appealDeadline: "July 31" },
  MN: { rate: 1.02, avgBill: 2767, label: "Minnesota", appealDeadline: "April 30" },
  MS: { rate: 0.73, avgBill: 861, label: "Mississippi", appealDeadline: "60 days after notice" },
  MO: { rate: 0.96, avgBill: 1706, label: "Missouri", appealDeadline: "July 10" },
  MT: { rate: 0.74, avgBill: 1706, label: "Montana", appealDeadline: "June 1" },
  NE: { rate: 1.73, avgBill: 3390, label: "Nebraska", appealDeadline: "June 30" },
  NV: { rate: 0.55, avgBill: 1729, label: "Nevada", appealDeadline: "January 15" },
  NH: { rate: 2.09, avgBill: 6478, label: "New Hampshire", appealDeadline: "September – March" },
  NJ: { rate: 2.49, avgBill: 8797, label: "New Jersey", appealDeadline: "April 1" },
  NM: { rate: 0.55, avgBill: 1252, label: "New Mexico", appealDeadline: "30 days after assessment" },
  NY: { rate: 1.69, avgBill: 6673, label: "New York", appealDeadline: "March 1 (varies by county)" },
  NC: { rate: 0.78, avgBill: 1603, label: "North Carolina", appealDeadline: "30 days after notice" },
  ND: { rate: 0.98, avgBill: 2165, label: "North Dakota", appealDeadline: "November 1" },
  OH: { rate: 1.59, avgBill: 2682, label: "Ohio", appealDeadline: "March 31" },
  OK: { rate: 0.87, avgBill: 1264, label: "Oklahoma", appealDeadline: "10 days after assessment" },
  OR: { rate: 0.90, avgBill: 3041, label: "Oregon", appealDeadline: "December 31" },
  PA: { rate: 1.43, avgBill: 2994, label: "Pennsylvania", appealDeadline: "August 1" },
  RI: { rate: 1.53, avgBill: 4560, label: "Rhode Island", appealDeadline: "December 31" },
  SC: { rate: 0.55, avgBill: 1322, label: "South Carolina", appealDeadline: "90 days after notice" },
  SD: { rate: 1.17, avgBill: 2493, label: "South Dakota", appealDeadline: "November 10" },
  TN: { rate: 0.63, avgBill: 1255, label: "Tennessee", appealDeadline: "September – November" },
  TX: { rate: 1.60, avgBill: 3797, label: "Texas", appealDeadline: "May 15 (or 30 days after notice)" },
  UT: { rate: 0.52, avgBill: 1837, label: "Utah", appealDeadline: "September 16" },
  VT: { rate: 1.83, avgBill: 4680, label: "Vermont", appealDeadline: "April 1 – July 31" },
  VA: { rate: 0.82, avgBill: 2952, label: "Virginia", appealDeadline: "June 1 – October 31" },
  WA: { rate: 1.02, avgBill: 4432, label: "Washington", appealDeadline: "July 1" },
  WV: { rate: 0.53, avgBill: 698, label: "West Virginia", appealDeadline: "October – January" },
  WI: { rate: 1.61, avgBill: 3472, label: "Wisconsin", appealDeadline: "First Monday in May" },
  WY: { rate: 0.56, avgBill: 1439, label: "Wyoming", appealDeadline: "30 days after assessment" },
  DC: { rate: 0.55, avgBill: 4129, label: "District of Columbia", appealDeadline: "April 1" },
};

const OverpaymentEstimatorUSA = () => {
  const [state, setState] = useState("");
  const [homeValue, setHomeValue] = useState("");
  const [currentBill, setCurrentBill] = useState("");
  const [result, setResult] = useState<{
    effectiveRate: number;
    stateRate: number;
    diff: number;
    overAmt: number;
    isOver: boolean;
    stateData: typeof STATE_RATES[string];
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
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <div className="flex items-center gap-2 mb-1">
          <TrendingDown className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground">Property Tax Overpayment Estimator</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-5">
          Compare your effective tax rate to your state average. If you're paying more, you may be over-assessed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div>
            <Label className="font-medium mb-1 block">State</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger>
                <SelectValue placeholder="Select state..." />
              </SelectTrigger>
              <SelectContent className="max-h-64">
                {Object.entries(STATE_RATES).map(([code, s]) => (
                  <SelectItem key={code} value={code}>{s.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="homeValue" className="font-medium mb-1 block">Estimated Home Value ($)</Label>
            <Input
              id="homeValue"
              value={homeValue}
              onChange={(e) => setHomeValue(e.target.value)}
              placeholder="e.g. 350000"
              className="font-mono"
            />
          </div>
          <div>
            <Label htmlFor="currentBill" className="font-medium mb-1 block">Current Annual Tax Bill ($)</Label>
            <Input
              id="currentBill"
              value={currentBill}
              onChange={(e) => setCurrentBill(e.target.value)}
              placeholder="e.g. 5200"
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
      </div>

      {result && (
        <div className="animate-fade-up space-y-4">
          {/* Rate comparison */}
          <div className={`rounded-xl border-2 p-6 ${result.isOver ? "bg-saving-light border-saving shadow-saving" : "bg-secondary border-border"}`}>
            <div className="flex items-center gap-2 mb-4">
              {result.isOver ? (
                <AlertTriangle className="h-5 w-5 text-saving" />
              ) : (
                <CheckCircle className="h-5 w-5 text-saving" />
              )}
              <h4 className="font-display font-bold text-lg text-foreground">
                {result.isOver ? "⚠️ You May Be Over-Assessed" : "✅ Your Rate Looks Reasonable"}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Your Effective Rate</div>
                <div className={`text-3xl font-display font-black ${result.isOver ? "text-destructive" : "text-saving"}`}>
                  {result.effectiveRate.toFixed(2)}%
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">State Average Rate</div>
                <div className="text-3xl font-display font-black text-foreground">{result.stateRate.toFixed(2)}%</div>
                <div className="text-xs text-muted-foreground">{result.stateData.label}</div>
              </div>
              {result.isOver ? (
                <div className="bg-saving rounded-lg p-4 text-saving-foreground text-center">
                  <div className="text-xs opacity-80 uppercase tracking-wide mb-1">Est. Overpayment</div>
                  <div className="text-3xl font-display font-black">{fmt(result.overAmt)}</div>
                  <div className="text-xs opacity-80">per year</div>
                </div>
              ) : (
                <div className="bg-card rounded-lg p-4 border border-saving text-center">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">State Avg. Bill</div>
                  <div className="text-3xl font-display font-black text-saving">{fmt(result.stateData.avgBill)}</div>
                  <div className="text-xs text-muted-foreground">for {result.stateData.label}</div>
                </div>
              )}
            </div>
          </div>

          {/* Appeal deadline */}
          <div className="bg-accent-light border border-accent/30 rounded-xl p-5">
            <h4 className="font-bold text-foreground mb-2">🗓️ {result.stateData.label} Appeal Deadline</h4>
            <p className="text-sm text-muted-foreground mb-1">
              <strong>Typical deadline:</strong> {result.stateData.appealDeadline}
            </p>
            <p className="text-xs text-muted-foreground">
              Deadlines vary by county. Contact your county assessor's office to confirm the exact deadline for your property.
            </p>
          </div>

          {result.isOver && (
            <div className="bg-primary-subtle rounded-xl border border-primary/20 p-5 text-sm">
              <h4 className="font-bold text-primary mb-2">📋 Your Next Steps</h4>
              <ol className="space-y-2 text-foreground list-decimal list-inside">
                <li>Request your property record card from your county assessor — check for errors in square footage, bedroom count, condition</li>
                <li>Search recent sales of comparable homes (comps) in your neighbourhood on Zillow, Redfin, or your county's public records</li>
                <li>File a formal appeal before the deadline — use our free appeal letter generator below</li>
                <li>Attend the hearing with your comparables — success rates are 40–60% with evidence</li>
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { STATE_RATES };
export default OverpaymentEstimatorUSA;
