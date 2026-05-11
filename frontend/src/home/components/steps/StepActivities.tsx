import { useState } from "react";
import type {
  NewTripForm,
  ActivityCategory,
} from "../../../types/newTrip.types";
import { useLang } from "../../../i18n/useLang";

interface Props {
  form: NewTripForm;
  update: (p: Partial<NewTripForm>) => void;
}

export function StepActivities({ form, update }: Props) {
  const { t } = useLang();
  const [otherLabel, setOtherLabel] = useState("");

  const CATEGORIES: { key: ActivityCategory; label: string; icon: string }[] = [
    { key: "hiking", label: t.activityHiking, icon: "ti-mountain" },
    { key: "water", label: t.activityWater, icon: "ti-wave-sine" },
    { key: "attraction", label: t.activityAttraction, icon: "ti-ticket" },
    { key: "party", label: t.activityParty, icon: "ti-confetti" },
    { key: "other", label: t.activityOther, icon: "ti-dots" },
  ];

  const isSelected = (key: ActivityCategory) =>
    form.activities.some((a) => a.category === key);

  const toggle = (key: ActivityCategory) => {
    if (isSelected(key)) {
      update({ activities: form.activities.filter((a) => a.category !== key) });
    } else {
      update({ activities: [...form.activities, { category: key }] });
    }
  };

  const setOther = (label: string) => {
    setOtherLabel(label);
    update({
      activities: [
        ...form.activities.filter((a) => a.category !== "other"),
        ...(label.trim()
          ? [
              {
                category: "other" as ActivityCategory,
                customLabel: label.trim(),
              },
            ]
          : []),
      ],
    });
  };

  return (
    <div className="p-5 flex flex-col gap-4">
      <p className="text-[13px] text-zinc-500">{t.activitiesHint}</p>

      <div className="flex flex-col gap-2">
        {CATEGORIES.map(({ key, label, icon }) => (
          <div key={key}>
            <div
              onClick={() => toggle(key)}
              className={`flex items-center gap-3 px-3 py-2.5 border rounded-lg cursor-pointer transition-colors
                ${
                  isSelected(key)
                    ? "border-[#534AB7] bg-[#EEEDFE]"
                    : "border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
            >
              <i
                className={`ti ${icon} text-[18px] ${isSelected(key) ? "text-[#534AB7]" : "text-zinc-400"}`}
                aria-hidden="true"
              />
              <span
                className={`flex-1 text-[13px] font-medium ${isSelected(key) ? "text-[#3C3289]" : "text-zinc-900 dark:text-zinc-100"}`}
              >
                {label}
              </span>
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0
                ${isSelected(key) ? "bg-[#534AB7] border-[#534AB7]" : "border-zinc-300"}`}
              >
                {isSelected(key) && (
                  <i
                    className="ti ti-check text-white"
                    style={{ fontSize: 10 }}
                  />
                )}
              </div>
            </div>
            {key === "other" && isSelected("other") && (
              <input
                type="text"
                value={otherLabel}
                onChange={(e) => setOther(e.target.value)}
                placeholder={t.activityOtherPlaceholder}
                className="mt-2 w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[13px] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
