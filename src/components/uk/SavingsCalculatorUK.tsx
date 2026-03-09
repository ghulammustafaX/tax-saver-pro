import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UK_BANDS } from "./CouncilTaxChecker";
import { Info } from "lucide-react";

const BAND_MULTIPLIERS: Record<string, number> = {
  A: 6/9, B: 7/9, C: 8/9, D: 1,
  E: 11/9, F: 13/9, G: 15/9, H: 18/9,
};

const COUNCIL_RATES: Record<string, { bandD: number; label: string }> = {
  london_average:   { bandD: 1832, label: "London (average)" },
  birmingham:       { bandD: 2140, label: "Birmingham" },
  manchester:       { bandD: 1876, label: "Manchester" },
  leeds:            { bandD: 1873, label: "Leeds" },
  sheffield:        { bandD: 1847, label: "Sheffield" },
  bristol:          { bandD: 2007, label: "Bristol" },
  nottingham:       { bandD: 2318, label: "Nottingham" },
  liverpool:        { bandD: 2056, label: "Liverpool" },
  coventry:         { bandD: 1894, label: "Coventry" },
  leicester:        { bandD: 2107, label: "Leicester" },
  edinburgh:        { bandD: 1528, label: "Edinburgh" },
  glasgow:          { bandD: 1436, label: "Glasgow" },
  cardiff:          { bandD: 1805, label: "Cardiff" },
  swansea:          { bandD: 1768, label: "Swansea" },
  newcastle:        { bandD: 2100, label: "Newcastle" },
  oxford:           { bandD: 2180, label: "Oxford" },
  cambridge:        { bandD: 1985, label: "Cambridge" },
  bath:             { bandD: 2250, label: "Bath & NE Somerset" },
  brighton:         { bandD: 2003, label: "Brighton & Hove" },
  reading:          { bandD: 1978, label: "Reading" },
  england_average:  { bandD: 2065, label: "England (average)" },
  wales_average:    { bandD: 1830, label: "Wales (average)" },
  scotland_average: { bandD: 1450, label: "Scotland (average)" },
};

const PREVIOUS_BAND: Record<string, string | null> = {
  A: null, B: "A", C: "B", D: "C", E: "D", F: "E", G: "F", H: "G",
};

const SavingsCalculatorUK = () => {
  const [currentBand, setCurrentBand] = useState("");
  const [councilArea, setCouncilArea] = useState("");
  const [result, setResult] = useState<{
    current: number; lower: number; annual: number; backdated: number; lowerBand: string;
  } | null>(null);

  const calculate = () => {
    if (!currentBand || !councilArea) return;
    const council = COUNCIL_RATES[councilArea];
    const multi = BAND_MULTIPLIERS[currentBand];
    const current = Math.round(council.bandD * multi);
    const lowerBand = PREVIOUS_BAND[currentBand];
    if (!lowerBand) {
      setResult({ current, lower: current, annual: 0, backdated: 0, lowerBand: "N/A" });
      return;
    }
    const lower = Math.round(council.bandD * BAND_MULTIPLIERS[lowerBand]);
    const annual = current - lower;
    setResult({ current, lower, annual, backdated: annual * 31, lowerBand });
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-foreground mb-1">Council Tax Savings Calculator</h3>
        <p className="text-sm text-muted-foreground">
          See exactly how much you could save — annually and as a backdated refund going back to 1993.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Your current band</Label>
          <Select value={currentBand} onValueChange={setCurrentBand}>
            <SelectTrigger><SelectValue placeholder="Select your band…" /></SelectTrigger>
            <SelectContent>
              {UK_BANDS.map((b) => (
                <SelectItem key={b.band} value={b.band}>Band {b.band} — {b.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Council area</Label>
          <Select value={councilArea} onValueChange={setCouncilArea}>
            <SelectTrigger><SelectValue placeholder="Select council area…" /></SelectTrigger>
            <SelectContent>
              {Object.entries(COUNCIL_RATES).map(([key, val]) => (
                <SelectItem key={key} value={key}>{val.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={calculate}
        disabled={!currentBand || !councilArea}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
      >
        Calculate Savings
      </Button>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in pt-2 border-t border-border">
          {result.annual === 0 ? (
            <div className="bg-secondary rounded-xl border border-border p-5 text-center">
              <p className="font-semibold text-foreground mb-1">Band A — Already the lowest</p>
              <p className="text-sm text-muted-foreground">There is no lower band to appeal to, but you may still qualify for a discount. Check the Discounts tab.</p>
            </div>
          ) : (
            <>
              {/* Three stat cards */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-secondary border border-border rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Currently paying</p>
                  <p className="text-xl font-display font-black text-foreground">{fmt(result.current)}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Band {currentBand} / yr</p>
                </div>
                <div className="bg-secondary border border-saving/30 rounded-xl p-4 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">In Band {result.lowerBand}</p>
                  <p className="text-xl font-display font-black text-saving">{fmt(result.lower)}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">per year</p>
                </div>
                <div className="bg-saving border-0 rounded-xl p-4 text-center">
                  <p className="text-xs text-saving-foreground/70 uppercase tracking-wide mb-1">Annual saving</p>
                  <p className="text-xl font-display font-black text-saving-foreground">{fmt(result.annual)}</p>
                  <p className="text-[10px] text-saving-foreground/70 mt-0.5">every year</p>
                </div>
              </div>

              {/* Backdated refund */}
              <div className="bg-saving-light border border-saving/30 rounded-xl p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-saving mb-1">Backdated Refund Estimate (since 1993)</p>
                <div className="text-4xl font-display font-black text-saving mb-1">{fmt(result.backdated)}</div>
                <p className="text-xs text-muted-foreground">
                  Based on {fmt(result.annual)}/year × 31 years (1993–2025). Actual amount depends on your move-in date.
                </p>
              </div>

              {/* Note */}
              <div className="flex items-start gap-2.5 p-3 bg-secondary rounded-lg border border-border text-xs text-muted-foreground">
                <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-primary" />
                <span>
                  Estimates use 2023/24 Band D rates. Actual council tax varies by year and council. The backdated refund is the maximum — it applies if your property has always been incorrectly banded.
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SavingsCalculatorUK;
