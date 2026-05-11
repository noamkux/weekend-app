import { useState } from "react";
import type { NewTripForm } from "../../../types/newTrip.types";
import { useLang } from "../../../i18n/useLang";

const MOCK_FRIENDS = [
  {
    id: "rb",
    initials: "RB",
    name: "רון בן דוד",
    bg: "#E1F5EE",
    color: "#085041",
  },
  {
    id: "am",
    initials: "AM",
    name: "אלי מזרחי",
    bg: "#FAEEDA",
    color: "#633806",
  },
  {
    id: "np",
    initials: "NP",
    name: "נועה פרץ",
    bg: "#FCEBEB",
    color: "#791F1F",
  },
  {
    id: "dl",
    initials: "DL",
    name: "דנה לוי",
    bg: "#EEEDFE",
    color: "#3C3489",
  },
];

interface Props {
  form: NewTripForm;
  update: (p: Partial<NewTripForm>) => void;
}

export function StepDetails({ form, update }: Props) {
  const { t } = useLang();
  const [email, setEmail] = useState("");

  const toggleMember = (id: string) =>
    update({
      members: form.members.includes(id)
        ? form.members.filter((m) => m !== id)
        : [...form.members, id],
    });

  const addEmail = () => {
    if (!email || form.emailInvites.includes(email)) return;
    update({ emailInvites: [...form.emailInvites, email] });
    setEmail("");
  };

  return (
    <div className="p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-medium text-zinc-500">
          {t.detailsName}
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update({ name: e.target.value })}
          placeholder={t.detailsNamePlaceholder}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[13px] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-medium text-zinc-500">
          {t.detailsDeadline}
        </label>
        <input
          type="date"
          value={form.votingDeadline}
          onChange={(e) => update({ votingDeadline: e.target.value })}
          className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[13px] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-medium text-zinc-500">
          {t.detailsMembers}
        </label>

        {form.members.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-1">
            {form.members.map((id) => {
              const f = MOCK_FRIENDS.find((x) => x.id === id)!;
              return (
                <span
                  key={id}
                  className="flex items-center gap-1 px-2.5 py-1 bg-[#EEEDFE] text-[#3C3489] rounded-full text-[11px]"
                >
                  {f.name}
                  <button onClick={() => toggleMember(id)}>
                    <i className="ti ti-x text-[10px]" aria-hidden="true" />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-200 dark:border-zinc-700">
            <i
              className="ti ti-search text-zinc-400 text-[15px]"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder={t.detailsSearchFriend}
              className="flex-1 text-[13px] bg-transparent outline-none text-zinc-900 dark:text-zinc-100"
            />
          </div>
          {MOCK_FRIENDS.map((f) => (
            <div
              key={f.id}
              onClick={() => toggleMember(f.id)}
              className="flex items-center gap-2.5 px-3 py-2 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium shrink-0"
                style={{ background: f.bg, color: f.color }}
              >
                {f.initials}
              </div>
              <span className="flex-1 text-[13px] text-zinc-900 dark:text-zinc-100">
                {f.name}
              </span>
              <div
                className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${form.members.includes(f.id) ? "bg-[#534AB7] border-[#534AB7]" : "border-zinc-300"}`}
              >
                {form.members.includes(f.id) && (
                  <i
                    className="ti ti-check text-white"
                    style={{ fontSize: 10 }}
                  />
                )}
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 px-3 py-2 border-t border-zinc-200 dark:border-zinc-700">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
            <span className="text-[11px] text-zinc-400 shrink-0">
              {t.detailsOrEmail}
            </span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
          </div>
          <div className="flex gap-2 px-3 py-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addEmail()}
              placeholder="friend@example.com"
              className="flex-1 px-2.5 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-lg text-[12px] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
            />
            <button
              onClick={addEmail}
              className="px-3 py-1.5 bg-[#534AB7] text-white rounded-lg text-[12px] font-medium"
            >
              {t.detailsAddEmail}
            </button>
          </div>
          {form.emailInvites.length > 0 && (
            <div className="flex flex-wrap gap-1.5 px-3 pb-2">
              {form.emailInvites.map((em) => (
                <span
                  key={em}
                  className="flex items-center gap-1 px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full text-[11px]"
                >
                  {em}
                  <button
                    onClick={() =>
                      update({
                        emailInvites: form.emailInvites.filter((x) => x !== em),
                      })
                    }
                  >
                    <i className="ti ti-x text-[10px]" aria-hidden="true" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
