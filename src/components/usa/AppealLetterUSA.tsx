import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Printer, CheckCircle, ExternalLink } from "lucide-react";
import { STATE_RATES } from "./OverpaymentEstimatorUSA";

const STATE_LANGUAGE: Record<string, { body: string; sendTo: string }> = {
  CA: {
    body: `Under California Revenue and Taxation Code Section 1603, I hereby file this application for reduction of assessment with the Assessment Appeals Board. I respectfully request a reduction in the assessed value of the above-referenced property from the current assessed value to a value commensurate with its fair market value as supported by comparable sales evidence.`,
    sendTo: "Your County Assessment Appeals Board (find at www.boe.ca.gov)",
  },
  TX: {
    body: `Pursuant to Texas Tax Code Section 41.41, I hereby protest the appraised value of the above-referenced property. I believe the value is excessive and unequal compared to comparable properties. I am requesting an informal conference with the Appraisal District and, if necessary, a formal hearing before the Appraisal Review Board (ARB).`,
    sendTo: "Your County Appraisal District (find at www.tad.org or your county website)",
  },
  FL: {
    body: `Pursuant to Florida Statute Section 194.011, I hereby file this petition for review of the above property's assessment with the Value Adjustment Board (VAB). I contend the assessed value is excessive and does not reflect the property's just value as defined under Florida law, and I request a hearing to present comparable market evidence.`,
    sendTo: "Your County Value Adjustment Board (VAB) — find at your county property appraiser's office",
  },
  NY: {
    body: `Pursuant to Article 7 of the New York State Real Property Tax Law (RPTL), I hereby file this grievance with respect to the assessed value of the above-referenced property. I contend the assessment is excessive and/or unequal, and I request a hearing before the Board of Assessment Review (BAR) to present supporting evidence.`,
    sendTo: "Your local Board of Assessment Review (BAR) — find at www.tax.ny.gov",
  },
  PA: {
    body: `Pursuant to the Pennsylvania Consolidated Statutes Title 53, I hereby appeal the assessment of the above-referenced property to the Board of Assessment Appeals. I believe the assessment is excessive relative to the property's fair market value as evidenced by comparable sales in the area, and I respectfully request a formal hearing.`,
    sendTo: "Your County Board of Assessment Appeals — find at your county government website",
  },
  IL: {
    body: `Pursuant to the Property Tax Code (35 ILCS 200/), I hereby appeal the assessed value of the above-referenced property to the Board of Review. I contend the assessment is excessive and does not reflect fair market value, and I request a formal hearing to present comparable sales and assessment evidence.`,
    sendTo: "Your County Board of Review — find at your county assessor's website",
  },
  OH: {
    body: `Pursuant to Ohio Revised Code Section 5715.19, I hereby file this complaint against the valuation of the above-referenced property with the County Board of Revision. I contend the current assessed value is excessive based on comparable sales evidence, and I request a hearing to present my case.`,
    sendTo: "Your County Board of Revision — find at your county auditor's website",
  },
  GA: {
    body: `Pursuant to O.C.G.A. Section 48-5-311, I hereby appeal the assessment of the above-referenced property to the County Board of Equalization. I contend the assessed value is excessive and does not reflect the fair market value of the property, and I respectfully request a formal hearing with supporting comparable sales evidence.`,
    sendTo: "Your County Board of Equalization — find at your county tax assessor's office",
  },
  NC: {
    body: `Pursuant to North Carolina General Statute Chapter 105-322, I hereby appeal the appraised value of the above-referenced property to the Board of Equalization and Review. I believe the appraisal is excessive and does not reflect true market value, and I request a hearing to present comparable sales data.`,
    sendTo: "Your County Board of Equalization and Review — find at your county tax office",
  },
  MI: {
    body: `Pursuant to Michigan Compiled Laws Section 211.30, I hereby appeal the assessment of the above-referenced property to the March Board of Review (and if necessary to the Michigan Tax Tribunal). I contend the assessed value exceeds 50% of the property's true cash value as established by comparable sales evidence.`,
    sendTo: "Your Township/City Board of Review (March sessions) — find at your local assessor's office",
  },
};

const DEFAULT_LANGUAGE = {
  body: `I hereby submit this formal appeal of the assessed value of the above-referenced property. Based on a review of comparable property sales in my area, I believe the current assessed value is excessive and does not reflect the fair market value of my property. I respectfully request that you review and reduce the assessed value accordingly, and I am prepared to present supporting evidence at a formal hearing.`,
  sendTo: "Your County Assessor's Office or Board of Assessment Appeals",
};

const TOP_STATES = Object.entries(STATE_RATES)
  .filter(([code]) => code !== "DC")
  .map(([code, s]) => ({ code, label: s.label }))
  .sort((a, b) => a.label.localeCompare(b.label));

const AppealLetterUSA = () => {
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [assessedValue, setAssessedValue] = useState("");
  const [requestedValue, setRequestedValue] = useState("");
  const [evidence, setEvidence] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const lang = STATE_LANGUAGE[state] || DEFAULT_LANGUAGE;
  const stateLabel = STATE_RATES[state]?.label || state;

  const letter = `${name}
${address}

${today}

${lang.sendTo}

Re: FORMAL APPEAL OF PROPERTY TAX ASSESSMENT
Property Address: ${address.split(",")[0] || address}
Owner: ${name}

Dear Board of Review / County Assessor,

I am writing to formally appeal the assessed value of my property at the above address.

CURRENT AND REQUESTED ASSESSMENT

Current Assessed Value: ${assessedValue ? `$${parseFloat(assessedValue.replace(/[$,]/g, "")).toLocaleString()}` : "[YOUR CURRENT ASSESSED VALUE]"}
Requested Assessed Value: ${requestedValue ? `$${parseFloat(requestedValue.replace(/[$,]/g, "")).toLocaleString()}` : "[YOUR REQUESTED VALUE]"}

GROUNDS FOR APPEAL

${lang.body}

SUPPORTING EVIDENCE

${evidence || "I have identified the following comparable properties (comps) with lower assessed values and recent lower sales prices:\n\n- [Property 1 address, sale price, assessed value]\n- [Property 2 address, sale price, assessed value]\n- [Property 3 address, sale price, assessed value]\n\nThese comparables demonstrate that my property's current assessed value exceeds fair market value."}

REQUEST

I respectfully request that you:
1. Review the assessment of my property in light of the comparable evidence provided.
2. Reduce the assessed value to ${requestedValue ? `$${parseFloat(requestedValue.replace(/[$,]/g, "")).toLocaleString()}` : "[requested value]"} or to a value consistent with comparable properties.
3. Notify me of the hearing date and any additional documentation required.

I am available to attend a hearing at your convenience and look forward to presenting this evidence.

Sincerely,

${name}

---
State: ${stateLabel}
Send to: ${lang.sendTo}
Keep a signed copy for your records.
`;

  const isValid = name.trim() && address.trim() && state;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printLetter = () => {
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`<html><head><title>Property Tax Appeal Letter</title><style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;line-height:1.8;font-size:14px;white-space:pre-wrap}</style></head><body>${letter.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</body></html>`);
      win.document.close();
      win.print();
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-foreground mb-1">Property Tax Appeal Letter Generator</h3>
        <p className="text-sm text-muted-foreground">
          State-specific formal appeal letter for your county assessor. Legal language for all 50 states.
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger><SelectValue placeholder="Select state…" /></SelectTrigger>
            <SelectContent className="max-h-64">
              {TOP_STATES.map((s) => (
                <SelectItem key={s.code} value={s.code}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Your full name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Smith" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Property address</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 123 Main Street, Austin, TX 78701" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Current assessed value ($)</Label>
          <Input value={assessedValue} onChange={(e) => setAssessedValue(e.target.value)} placeholder="e.g. 420,000" className="font-mono" />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label className="text-sm font-medium">Requested assessed value ($)</Label>
          <Input value={requestedValue} onChange={(e) => setRequestedValue(e.target.value)} placeholder="e.g. 350,000" className="font-mono" />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label className="text-sm font-medium">
            Comparable evidence <span className="text-muted-foreground font-normal">(optional — template used if blank)</span>
          </Label>
          <Textarea
            rows={3}
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            placeholder="e.g. 456 Elm Street sold for $340,000 in March 2024 and is assessed at $335,000. My property is of similar size and condition…"
          />
        </div>
      </div>

      <Button
        onClick={() => setGenerated(true)}
        disabled={!isValid}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
      >
        Generate Appeal Letter
      </Button>

      {/* Output */}
      {generated && isValid && (
        <div className="space-y-4 animate-fade-in pt-2 border-t border-border">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-saving" />
                <span className="font-semibold text-foreground text-sm">Your {stateLabel} Appeal Letter</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={copyToClipboard} className="gap-1.5 h-8 text-xs">
                  {copied ? <CheckCircle className="h-3.5 w-3.5 text-saving" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy text"}
                </Button>
                <Button size="sm" variant="outline" onClick={printLetter} className="gap-1.5 h-8 text-xs">
                  <Printer className="h-3.5 w-3.5" /> Print / PDF
                </Button>
              </div>
            </div>
            <pre className="bg-secondary rounded-xl p-5 text-xs font-mono whitespace-pre-wrap leading-relaxed border border-border text-foreground overflow-x-auto max-h-80 overflow-y-auto">
              {letter}
            </pre>
          </div>

          {/* After-send instructions */}
          <div className="bg-primary-subtle border border-primary/15 rounded-xl p-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">After You Send Your Letter</p>
            <ol className="space-y-2 text-xs text-foreground list-decimal list-inside">
              <li>Make multiple copies and keep one for your records</li>
              <li>File before your state deadline — late appeals are typically rejected</li>
              <li>Gather comparable sales data (Zillow, Redfin, county records)</li>
              <li>Attend the hearing prepared with photos, floor plan, and comps</li>
              <li>If denied at Board level, escalate to State Tax Tribunal — usually still free</li>
            </ol>
            <div className="mt-3 pt-3 border-t border-primary/15">
              <a
                href="https://www.naco.org/counties/find-your-county"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary text-xs font-semibold hover:underline"
              >
                Find your county assessor <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppealLetterUSA;
