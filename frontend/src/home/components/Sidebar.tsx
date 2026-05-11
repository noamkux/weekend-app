import { useLang } from "../../i18n/useLang";
import type { T } from "../../i18n/LangContext";

const NAV = [
  { key: "trips", icon: "ti-map-pin", label: (t: T) => t.navTrips },
  { key: "friends", icon: "ti-users", label: (t: T) => t.navFriends },
  { key: "alerts", icon: "ti-bell", label: (t: T) => t.navAlerts },
  { key: "profile", icon: "ti-user", label: (t: T) => t.navProfile },
  { key: "settings", icon: "ti-settings", label: (t: T) => t.navSettings },
];

interface Props {
  active: string;
  onNavigate: (key: string) => void;
  user: { name: string; initials: string };
}

export function Sidebar({ active, onNavigate, user }: Props) {
  const { t } = useLang();

  return (
    <nav className="w-[196px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0">
      <div className="flex items-center gap-2 p-4">
        <div className="w-7 h-7 bg-[#534AB7] rounded-lg flex items-center justify-center">
          <i className="ti ti-tent text-white text-[15px]" aria-hidden="true" />
        </div>
        <span className="text-[13px] font-medium">WeekendCrew</span>
      </div>

      <div className="flex flex-col gap-0.5 px-2">
        {NAV.map(({ key, icon, label }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[13px] text-start transition-colors
              ${
                active === key
                  ? "bg-[#EEEDFE] text-[#534AB7] font-medium"
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
          >
            <i className={`ti ${icon} text-base`} aria-hidden="true" />
            {label(t)}
          </button>
        ))}
      </div>

      <div className="mt-auto px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[10px] font-medium text-[#534AB7] shrink-0">
          {user.initials}
        </div>
        <div>
          <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
            {user.name}
          </p>
          <p className="text-[11px] text-zinc-500">{t.navActiveMember}</p>
        </div>
      </div>
    </nav>
  );
}
