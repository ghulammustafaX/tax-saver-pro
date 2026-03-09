import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UK_BANDS, getBandFromValue } from "./CouncilTaxChecker";
import { Calculator, TrendingDown } from "lucide-react";

// Historical house price index multipliers to estimate 1991 value from current value
// Based on Land Registry HPI data — current value ÷ multiplier = approx 1991 value
const REGIONAL_MULTIPLIERS: Record<string, Record<string, number>> = {
  London: {
    terrace: 18.5,
    semi: 16.8,
    detached: 14.9,
    flat: 20.2,
  },
  "South East": {
    terrace: 14.2,
    semi: 13.1,
    detached: 12.0,
    flat: 15.8,
  },
  "South West": {
    terrace: 12.8,
    semi: 11.9,
    detached: 11.0,
    flat: 13.5,
  },
  Midlands: {
    terrace: 10.2,
    semi: 9.8,
    detached: 9.0,
    flat: 11.0,
  },
  "North West": {
    terrace: 9.0,
    semi: 8.6,
    detached: 8.0,
    flat: 9.5,
  },
  "North East": {
    terrace: 8.5,
    semi: 8.0,
    detached: 7.5,
    flat: 9.0,
  },
  Yorkshire: {
    terrace: 9.2,
    semi: 8.8,
    detached: 8.2,
    flat: 9.8,
  },
  Wales: {
    terrace: 9.8,
    semi: 9.2,
    detached: 8.5,
    flat: 10.5,
  },
  Scotland: {
    terrace: 9.5,
    semi: 9.0,
    detached: 8.3,
    flat: 10.2,
  },
  "East of England": {
    terrace: 13.0,
    semi: 12.2,
    detached: 11.5,
    flat: 14.0,
  },
};

const PROPERTY_TYPES = [
  { value: "terrace", label: "Terraced house" },
  { value: "semi", label: "Semi-detached house" },
  { value: "detached", label: "Detached house" },
  { value: "flat", label: "Flat / Apartment" },
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
      setError("Please select property type and region");
      return;
    }
    setError("");
    const multiplier = REGIONAL_MULTIPLIERS[region][propertyType];
    const value1991 = Math.round(val / multiplier);
    const band = getBandFromValue(value1991);
    setResult({ value1991, band });
  };

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);

  const bandInfo = result ? UK_BANDS.find((b) => b.band === result.band) : null;

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground">1991 Property Value Estimator</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-5">
          Council tax bands were set in 1991. Enter your property details to estimate what your home was worth back then — and whether you're in the right band.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <Label htmlFor="currentValue" className="font-medium mb-1 block">Current Property Value (£)</Label>
            <Input
              id="currentValue"
              placeholder="e.g. 350000"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="font-mono"
            />
          </div>

          <div>
            <Label className="font-medium mb-1 block">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label className="font-medium mb-1 block">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select region..." />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && <p className="text-destructive text-sm mb-4">{error}</p>}

        <Button onClick={calculate} className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold w-full md:w-auto px-8">
          Estimate 1991 Value
        </Button>
      </div>

      {result && bandInfo && (
        <div className="animate-fade-up space-y-4">
          <div className="bg-saving-light border-2 border-saving rounded-xl p-6 shadow-saving">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="h-5 w-5 text-saving" />
              <h4 className="font-display font-bold text-lg text-foreground">Your Estimated 1991 Value</h4>
            </div>
            <div className="text-4xl font-display font-black text-saving mb-1">
              {formatCurrency(result.value1991)}
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Estimated 1991 value for your {propertyType} in {region}
            </p>
            <div className="bg-card rounded-lg border border-border p-4">
              <p className="text-sm font-medium text-foreground mb-1">This places your property in:</p>
              <div className="flex items-center gap-3">
                <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-display font-bold text-2xl">
                  Band {result.band}
                </div>
                <div className="text-sm text-muted-foreground">{bandInfo.label} (1991 values)</div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-card p-5">
            <h4 className="font-semibold text-foreground mb-3">All Council Tax Bands</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {UK_BANDS.map((b) => (
                <div
                  key={b.band}
                  className={`rounded-lg px-3 py-2 text-center border transition-all ${
                    b.band === result.band
                      ? "bg-primary text-primary-foreground border-primary font-bold ring-2 ring-primary ring-offset-2"
                      : "bg-secondary text-secondary-foreground border-border"
                  }`}
                >
                  <div className="font-bold text-sm">Band {b.band}</div>
                  <div className="text-xs opacity-80">{b.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-accent-light border border-accent/30 rounded-lg p-4 text-sm text-foreground">
            <strong>⚠️ Important note:</strong> This is an estimate based on regional house price index data and should be used as a guide only. For an accurate 1991 valuation, you may wish to consult a local estate agent or RICS surveyor. Use this as supporting evidence — not definitive proof.
          </div>
        </div>
      )}
    </div>
  );
};

export default ValueEstimator1991;
