import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, HelpCircle, ExternalLink, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Answer = "yes" | "no" | null;

interface Discount {
  id: string;
  title: string;
  amount: string;
  question: string;
  outcome: (ans: Answer) => { eligible: boolean | "maybe"; message: string; link?: string };
}

const discounts: Discount[] = [
  {
    id: "single",
    title: "Single Person Discount",
    amount: "25% off",
    question: "Are you the only adult (18+) living in your property?",
    outcome: (ans) => ans === "yes"
      ? { eligible: true, message: "You are likely eligible for the Single Person Discount — a 25% reduction on your council tax bill. Apply directly to your local council.", link: "https://www.gov.uk/apply-for-council-tax-discount" }
      : { eligible: false, message: "You don't qualify if other adults live with you — but some adults are 'disregarded'. Check the other categories below." },
  },
  {
    id: "student",
    title: "Student Exemption",
    amount: "Up to 100% off",
    question: "Is every adult in the property a full-time student?",
    outcome: (ans) => ans === "yes"
      ? { eligible: true, message: "Properties where ALL adults are full-time students are fully exempt. If just one adult is a student, they may be 'disregarded' — potentially giving remaining occupants a 25% discount.", link: "https://www.gov.uk/council-tax/who-has-to-pay" }
      : { eligible: "maybe", message: "If one adult is a full-time student, they may be 'disregarded' — which could entitle you to a discount." },
  },
  {
    id: "smi",
    title: "Severe Mental Impairment",
    amount: "25–100% off",
    question: "Does anyone in your property have a severe mental impairment (e.g. Alzheimer's, severe learning disability, following a stroke)?",
    outcome: (ans) => ans === "yes"
      ? { eligible: true, message: "A person with SMI is 'disregarded' for council tax. If they're the only other adult, you may qualify for a 25% discount. If everyone has SMI, you may get a 100% exemption.", link: "https://www.gov.uk/apply-for-council-tax-discount" }
      : { eligible: false, message: "This discount doesn't apply to your situation." },
  },
  {
    id: "carer",
    title: "Carer's Discount",
    amount: "25% off",
    question: "Do you provide care for at least 35 hours/week for a dependent (not your partner or child under 18)?",
    outcome: (ans) => ans === "yes"
      ? { eligible: true, message: "Live-in carers providing 35+ hrs/week are 'disregarded' for council tax. If you're the only other adult, you could qualify for a 25% single person discount.", link: "https://www.gov.uk/apply-for-council-tax-discount" }
      : { eligible: false, message: "This discount doesn't apply based on your situation." },
  },
  {
    id: "empty",
    title: "Empty Property Rules",
    amount: "Varies",
    question: "Is the property currently unoccupied / empty?",
    outcome: (ans) => ans === "yes"
      ? { eligible: "maybe", message: "Empty properties may receive a discount or exemption — but rules vary widely by council. Properties empty 2+ years can be charged a 200% premium in some areas. Contact your local council immediately.", link: "https://www.gov.uk/council-tax/discounts-for-empty-homes" }
      : { eligible: false, message: "This category doesn't apply to your occupied property." },
  },
  {
    id: "ctr",
    title: "Council Tax Reduction (Low Income)",
    amount: "Up to 100% off",
    question: "Is your household on a low income or receiving benefits (Universal Credit, Income Support, Pension Credit, etc.)?",
    outcome: (ans) => ans === "yes"
      ? { eligible: true, message: "You may qualify for Council Tax Reduction (CTR) — means-tested and could reduce your bill significantly, potentially to zero. Apply through your local council. Don't delay — it doesn't backdate easily.", link: "https://www.gov.uk/apply-council-tax-reduction" }
      : { eligible: false, message: "CTR is means-tested. If your circumstances change, check back." },
  },
];

const StatusBadge = ({ eligible }: { eligible: boolean | "maybe" }) => {
  if (eligible === true) return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-saving-light text-saving px-2 py-0.5 rounded-full border border-saving/30">
      <CheckCircle className="h-2.5 w-2.5" /> Likely eligible
    </span>
  );
  if (eligible === "maybe") return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-accent-light text-accent-brand px-2 py-0.5 rounded-full border border-accent/30">
      <HelpCircle className="h-2.5 w-2.5" /> Possibly eligible
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
      <XCircle className="h-2.5 w-2.5" /> Not applicable
    </span>
  );
};

const ReductionCheckerUK = () => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [checked, setChecked] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const setAnswer = (id: string, ans: Answer) =>
    setAnswers((prev) => ({ ...prev, [id]: ans }));

  const eligibleResults = discounts
    .filter((d) => answers[d.id])
    .map((d) => ({ ...d, result: d.outcome(answers[d.id] ?? null) }))
    .filter((d) => d.result.eligible !== false);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="font-semibold text-foreground mb-1">Council Tax Discount Eligibility Checker</h3>
        <p className="text-sm text-muted-foreground">
          Answer each question to find out which discounts or exemptions you might qualify for. Millions of households miss out.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-2">
        {discounts.map((d, index) => {
          const isPreviousAnswered = index === 0 || answers[discounts[index - 1].id] !== null && answers[discounts[index - 1].id] !== undefined;
          const isLocked = !isPreviousAnswered;
          
          return (
            <div
              key={d.id}
              className={cn(
                "rounded-xl border-2 transition-all shadow-md",
                isLocked 
                  ? "opacity-50 cursor-not-allowed bg-gray-200 border-gray-300"
                  : "hover:shadow-lg bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb]",
                !isLocked && answers[d.id] === "yes" ? "border-green-200 shadow-green-100" :
                !isLocked && answers[d.id] === "no"  ? "border-red-200 shadow-red-100" :
                !isLocked && "border-gray-300 shadow-gray-300"
              )}
            >
              <button
                onClick={() => !isLocked && setExpanded(expanded === d.id ? null : d.id)}
                disabled={isLocked}
                className="w-full flex items-center justify-between gap-3 p-3 text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-bold text-muted-foreground">
                      {index + 1}
                    </span>
                    <div className={cn(
                      "w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm",
                      isLocked ? "bg-gray-400" :
                      answers[d.id] === "yes" ? "bg-green-500 shadow-green-300" :
                      answers[d.id] === "no"  ? "bg-red-500 shadow-red-300" :
                      "bg-gray-300"
                    )} />
                  </div>
                  <div className="min-w-0">
                    <p className={cn(
                      "font-semibold text-[13px] leading-tight",
                      isLocked ? "text-gray-500" : "text-foreground"
                    )}>
                      {d.title}
                    </p>
                    <p className="text-[10px] font-medium text-muted-foreground">{d.amount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {isLocked && (
                    <span className="text-[10px] font-semibold text-gray-500 bg-gray-300 px-2 py-1 rounded-full">
                      Locked
                    </span>
                  )}
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    isLocked ? "text-gray-400" : "text-muted-foreground",
                    expanded === d.id && "rotate-180"
                  )} />
                </div>
              </button>

              {expanded === d.id && !isLocked && (
              <div className="px-3 pb-3 animate-fade-in">
                <p className="text-[13px] text-muted-foreground mb-3">{d.question}</p>
                <div className="flex gap-2.5">
                  <Button
                    size="sm"
                    onClick={() => setAnswer(d.id, "yes")}
                    className={cn(
                      "h-9 text-sm font-semibold px-5 border-2 shadow-sm transition-all",
                      answers[d.id] === "yes"
                        ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                        : "bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] border-green-200 text-foreground hover:bg-green-50 hover:border-green-300"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        answers[d.id] === "yes" ? "bg-white" : "bg-green-400"
                      )} />
                      Yes
                    </div>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setAnswer(d.id, "no")}
                    className={cn(
                      "h-9 text-sm font-semibold px-5 border-2 shadow-sm transition-all",
                      answers[d.id] === "no"
                        ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                        : "bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb] border-red-200 text-foreground hover:bg-red-50 hover:border-red-300"
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        answers[d.id] === "no" ? "bg-white" : "bg-red-400"
                      )} />
                      No
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )})}
      </div>

      <Button
        onClick={() => setChecked(true)}
        className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
        disabled={Object.keys(answers).length === 0}
      >
        Check My Eligibility
      </Button>

      {/* Results */}
      {checked && (
        <div className="space-y-3 animate-fade-in pt-2 border-t border-border">
          {eligibleResults.length === 0 ? (
            <div className="bg-secondary rounded-xl p-6 text-center border border-border">
              <p className="font-semibold text-foreground mb-1">No discounts identified</p>
              <p className="text-sm text-muted-foreground">Your situation may still qualify — contact your local council directly to explore all options.</p>
            </div>
          ) : (
            <>
              <div className="bg-saving-light border border-saving/30 rounded-xl p-4">
                <p className="font-semibold text-foreground">
                  🎉 You may be eligible for <span className="text-saving">{eligibleResults.length} discount{eligibleResults.length > 1 ? "s" : ""}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Review each below and apply through your local council</p>
              </div>

              {eligibleResults.map((d) => (
                <div key={d.id} className="bg-background rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p className="font-semibold text-sm text-foreground">{d.title}</p>
                    <StatusBadge eligible={d.result.eligible} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{d.result.message}</p>
                  <p className="text-xs font-semibold text-saving mb-2">{d.amount}</p>
                  {d.result.link && (
                    <a
                      href={d.result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-xs font-semibold hover:underline"
                    >
                      Apply on GOV.UK <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ReductionCheckerUK;
