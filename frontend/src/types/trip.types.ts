export type TripStatus =
  | "voting"
  | "planning"
  | "active"
  | "settlement"
  | "archived";

export interface TripMember {
  initials: string;
  bg: string;
  color: string;
}

export interface Trip {
  id: string;
  name: string;
  dates: string;
  emoji: string;
  iconBg: string;
  status: TripStatus;
  daysUntil?: number;
  members: TripMember[];
}
