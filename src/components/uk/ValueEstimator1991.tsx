import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UK_BANDS, getBandFromValue } from "./CouncilTaxChecker";
import { Info } from "lucide-react";

const REGIONAL_MULTIPLIERS: Record<string, Record<string, number>> = {
  London:           { terrace: 18.5, semi: 16.8, detached: 14.9, flat: 20.2 },
  "South East":     { terrace: 14.2, semi: 13.1, detached: 12.0, flat: 15.8 },
  "South West":     { terrace: 12.8, semi: 11.9, detached: 11.0, flat: 13.5 },
  Midlands:         { terrace: 10.2, semi:  9.8, detached:  9.0, flat: 11.0 },
  "North West":     { terrace:  9.0, semi:  8.6, detached:  8.0, flat:  9.5 },
  "North East":     { terrace:  8.5, semi:  8.0, detached:  7.5, flat:  9.0 },
  Yorkshire:        { terrace:  9.2, semi:  8.8, detached:  8.2, flat:  9.8 },
  Wales:            { terrace:  9.8, semi:  9.2, detached:  8.5, flat: 10.5 },
  Scotland:         { terrace:  9.5, semi:  9.0, detached:  8.3, flat: 10.2 },
  "East of England":{ terrace: 13.0, semi: 12.2, detached: 11.5, flat: 14.0 },
};

const PROPERTY_TYPES = [
  { value: "terrace",  label: "Terraced house" },
  { value: "semi",     label: "Semi-detached house" },
  { value: "detached", label: "Detached house" },
  { value: "flat",     label: "Flat / Apartment" },
];

const REGIONS = Object.keys(REGIONAL_MULTIPLIERS);

const ValueEstimator1991 = () => {
  const [currentValue, setCurrentValue] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [region, setRegion] = useState("");
  const [result, setResult] = useState<{ value1991: number; band: string } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const val = parseFloat(currentValue.replace(/[£,]/g, ""));
    if (!val || val < 10000 || val > 50000000) {
      setError("Please enter a valid current property value");
      return;
    }
    if (!propertyType || !region) {
      setError("Please select both property type and region");
      return;
    }
    setError("");
    const multiplier = REGIONAL_MULTIPLIERS[region][propertyType];
    const value1991 = Math.round(val / multiplier);
    const band = getBandFromValue(value1991);
    setResult({ value1991, band });
  };

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

  const bandInfo = result ? UK_BANDS.find((b) => b.band === result.band) : null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-foreground mb-1">1991 Property Value Estimator</h3>
        <p className="text-sm text-muted-foreground">
          Council tax bands were fixed in 1991. Enter your property details to estimate your 1991 value and check if you're in the correct band.
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Current property value (£)</Label>
          <Input
            placeholder="e.g. 350,000"
            value={currentValue}
            className="h-12 text-base font-semibold border-2 border-[#192c58] bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-md hover:shadow-lg hover:border-[#1E3A8A] focus:border-[#1E3A8A] hover:from-[#e5e7eb] hover:to-[#d1d5db] transition-all"
            onChange={(e) => setCurrentValue(e.target.value)}
            className="font-mono"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Property type</Label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-12 text-base font-semibold border-2 border-[#192c58] bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-md hover:shadow-lg hover:border-[#1E3A8A] hover:from-[#e5e7eb] hover:to-[#d1d5db] transition-all">
              <SelectValue placeholder="Select type…" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label className="text-sm font-medium">Region</Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="h-12 text-base font-semibold border-2 border-[#192c58] bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-md hover:shadow-lg hover:border-[#1E3A8A] hover:from-[#e5e7eb] hover:to-[#d1d5db] transition-all">
              <SelectValue placeholder="Select region…" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {error && (
        <p className="text-destructive text-xs flex items-center gap-1.5">
          <span>⚠</span> {error}
        </p>
      )}

      <Button
        onClick={calculate}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
      >
        Estimate 1991 Value
      </Button>

      {/* Result */}
      {result && bandInfo && (
        <div className="space-y-4 animate-fade-in pt-2 border-t border-border">
          {/* Estimated value */}
          <div className="bg-saving-light border border-saving/30 rounded-xl p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-saving mb-1">Estimated 1991 Value</p>
            <div className="text-4xl font-display font-black text-saving mb-1">{fmt(result.value1991)}</div>
            <p className="text-xs text-muted-foreground">
              Based on a {propertyType.replace("terrace", "terraced house").replace("semi", "semi-detached").replace("detached", "detached house").replace("flat", "flat")} in {region}
            </p>
          </div>

          {/* Band result */}
          <div className="flex items-center gap-4 bg-background border border-border rounded-xl p-5">
            <div className="bg-primary text-primary-foreground rounded-xl w-16 h-16 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium opacity-80">Band</span>
              <span className="text-3xl font-display font-black leading-none">{result.band}</span>
            </div>
            <div>
              <p className="font-semibold text-foreground">Suggested band: <span className="text-primary">Band {result.band}</span></p>
              <p className="text-xs text-muted-foreground mt-0.5">{bandInfo.label} (1991 values)</p>
              <p className="text-xs text-muted-foreground mt-1">If your current band is higher, you may have grounds to appeal.</p>
            </div>
          </div>

          {/* All bands grid */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">All Council Tax Bands</p>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5">
              {UK_BANDS.map((b) => (
                <div
                  key={b.band}
                  className={`rounded-lg px-2 py-2.5 text-center border transition-all ${
                    b.band === result.band
                      ? "bg-primary text-primary-foreground border-primary ring-2 ring-primary ring-offset-1"
                      : "bg-secondary text-secondary-foreground border-border"
                  }`}
                >
                  <div className="font-bold text-xs">Band {b.band}</div>
                  <div className="text-[9px] opacity-70 mt-0.5 leading-tight">{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2.5 p-3 bg-secondary rounded-lg border border-border text-xs text-muted-foreground">
            <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-primary" />
            <span>
              This is an estimate using regional HPI data — use it as supporting evidence, not definitive proof. For a precise 1991 valuation, consult a RICS surveyor or local estate agent.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValueEstimator1991;
