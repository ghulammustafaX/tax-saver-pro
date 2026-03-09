import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UK_BANDS } from "./CouncilTaxChecker";
import { Copy, Printer, CheckCircle, ExternalLink } from "lucide-react";

const generateLetter = (
  name: string, address: string, currentBand: string,
  requestedBand: string, evidence: string, date: string
) => `${name}
${address}

${date}

Valuation Officer
Valuation Office Agency
[Your local VOA address — find at www.gov.uk/contact-voa]

Dear Valuation Officer,

RE: FORMAL PROPOSAL TO ALTER COUNCIL TAX BAND — ${address.split("\n")[0].toUpperCase()}

I am writing to formally propose an alteration to the council tax band of my property at the address above, which is currently listed in Band ${currentBand}.

I believe my property is incorrectly banded and should be placed in Band ${requestedBand}. I set out my grounds below.

GROUNDS FOR APPEAL

${evidence}

Additionally, I have examined comparable properties on my street and in the immediate area using the Valuation Office Agency's online band checker. Several properties of similar size, type, construction, and location are listed in Band ${requestedBand}, which supports my proposal.

RELEVANT LEGISLATION

My proposal is made under Regulation 4 of the Council Tax (Alteration of Lists and Appeals) (England) Regulations 2009 (or the equivalent Welsh / Scottish regulations as applicable). I understand that if a reduction is agreed, it will be backdated to 1 April 1993 or to the date the property first appeared on the council tax list, whichever is later.

REQUESTED ACTION

I respectfully request that the Valuation Office Agency:
1. Reviews the banding of my property at the above address.
2. Considers the evidence provided and the comparable properties referenced.
3. Alters the band from Band ${currentBand} to Band ${requestedBand}.

I am happy to provide further evidence if required, including photographs, floor plans, or estate agent valuations.

Please acknowledge receipt of this proposal and advise of the next steps and expected timeline.

Yours faithfully,

${name}

---
Send to your local VOA office: https://www.gov.uk/contact-voa
Keep a copy and send by recorded delivery.
`;

const AppealLetterUK = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [currentBand, setCurrentBand] = useState("");
  const [requestedBand, setRequestedBand] = useState("");
  const [evidence, setEvidence] = useState("");
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  const today = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const letter = generateLetter(
    name, address, currentBand, requestedBand,
    evidence || "My 1991 estimated property value (using regional house price index data) suggests my property should be in a lower band. Comparable properties on my street are also in a lower band.",
    today
  );

  const isValid = name.trim() && address.trim() && currentBand && requestedBand;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const printLetter = () => {
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`<html><head><title>Council Tax Appeal Letter</title><style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;line-height:1.8;font-size:14px;white-space:pre-wrap}</style></head><body>${letter.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</body></html>`);
      win.document.close();
      win.print();
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-foreground mb-1">Council Tax Appeal Letter Generator</h3>
        <p className="text-sm text-muted-foreground">
          Fill in the fields below to generate a formal appeal letter to the VOA with correct legal language.
        </p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Your full name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jane Smith" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Property address</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 12 Oak Street, Bristol, BS1 2AB" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Current council tax band</Label>
          <Select value={currentBand} onValueChange={setCurrentBand}>
            <SelectTrigger><SelectValue placeholder="Select current band…" /></SelectTrigger>
            <SelectContent>
              {UK_BANDS.map((b) => (
                <SelectItem key={b.band} value={b.band}>Band {b.band} — {b.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Requested band (what it should be)</Label>
          <Select value={requestedBand} onValueChange={setRequestedBand}>
            <SelectTrigger><SelectValue placeholder="Select requested band…" /></SelectTrigger>
            <SelectContent>
              {UK_BANDS.map((b) => (
                <SelectItem key={b.band} value={b.band}>Band {b.band} — {b.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <Label className="text-sm font-medium">
            Your evidence <span className="text-muted-foreground font-normal">(optional — default text used if blank)</span>
          </Label>
          <Textarea
            rows={3}
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            placeholder="e.g. My neighbour at No. 14 (identical property) is in Band C. My estimated 1991 value of £55,000 falls in Band B range…"
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
          {/* Letter preview */}
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-saving" />
                <span className="font-semibold text-foreground text-sm">Your Appeal Letter</span>
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

          {/* Sending instructions */}
          <div className="bg-primary-subtle border border-primary/15 rounded-xl p-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">How to send your appeal</p>
            <ol className="space-y-2 text-xs text-foreground list-decimal list-inside">
              <li>Find your local VOA address at{" "}
                <a href="https://www.gov.uk/contact-voa" target="_blank" rel="noopener noreferrer"
                  className="text-primary underline inline-flex items-center gap-0.5">
                  www.gov.uk/contact-voa <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
              <li>Print and sign the letter — keep a copy for your records</li>
              <li>Send by <strong>recorded delivery</strong> (proof of postage matters)</li>
              <li>Or submit online at{" "}
                <a href="https://www.gov.uk/challenge-council-tax-band" target="_blank" rel="noopener noreferrer"
                  className="text-primary underline inline-flex items-center gap-0.5">
                  www.gov.uk/challenge-council-tax-band <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </li>
              <li>VOA will acknowledge within 2 weeks and decide within 6 months</li>
              <li>If unsuccessful, appeal to the independent Valuation Tribunal — still free</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppealLetterUK;
