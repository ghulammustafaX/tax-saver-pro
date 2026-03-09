import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UK_BANDS } from "./CouncilTaxChecker";
import { PoundSterling, TrendingDown } from "lucide-react";

// Approximate council tax rates for Band D (2023/24) by council type in England/Wales
// Band multipliers relative to Band D: A=6/9, B=7/9, C=8/9, D=1, E=11/9, F=13/9, G=15/9, H=18/9
const BAND_MULTIPLIERS: Record<string, number> = {
  A: 6 / 9,
  B: 7 / 9,
  C: 8 / 9,
  D: 1,
  E: 11 / 9,
  F: 13 / 9,
  G: 15 / 9,
  H: 18 / 9,
};

// Approximate 2023/24 Band D council tax by council area (England & Wales)
// Source: GOV.UK council tax data
const COUNCIL_RATES: Record<string, { bandD: number; label: string }> = {
  london_average: { bandD: 1832, label: "London (average)" },
  birmingham: { bandD: 2140, label: "Birmingham" },
  manchester: { bandD: 1876, label: "Manchester" },
  leeds: { bandD: 1873, label: "Leeds" },
  sheffield: { bandD: 1847, label: "Sheffield" },
  bristol: { bandD: 2007, label: "Bristol" },
  nottingham: { bandD: 2318, label: "Nottingham" },
  liverpool: { bandD: 2056, label: "Liverpool" },
  coventry: { bandD: 1894, label: "Coventry" },
  leicester: { bandD: 2107, label: "Leicester" },
  edinburgh: { bandD: 1528, label: "Edinburgh" },
  glasgow: { bandD: 1436, label: "Glasgow" },
  cardiff: { bandD: 1805, label: "Cardiff" },
  swansea: { bandD: 1768, label: "Swansea" },
  newcastle: { bandD: 2100, label: "Newcastle" },
  oxford: { bandD: 2180, label: "Oxford" },
  cambridge: { bandD: 1985, label: "Cambridge" },
  bath: { bandD: 2250, label: "Bath & NE Somerset" },
  brighton: { bandD: 2003, label: "Brighton & Hove" },
  reading: { bandD: 1978, label: "Reading" },
  england_average: { bandD: 2065, label: "England (average)" },
  wales_average: { bandD: 1830, label: "Wales (average)" },
  scotland_average: { bandD: 1450, label: "Scotland (average)" },
};

const PREVIOUS_BAND: Record<string, string | null> = {
  A: null,
  B: "A",
  C: "B",
  D: "C",
  E: "D",
  F: "E",
  G: "F",
  H: "G",
};

const SavingsCalculatorUK = () => {
  const [currentBand, setCurrentBand] = useState("");
  const [councilArea, setCouncilArea] = useState("");
  const [result, setResult] = useState<{
    current: number;
    lower: number;
    annual: number;
    backdated: number;
    lowerBand: string;
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
    const lowerMulti = BAND_MULTIPLIERS[lowerBand];
    const lower = Math.round(council.bandD * lowerMulti);
    const annual = current - lower;
    // Backdated from 1993 to now ≈ 31 years
    const backdated = annual * 31;
    setResult({ current, lower, annual, backdated, lowerBand });
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <div className="flex items-center gap-2 mb-1">
          <PoundSterling className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground">Council Tax Savings Calculator</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-5">
          See exactly how much you could save — both annually and with a backdated refund going back to 1993.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <Label className="font-medium mb-1 block">Your Current Band</Label>
            <Select value={currentBand} onValueChange={setCurrentBand}>
              <SelectTrigger>
                <SelectValue placeholder="Select your band..." />
              </SelectTrigger>
              <SelectContent>
                {UK_BANDS.map((b) => (
                  <SelectItem key={b.band} value={b.band}>Band {b.band} — {b.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="font-medium mb-1 block">Council Area</Label>
            <Select value={councilArea} onValueChange={setCouncilArea}>
              <SelectTrigger>
                <SelectValue placeholder="Select council area..." />
              </SelectTrigger>
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
      </div>

      {result && (
        <div className="animate-fade-up space-y-4">
          {result.annual === 0 ? (
            <div className="bg-secondary rounded-xl border border-border p-5 text-center text-muted-foreground">
              Band A is the lowest band — there's no lower band to appeal to.
            </div>
          ) : (
            <>
              {/* Big savings callout */}
              <div className="bg-saving-light border-2 border-saving rounded-xl p-6 shadow-saving">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="h-5 w-5 text-saving" />
                  <h4 className="font-display font-bold text-lg text-foreground">Your Potential Savings</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-card rounded-lg p-4 border border-border text-center">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Currently paying</div>
                    <div className="text-2xl font-display font-black text-foreground">{fmt(result.current)}</div>
                    <div className="text-xs text-muted-foreground">per year (Band {currentBand})</div>
                  </div>
                  <div className="bg-card rounded-lg p-4 border border-saving text-center">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">You'd pay in Band {result.lowerBand}</div>
                    <div className="text-2xl font-display font-black text-saving">{fmt(result.lower)}</div>
                    <div className="text-xs text-muted-foreground">per year</div>
                  </div>
                  <div className="bg-saving rounded-lg p-4 text-saving-foreground text-center">
                    <div className="text-xs opacity-80 uppercase tracking-wide mb-1">Annual saving</div>
                    <div className="text-3xl font-display font-black">{fmt(result.annual)}</div>
                    <div className="text-xs opacity-80">every year</div>
                  </div>
                </div>
              </div>

              {/* Backdated refund */}
              <div className="bg-accent-light border border-accent/30 rounded-xl p-5">
                <h4 className="font-bold text-foreground mb-1">💰 Backdated Refund Estimate</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  If you've been in the wrong band since 1993 (council tax started), you could receive a lump-sum backdated refund:
                </p>
                <div className="text-4xl font-display font-black text-accent mb-1">{fmt(result.backdated)}</div>
                <div className="text-sm text-muted-foreground">
                  Based on {fmt(result.annual)}/year × 31 years (1993–2025). Actual amount depends on your specific move-in date and local council.
                </div>
              </div>

              <div className="bg-primary-subtle rounded-lg p-4 text-sm text-foreground border border-primary/20">
                <strong>⚠️ Note:</strong> These figures are estimates using 2023/24 Band D rates. Actual council tax varies by council and year. The backdated refund is the maximum possible — it applies if your property has always been incorrectly banded. Even if you've lived there for 5 years, a refund for that period is still very worthwhile.
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SavingsCalculatorUK;
