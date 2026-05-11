import { useLang } from "../../i18n/useLang";
import { TripRow } from "./TripRow";
import type { Trip } from "../../types/trip.types";

interface Props {
  trips: Trip[];
  onTripClick: (id: string) => void;
}

export function TripList({ trips, onTripClick }: Props) {
  const { t } = useLang();

  const upcoming = trips.filter((trip) => trip.status !== "done");
  const past = trips.filter((trip) => trip.status === "done");

  return (
    <div className="flex flex-col gap-3">
      {upcoming.length > 0 && (
        <section className="flex flex-col gap-2">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">
            {t.tripsUpcoming}
          </p>
          {upcoming.map((trip) => (
            <TripRow
              key={trip.id}
              trip={trip}
              onClick={() => onTripClick(trip.id)}
            />
          ))}
        </section>
      )}

      {past.length > 0 && (
        <section className="flex flex-col gap-2 mt-1">
          <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">
            {t.tripsPast}
          </p>
          {past.map((trip) => (
            <TripRow
              key={trip.id}
              trip={trip}
              onClick={() => onTripClick(trip.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
}
