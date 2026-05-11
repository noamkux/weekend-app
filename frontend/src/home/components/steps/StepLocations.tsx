import { useState } from "react";
import type { NewTripForm, LocationOption } from "../../../types/newTrip.types";
import { useLang } from "../../../i18n/useLang";

interface Props {
  form: NewTripForm;
  update: (p: Partial<NewTripForm>) => void;
}

export function StepLocations({ form, update }: Props) {
  const { t } = useLang();
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    const loc: LocationOption = { id: crypto.randomUUID(), name: input.trim() };
    update({ locations: [...form.locations, loc] });
    setInput("");
  };

  const remove = (id: string) =>
    update({ locations: form.locations.filter((l) => l.id !== id) });

  return (
    <div className="p-5 flex flex-col gap-4">
      <p className="text-[13px] text-zinc-500">{t.locationsHint}</p>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-medium text-zinc-500">
          {t.locationsTitle}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder={t.locationsPlaceholder}
            className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[13px] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
          />
          <button
            onClick={add}
            className="px-4 py-2 bg-[#534AB7] text-white rounded-lg text-[13px] font-medium"
          >
            {t.locationsAdd}
          </button>
        </div>
      </div>

      {form.locations.length > 0 ? (
        <div className="flex flex-col gap-2">
          <label className="text-[12px] font-medium text-zinc-500">
            {t.locationsAdded}
          </label>
          {form.locations.map((loc) => (
            <div
              key={loc.id}
              className="flex items-center justify-between px-3 py-2.5 border border-zinc-200 dark:border-zinc-700 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <i
                  className="ti ti-map-pin text-[#534AB7] text-[15px]"
                  aria-hidden="true"
                />
                <span className="text-[13px] text-zinc-900 dark:text-zinc-100">
                  {loc.name}
                </span>
              </div>
              <button
                onClick={() => remove(loc.id)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <i className="ti ti-trash text-[14px]" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-zinc-400">
          <i className="ti ti-map-pin text-[32px] mb-2" aria-hidden="true" />
          <p className="text-[13px]">{t.locationsEmpty}</p>
        </div>
      )}
    </div>
  );
}
