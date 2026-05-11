import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TripList } from "./TripList";
import { useLang } from "../../i18n/useLang";
import type { Trip } from "../../types/trip.types";
import { NewTripModal } from "./NewTripModal";

const MOCK_USER = { name: "יוסי כהן", initials: "YK" };

const MOCK_TRIPS: Trip[] = [
  {
    id: "1",
    name: "הכרמל",
    dates: "14–15 ביוני 2026",
    emoji: "🌲",
    iconBg: "#E1F5EE",
    status: "active",
    daysUntil: 34,
    members: [
      { initials: "YK", bg: "#EEEDFE", color: "#3C3489" },
      { initials: "RB", bg: "#E1F5EE", color: "#085041" },
      { initials: "AM", bg: "#FAEEDA", color: "#633806" },
    ],
  },
  {
    id: "2",
    name: "חרמון",
    dates: "28–30 ביוני 2026",
    emoji: "🏔️",
    iconBg: "#E6F1FB",
    status: "planning",
    members: [
      { initials: "YK", bg: "#EEEDFE", color: "#3C3489" },
      { initials: "DL", bg: "#FAEEDA", color: "#633806" },
    ],
  },
  {
    id: "3",
    name: "מכתש רמון",
    dates: "2–3 במאי 2026",
    emoji: "🏜️",
    iconBg: "#F1EFE8",
    status: "archived",
    members: [
      { initials: "YK", bg: "#EEEDFE", color: "#3C3489" },
      { initials: "RB", bg: "#E1F5EE", color: "#085041" },
      { initials: "NP", bg: "#FCEBEB", color: "#791F1F" },
      { initials: "AM", bg: "#FAEEDA", color: "#633806" },
    ],
  },
  {
    id: "4",
    name: "חוף דור",
    dates: "18 באפריל 2026",
    emoji: "🌊",
    iconBg: "#FBEAF0",
    status: "archived",
    members: [
      { initials: "YK", bg: "#EEEDFE", color: "#3C3489" },
      { initials: "DL", bg: "#FAEEDA", color: "#633806" },
    ],
  },
];

interface Props {
  onNavigateToSettlement: (
    tripId: string,
    members: { id: string; displayName: string }[],
  ) => void;
}

export function HomePage({ onNavigateToSettlement }: Props) {
  const [activeNav, setActiveNav] = useState("trips");
  const [showModal, setShowModal] = useState(false);
  const { t } = useLang();

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-950">
      <Sidebar active={activeNav} onNavigate={setActiveNav} user={MOCK_USER} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-[18px] py-[11px] flex items-center justify-between shrink-0">
          <h1 className="text-[14px] font-medium">{t.tripsPageTitle}</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#534AB7] text-white rounded-lg text-xs font-medium"
          >
            <i className="ti ti-plus text-sm" aria-hidden="true" />
            {t.tripsNewTrip}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-[18px]">
          <TripList
            trips={MOCK_TRIPS}
            onTripClick={(id: string) =>
              onNavigateToSettlement(id, [
                { id: "mock-1", displayName: "יוסי" },
                { id: "mock-2", displayName: "רוני" },
              ])
            }
          />
        </main>
      </div>

      {showModal && (
        <NewTripModal
          onClose={() => setShowModal(false)}
          onSubmit={(form) => {
            console.log("new trip:", form);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
