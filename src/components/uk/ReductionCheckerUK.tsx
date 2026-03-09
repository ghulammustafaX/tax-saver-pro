import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, HelpCircle, ExternalLink } from "lucide-react";

type Answer = "yes" | "no" | null;

interface Discount {
  id: string;
  title: string;
  question: string;
  subQuestions?: { id: string; question: string }[];
  outcome: (ans: Answer, subs?: Record<string, Answer>) => {
    eligible: boolean | "maybe";
    message: string;
    amount: string;
    link?: string;
  };
}

const discounts: Discount[] = [
  {
    id: "single",
    title: "Single Person Discount (25% off)",
    question: "Are you the only adult (18+) living in your property?",
    outcome: (ans) => {
      if (ans === "yes")
        return {
          eligible: true,
          message: "You are likely eligible for the Single Person Discount — a 25% reduction on your council tax bill. Apply to your local council.",
          amount: "25% off your bill",
          link: "https://www.gov.uk/apply-for-council-tax-discount",
        };
      return {
        eligible: false,
        message: "You don't qualify for single person discount if other adults live with you. However, some adults are 'disregarded' — check the other categories below.",
        amount: "",
      };
    },
  },
  {
    id: "student",
    title: "Student Exemption (up to 100% off)",
    question: "Is every adult in the property a full-time student?",
    outcome: (ans) => {
      if (ans === "yes")
        return {
          eligible: true,
          message: "Properties where ALL adults are full-time students are fully exempt from council tax. Even if just one person is a student while others are non-students, the student may be 'disregarded' as an adult — potentially qualifying you for a single person discount.",
          amount: "100% exempt (all students) or 25% discount (one student + others)",
          link: "https://www.gov.uk/council-tax/who-has-to-pay",
        };
      return {
        eligible: "maybe",
        message: "If one adult in your property is a full-time student, they may be 'disregarded' — which could entitle the remaining occupants to a discount.",
        amount: "Possible 25% discount",
      };
    },
  },
  {
    id: "smi",
    title: "Severe Mental Impairment Discount",
    question: "Does anyone in your property have a severe mental impairment (e.g. Alzheimer's, severe learning disability, following a stroke)?",
    outcome: (ans) => {
      if (ans === "yes")
        return {
          eligible: true,
          message: "A person with a severe mental impairment (SMI) is 'disregarded' for council tax purposes. If they are the only other adult, you may qualify for a 25% single person discount. If everyone in the property is SMI, you may get a 100% exemption.",
          amount: "25% discount (or 100% exemption in some cases)",
          link: "https://www.gov.uk/apply-for-council-tax-discount",
        };
      return { eligible: false, message: "This discount doesn't apply.", amount: "" };
    },
  },
  {
    id: "carer",
    title: "Carer's Discount",
    question: "Do you provide care for at least 35 hours/week for a dependent person who is NOT your spouse/partner or a child under 18?",
    outcome: (ans) => {
      if (ans === "yes")
        return {
          eligible: true,
          message: "Live-in carers who provide at least 35 hours/week of care are 'disregarded' for council tax. If you are the only other adult in the property, this could qualify you for a 25% single person discount.",
          amount: "25% discount (if only other adult)",
          link: "https://www.gov.uk/apply-for-council-tax-discount",
        };
      return { eligible: false, message: "This discount doesn't apply based on your situation.", amount: "" };
    },
  },
  {
    id: "empty",
    title: "Empty Property Rules",
    question: "Is the property currently unoccupied / empty?",
    outcome: (ans) => {
      if (ans === "yes")
        return {
          eligible: "maybe",
          message: "Empty properties may receive a discount or be fully exempt, but rules vary widely by council. Properties empty for over 2 years can be charged a 200% premium in some areas. Contact your local council immediately.",
          amount: "Varies by council (0%–100% discount)",
          link: "https://www.gov.uk/council-tax/discounts-for-empty-homes",
        };
      return { eligible: false, message: "This category doesn't apply to your occupied property.", amount: "" };
    },
  },
  {
    id: "ctr",
    title: "Council Tax Reduction (Low Income)",
    question: "Is your household on a low income, or do you receive benefits (Universal Credit, Income Support, Pension Credit, etc.)?",
    outcome: (ans) => {
      if (ans === "yes")
        return {
          eligible: true,
          message: "You may be eligible for Council Tax Reduction (CTR) — formerly known as Council Tax Benefit. This is means-tested and could reduce your bill significantly, potentially to zero. Apply through your local council. Don't delay — it doesn't backdate easily.",
          amount: "Up to 100% reduction",
          link: "https://www.gov.uk/apply-council-tax-reduction",
        };
      return { eligible: false, message: "CTR is means-tested. If your circumstances change, check back.", amount: "" };
    },
  },
];

const ResultBadge = ({ eligible }: { eligible: boolean | "maybe" }) => {
  if (eligible === true)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold bg-saving-light text-saving px-2 py-1 rounded-full border border-saving">
        <CheckCircle className="h-3 w-3" /> Likely Eligible
      </span>
    );
  if (eligible === "maybe")
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold bg-accent-light text-accent px-2 py-1 rounded-full border border-accent">
        <HelpCircle className="h-3 w-3" /> Possibly Eligible
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-bold bg-muted text-muted-foreground px-2 py-1 rounded-full border border-border">
      <XCircle className="h-3 w-3" /> Not Applicable
    </span>
  );
};

const ReductionCheckerUK = () => {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [checked, setChecked] = useState(false);

  const setAnswer = (id: string, ans: Answer) => {
    setAnswers((prev) => ({ ...prev, [id]: ans }));
  };

  const eligibleResults = discounts
    .filter((d) => answers[d.id])
    .map((d) => ({ ...d, result: d.outcome(answers[d.id] ?? null) }))
    .filter((d) => d.result.eligible !== false);

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl border border-border shadow-card p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-1">Council Tax Discount Eligibility Checker</h3>
        <p className="text-muted-foreground text-sm mb-6">
          Answer each question to find out which discounts or exemptions you might qualify for. Millions of households miss out on discounts they're entitled to.
        </p>

        <div className="space-y-4">
          {discounts.map((d) => (
            <div key={d.id} className="border border-border rounded-lg p-4">
              <div className="font-semibold text-foreground text-sm mb-3">{d.title}</div>
              <p className="text-muted-foreground text-sm mb-3">{d.question}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={answers[d.id] === "yes" ? "default" : "outline"}
                  onClick={() => setAnswer(d.id, "yes")}
                  className={answers[d.id] === "yes" ? "bg-saving text-saving-foreground hover:bg-saving/90" : ""}
                >
                  Yes
                </Button>
                <Button
                  size="sm"
                  variant={answers[d.id] === "no" ? "default" : "outline"}
                  onClick={() => setAnswer(d.id, "no")}
                  className={answers[d.id] === "no" ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" : ""}
                >
                  No
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setChecked(true)}
          className="mt-5 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
          disabled={Object.keys(answers).length === 0}
        >
          Check My Eligibility
        </Button>
      </div>

      {checked && (
        <div className="animate-fade-up space-y-4">
          {eligibleResults.length === 0 ? (
            <div className="bg-secondary rounded-xl p-6 text-center text-muted-foreground border border-border">
              <p className="font-semibold mb-1">No discounts identified based on your answers</p>
              <p className="text-sm">Your situation may still qualify — contact your local council directly to explore all options.</p>
            </div>
          ) : (
            <>
              <div className="bg-saving-light rounded-xl border-2 border-saving p-5 shadow-saving">
                <h4 className="font-display font-bold text-foreground text-lg mb-1">
                  🎉 You may be eligible for {eligibleResults.length} discount{eligibleResults.length > 1 ? "s" : ""}
                </h4>
                <p className="text-sm text-muted-foreground">Review each below and apply through your local council</p>
              </div>

              {eligibleResults.map((d) => (
                <div key={d.id} className="bg-card rounded-xl border border-border shadow-card p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h5 className="font-bold text-foreground">{d.title}</h5>
                    <ResultBadge eligible={d.result.eligible} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{d.result.message}</p>
                  {d.result.amount && (
                    <div className="text-sm font-semibold text-saving mb-3">💰 {d.result.amount}</div>
                  )}
                  {d.result.link && (
                    <a
                      href={d.result.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline"
                    >
                      Apply on GOV.UK <ExternalLink className="h-3 w-3" />
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
