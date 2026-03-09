import { ExternalLink, FileSearch, Calendar, Users, Home, CheckCircle } from "lucide-react";
import { STATE_RATES } from "./OverpaymentEstimatorUSA";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const TOP_STATES_GUIDE = Object.entries(STATE_RATES)
  .filter(([code]) => code !== "DC")
  .map(([code, s]) => ({ code, ...s }))
  .sort((a, b) => a.label.localeCompare(b.label));

const PropertyTaxGuideUSA = () => {
  const [selectedState, setSelectedState] = useState("TX");
  const stateData = STATE_RATES[selectedState];

  const steps = [
    {
      icon: <FileSearch className="h-5 w-5" />,
      title: "Step 1: Get Your Property Record",
      description: "Request your property record card (also called a 'property data card') from your county assessor's office. This shows the data used to calculate your assessment — check for errors like wrong square footage, number of bedrooms/bathrooms, or incorrect lot size.",
      tip: "Even a 100 sq ft error can cause a $500+ over-assessment.",
    },
    {
      icon: <Home className="h-5 w-5" />,
      title: "Step 2: Find Comparable Properties",
      description: "Search for recent sales of similar homes in your area (within the last 12 months, same neighbourhood, similar size and age). Use Zillow, Redfin, or your county's public records website. If comparable homes sold for less than your assessed value — you have grounds to appeal.",
      tip: "You need at least 3 strong comparables for a persuasive case.",
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      title: "Step 3: File Before the Deadline",
      description: `In ${stateData?.label || "your state"}, the typical appeal deadline is: ${stateData?.appealDeadline || "check your county assessor"}. Missing this window means waiting until next year. Most counties accept online filing.`,
      tip: "Set a calendar reminder as soon as you receive your assessment notice.",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Step 4: Attend the Hearing",
      description: "Most initial appeals are informal conferences with an assessor — no lawyers needed. Bring printed comparables, your property record with any errors marked, photos of any issues reducing value, and a calm, prepared argument.",
      tip: "Appeal success rates average 40–60% when evidence is presented.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* State selector */}
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-3">Select Your State</h3>
        <div className="flex items-end gap-4">
          <div className="flex-1 max-w-xs">
            <Label className="font-medium mb-1 block">State</Label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
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
            <div className="flex gap-3 flex-wrap">
              <div className="bg-primary-subtle rounded-lg px-3 py-2 text-sm border border-primary/20">
                <span className="text-muted-foreground">Avg rate: </span>
                <span className="font-bold text-primary">{stateData.rate.toFixed(2)}%</span>
              </div>
              <div className="bg-primary-subtle rounded-lg px-3 py-2 text-sm border border-primary/20">
                <span className="text-muted-foreground">Avg bill: </span>
                <span className="font-bold text-primary">${stateData.avgBill.toLocaleString()}</span>
              </div>
              <div className="bg-accent-light rounded-lg px-3 py-2 text-sm border border-accent/30">
                <span className="text-muted-foreground">Deadline: </span>
                <span className="font-bold text-accent">{stateData.appealDeadline}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-saving-light border border-saving rounded-xl p-5 text-center shadow-saving">
          <div className="text-3xl font-display font-black text-saving mb-1">30–60%</div>
          <div className="text-sm text-muted-foreground">of US properties are over-assessed</div>
        </div>
        <div className="bg-saving-light border border-saving rounded-xl p-5 text-center shadow-saving">
          <div className="text-3xl font-display font-black text-saving mb-1">$1,500</div>
          <div className="text-sm text-muted-foreground">average annual saving from a successful appeal</div>
        </div>
        <div className="bg-saving-light border border-saving rounded-xl p-5 text-center shadow-saving">
          <div className="text-3xl font-display font-black text-saving mb-1">40–60%</div>
          <div className="text-sm text-muted-foreground">appeal success rate with comparable evidence</div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="bg-card rounded-xl border border-border shadow-card p-5">
            <div className="flex items-start gap-4">
              <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-foreground mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                <div className="flex items-start gap-2 bg-accent-light rounded-lg p-3 text-sm border border-accent/20">
                  <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Pro tip:</strong> {step.tip}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Evidence checklist */}
      <div className="bg-primary-subtle rounded-xl border border-primary/20 p-6">
        <h4 className="font-display font-bold text-foreground mb-4">📋 Evidence Checklist for Your Hearing</h4>
        <ul className="space-y-2">
          {[
            "Property record card (from county assessor) — check every data point",
            "3–5 comparable sales (comps) from the past 12 months, printed with addresses and sale prices",
            "Current photos of your property, especially any damage, deferred maintenance, or issues",
            "Any professional appraisal you've had done recently",
            "A simple spreadsheet comparing your assessed value to comps",
            "Your property tax bill showing current assessed value and tax owed",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* External resources */}
      <div className="bg-card rounded-xl border border-border shadow-card p-5">
        <h4 className="font-bold text-foreground mb-3">🔗 Official Resources</h4>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "IRS Property Tax Info", url: "https://www.irs.gov/businesses/small-businesses-self-employed/real-estate-tax" },
            { label: "Find Your County Assessor", url: "https://www.naco.org/counties/find-your-county" },
            { label: "Zillow (Find Comps)", url: "https://www.zillow.com" },
            { label: "Redfin (Find Comps)", url: "https://www.redfin.com" },
          ].map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary font-medium border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary-subtle transition-colors"
            >
              {r.label} <ExternalLink className="h-3 w-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyTaxGuideUSA;
