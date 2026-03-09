import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UK_BANDS } from "./CouncilTaxChecker";
import { FileText, Copy, Printer, CheckCircle } from "lucide-react";

const generateLetter = (
  name: string,
  address: string,
  currentBand: string,
  requestedBand: string,
  evidence: string,
  date: string
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
Note: Send this letter to your local VOA office. Find the address at: https://www.gov.uk/contact-voa
Keep a copy for your records and send by recorded post.
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
  const letter = generateLetter(name, address, currentBand, requestedBand, evidence || "My 1991 estimated property value (using regional house price index data) suggests my property should be in a lower band. Comparable properties on my street are also in a lower band.", today);

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
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="font-display font-bold text-lg text-foreground">Council Tax Appeal Letter Generator</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-5">
          Fill in the fields below to generate a formal appeal letter to the Valuation Office Agency (VOA). Uses correct legal language.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="name" className="font-medium mb-1 block">Your Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jane Smith" />
          </div>

          <div>
            <Label htmlFor="address" className="font-medium mb-1 block">Property Address</Label>
            <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 12 Oak Street, Bristol, BS1 2AB" />
          </div>

          <div>
            <Label className="font-medium mb-1 block">Current Council Tax Band</Label>
            <Select value={currentBand} onValueChange={setCurrentBand}>
              <SelectTrigger>
                <SelectValue placeholder="Select current band..." />
              </SelectTrigger>
              <SelectContent>
                {UK_BANDS.map((b) => (
                  <SelectItem key={b.band} value={b.band}>Band {b.band} — {b.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="font-medium mb-1 block">Requested Band (what you believe it should be)</Label>
            <Select value={requestedBand} onValueChange={setRequestedBand}>
              <SelectTrigger>
                <SelectValue placeholder="Select requested band..." />
              </SelectTrigger>
              <SelectContent>
                {UK_BANDS.map((b) => (
                  <SelectItem key={b.band} value={b.band}>Band {b.band} — {b.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-5">
          <Label htmlFor="evidence" className="font-medium mb-1 block">
            Your Evidence (optional — will use default if blank)
          </Label>
          <Textarea
            id="evidence"
            rows={3}
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            placeholder="e.g. My neighbour at No. 14 (identical property) is in Band C. My estimated 1991 value of £55,000 falls in Band B range..."
          />
        </div>

        <Button
          onClick={() => setGenerated(true)}
          disabled={!isValid}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
        >
          Generate Appeal Letter
        </Button>
      </div>

      {generated && isValid && (
        <div className="animate-fade-up space-y-3">
          <div className="bg-card rounded-xl border border-border shadow-card p-6">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <h4 className="font-display font-bold text-foreground flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-saving" />
                Your Appeal Letter
              </h4>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={copyToClipboard} className="gap-1.5">
                  {copied ? <CheckCircle className="h-4 w-4 text-saving" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button size="sm" variant="outline" onClick={printLetter} className="gap-1.5">
                  <Printer className="h-4 w-4" /> Print / Save as PDF
                </Button>
              </div>
            </div>
            <pre className="bg-secondary rounded-lg p-5 text-sm font-mono whitespace-pre-wrap leading-relaxed border border-border text-foreground overflow-x-auto">
              {letter}
            </pre>
          </div>

          <div className="bg-primary-subtle rounded-xl border border-primary/20 p-5 text-sm">
            <h5 className="font-bold text-primary mb-2">📮 How to Send Your Appeal</h5>
            <ol className="space-y-1.5 text-foreground list-decimal list-inside">
              <li>Find your local VOA office address at <a href="https://www.gov.uk/contact-voa" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.gov.uk/contact-voa</a></li>
              <li>Print and sign the letter, keeping a copy for your records</li>
              <li>Send by <strong>recorded delivery</strong> (proof of postage is important)</li>
              <li>You can also submit online at <a href="https://www.gov.uk/challenge-council-tax-band" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.gov.uk/challenge-council-tax-band</a></li>
              <li>The VOA will acknowledge within 2 weeks and decide within 6 months</li>
              <li>If unsuccessful, you can appeal to the independent Valuation Tribunal — still free</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppealLetterUK;
