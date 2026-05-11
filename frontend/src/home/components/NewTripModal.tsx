import { useState } from "react";
import { StepDetails } from "./steps/StepDetails";
import { StepLocations } from "./steps/StepLocations";
import { StepDates } from "./steps/StepDates";
import { StepActivities } from "./steps/StepActivities";
import type { NewTripForm } from "../../types/newTrip.types";
import { useLang } from "../../i18n/useLang";

const EMPTY_FORM: NewTripForm = {
  name: "",
  votingDeadline: "",
  members: [],
  emailInvites: [],
  locations: [],
  dates: [],
  activities: [],
};

interface Props {
  onClose: () => void;
  onSubmit: (form: NewTripForm) => void;
}

export function NewTripModal({ onClose, onSubmit }: Props) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<NewTripForm>(EMPTY_FORM);

  const update = (partial: Partial<NewTripForm>) =>
    setForm((f) => ({ ...f, ...partial }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const STEPS = [
    t.newTripStepDetails,
    t.newTripStepLocations,
    t.newTripStepDates,
    t.newTripStepActivities,
  ];
  const handleSubmit = () => onSubmit(form);

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full max-w-[560px] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <h2 className="text-[15px] font-medium">{t.newTripTitle}</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-500"
          >
            <i className="ti ti-x text-sm" aria-hidden="true" />
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px] font-medium shrink-0
                  ${
                    i < step
                      ? "bg-[#534AB7] text-white"
                      : i === step
                        ? "bg-[#534AB7] text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {i < step ? (
                    <i className="ti ti-check" style={{ fontSize: 11 }} />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium ${i <= step ? "text-[#534AB7]" : "text-zinc-400"}`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 ${i < step ? "bg-[#534AB7]" : "bg-zinc-200 dark:bg-zinc-700"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto">
          {step === 0 && <StepDetails form={form} update={update} />}
          {step === 1 && <StepLocations form={form} update={update} />}
          {step === 2 && <StepDates form={form} update={update} />}
          {step === 3 && <StepActivities form={form} update={update} />}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
          <button
            onClick={back}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-3.5 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[13px] text-zinc-500 disabled:opacity-30"
          >
            <i className="ti ti-arrow-right text-[13px]" aria-hidden="true" />
            {t.newTripBack}
          </button>
          <span className="text-[12px] text-zinc-400">
            {t.newTripStepCounter
              .replace("{current}", String(step + 1))
              .replace("{total}", String(STEPS.length))}
          </span>
          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#534AB7] text-white rounded-lg text-[13px] font-medium"
            >
              {t.newTripNext}
              <i className="ti ti-arrow-left text-[13px]" aria-hidden="true" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-1.5 bg-[#534AB7] text-white rounded-lg text-[13px] font-medium"
            >
              {t.newTripSubmit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
