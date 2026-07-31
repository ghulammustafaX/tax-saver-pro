import { useState } from "react";
import { ExternalLink, FileSearch, Calendar, Users, Home, CheckCircle } from "lucide-react";
import { STATE_RATES } from "./OverpaymentEstimatorUSA";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const TOP_STATES_GUIDE = Object.entries(STATE_RATES)
  .filter(([code]) => code !== "DC")
  .map(([code, s]) => ({ code, ...s }))
  .sort((a, b) => a.label.localeCompare(b.label));

const STEPS = (stateData: typeof STATE_RATES[string] | undefined) => [
  {
    icon: FileSearch,
    title: "Get Your Property Record",
    description: "Request your property record card from your county assessor's office. This shows the data used to calculate your assessment — check for errors like wrong square footage, bedroom count, or lot size.",
    tip: "Even a 100 sq ft error can cause a $500+ over-assessment.",
  },
  {
    icon: Home,
    title: "Find Comparable Properties",
    description: "Search for recent sales of similar homes in your area (last 12 months, same neighbourhood, similar size and age) on Zillow, Redfin, or your county's public records. If comps sold for less than your assessed value — you have grounds to appeal.",
    tip: "You need at least 3 strong comparables for a persuasive case.",
  },
  {
    icon: Calendar,
    title: "File Before the Deadline",
    description: `In ${stateData?.label || "your state"}, the typical appeal deadline is: ${stateData?.appealDeadline || "check your county assessor"}. Missing this window means waiting until next year. Most counties accept online filing.`,
    tip: "Set a calendar reminder as soon as you receive your assessment notice.",
  },
  {
    icon: Users,
    title: "Attend the Hearing",
    description: "Most initial appeals are informal conferences with an assessor — no lawyers needed. Bring printed comparables, your property record with errors marked, photos of any issues reducing value, and a calm, prepared argument.",
    tip: "Appeal success rates average 40–60% when evidence is presented.",
  },
];

const PropertyTaxGuideUSA = () => {
  const [selectedState, setSelectedState] = useState("TX");
  const stateData = STATE_RATES[selectedState];
  const steps = STEPS(stateData);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-foreground mb-1">State-by-State Appeal Guide</h3>
        <p className="text-sm text-muted-foreground">
          Select your state for a tailored step-by-step guide with local deadlines and tips.
        </p>
      </div>

      {/* State selector + stats */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4">
        <div className="space-y-2 w-full max-w-xs">
          <Label className="text-sm font-semibold text-foreground">Your state</Label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="h-12 text-base font-semibold border-2 border-[#1f2937] bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] shadow-md hover:shadow-lg hover:border-[#374151] hover:from-[#e5e7eb] hover:to-[#d1d5db] transition-all">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {TOP_STATES_GUIDE.map((s) => (
                <SelectItem key={s.code} value={s.code}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {stateData && (
          <div className="flex flex-wrap gap-2">
            <div className="bg-primary-subtle border border-primary/15 rounded-lg px-3 py-2 text-xs">
              <span className="text-muted-foreground">Avg rate: </span>
              <span className="font-bold text-primary">{stateData.rate.toFixed(2)}%</span>
            </div>
            <div className="bg-primary-subtle border border-primary/15 rounded-lg px-3 py-2 text-xs">
              <span className="text-muted-foreground">Avg bill: </span>
              <span className="font-bold text-primary">${stateData.avgBill.toLocaleString()}</span>
            </div>
            <div className="bg-saving-light border border-saving/20 rounded-lg px-3 py-2 text-xs">
              <span className="text-muted-foreground">Deadline: </span>
              <span className="font-bold text-saving">{stateData.appealDeadline}</span>
            </div>
          </div>
        )}
      </div>

      {/* Key stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { value: "30–60%", label: "US properties over-assessed" },
          { value: "$1,500", label: "Average annual saving" },
          { value: "40–60%", label: "Success rate with evidence" },
        ].map(({ value, label }) => (
          <div key={label} className="bg-saving-light border border-saving/20 rounded-xl p-3 text-center">
            <div className="text-xl font-display font-black text-saving">{value}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{label}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-border" />

      {/* Steps */}
      <div className="space-y-3">
        {steps.map(({ icon: Icon, title, description, tip }, i) => (
          <div key={i} className="flex items-start gap-4 rounded-xl border border-border p-4">
            <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Step {i + 1}</span>
              </div>
              <p className="font-semibold text-sm text-foreground mb-1">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{description}</p>
              <div className="flex items-start gap-2 bg-secondary rounded-lg px-3 py-2">
                <CheckCircle className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-foreground"><strong>Pro tip:</strong> {tip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Evidence checklist */}
      <div className="bg-primary-subtle border border-primary/15 rounded-xl p-4">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">Evidence Checklist for Your Hearing</p>
        <ul className="space-y-2">
          {[
            "Property record card — check every data point for errors",
            "3–5 comparable sales (comps) from the past 12 months, printed with addresses and prices",
            "Photos of your property, especially damage, maintenance issues, or condition problems",
            "Any professional appraisal done recently",
            "A simple spreadsheet comparing your assessed value to comps",
            "Your property tax bill showing current assessed value and tax owed",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-foreground">
              <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* External links */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Official Resources</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Find Your County Assessor", url: "https://www.naco.org/counties/find-your-county" },
            { label: "Zillow — Find Comps",        url: "https://www.zillow.com" },
            { label: "Redfin — Find Comps",        url: "https://www.redfin.com" },
            { label: "IRS Property Tax Info",      url: "https://www.irs.gov/businesses/small-businesses-self-employed/real-estate-tax" },
          ].map((r) => (
            <a
              key={r.label}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary font-medium border border-primary/20 rounded-lg px-3 py-1.5 hover:bg-primary-subtle transition-colors"
            >
              {r.label} <ExternalLink className="h-2.5 w-2.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyTaxGuideUSA;
