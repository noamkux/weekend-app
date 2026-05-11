import type { TripMember, Trip } from "../../types/trip.types";
import { useLang } from "../../i18n/useLang";

const BADGE_STYLE: Record<Trip["status"], string> = {
  voting: "bg-[#E6F1FB] text-[#0C447C]",
  planning: "bg-[#EEEDFE] text-[#3C3489]",
  active: "bg-[#EAF3DE] text-[#27500A]",
  settlement: "bg-[#FAEEDA] text-[#854F0B]",
  archived: "bg-[#F1EFE8] text-[#444441]",
};

export function TripRow({
  trip,
  onClick,
}: {
  trip: Trip;
  onClick: () => void;
}) {
  const { t } = useLang();

  const BADGE_LABEL: Record<Trip["status"], string> = {
    voting: t.badgeVoting,
    planning: t.badgePlanning,
    active: t.badgeActive,
    settlement: t.badgeSettlement,
    archived: t.badgeArchived,
  };

  return (
    <article
      onClick={onClick}
      className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
    >
      <div
        className="w-[38px] h-[38px] rounded-lg flex items-center justify-center text-xl shrink-0"
        style={{ background: trip.iconBg }}
      >
        {trip.emoji}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 truncate">
          {trip.name}
        </p>
        <p className="text-[11px] text-zinc-500 mt-0.5">{trip.dates}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <div className="flex">
          {trip.members.map((m: TripMember, i: number) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-medium border-2 border-white dark:border-zinc-900 -mr-1.5 last:mr-0"
              style={{ background: m.bg, color: m.color }}
            >
              {m.initials}
            </div>
          ))}
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${BADGE_STYLE[trip.status]}`}
        >
          {BADGE_LABEL[trip.status]}
        </span>
      </div>
    </article>
  );
}
