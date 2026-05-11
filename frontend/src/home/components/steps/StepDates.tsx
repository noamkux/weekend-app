import { useState } from "react";
import type { NewTripForm, DateOption } from "../../../types/newTrip.types";
import { useLang } from "../../../i18n/useLang";

interface Props {
  form: NewTripForm;
  update: (p: Partial<NewTripForm>) => void;
}

export function StepDates({ form, update }: Props) {
  const { t, lang } = useLang();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const add = () => {
    if (!from) return;
    const opt: DateOption = { id: crypto.randomUUID(), from, to: to || from };
    update({ dates: [...form.dates, opt] });
    setFrom("");
    setTo("");
  };

  const remove = (id: string) =>
    update({ dates: form.dates.filter((d) => d.id !== id) });

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(lang === "he" ? "he-IL" : "en-GB", {
      day: "numeric",
      month: "long",
    });

  return (
    <div className="p-5 flex flex-col gap-4">
      <p className="text-[13px] text-zinc-500">{t.datesHint}</p>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-medium text-zinc-500">
          {t.datesAdd}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-zinc-400">{t.datesFrom}</span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[13px] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-zinc-400">{t.datesTo}</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[13px] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            />
          </div>
        </div>
        <button
          onClick={add}
          className="mt-1 px-4 py-2 bg-[#534AB7] text-white rounded-lg text-[13px] font-medium self-end"
        >
          {t.datesAddBtn}
        </button>
      </div>

      {form.dates.length > 0 ? (
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-medium text-zinc-500">
            {t.datesAdded}
          </label>
          {form.dates.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <i
                  className="ti ti-calendar text-[#534AB7] text-[15px]"
                  aria-hidden="true"
                />
                <span className="text-[13px] text-zinc-900 dark:text-zinc-100">
                  {fmt(d.from)}
                  {d.to !== d.from ? ` — ${fmt(d.to)}` : ""}
                </span>
              </div>
              <button
                onClick={() => remove(d.id)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <i className="ti ti-trash text-[14px]" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-zinc-400">
          <i className="ti ti-calendar text-[32px] mb-2" aria-hidden="true" />
          <p className="text-[13px]">{t.datesEmpty}</p>
        </div>
      )}
    </div>
  );
}
