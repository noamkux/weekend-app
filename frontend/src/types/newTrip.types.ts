export interface LocationOption {
  id: string;
  name: string;
}

export interface DateOption {
  id: string;
  from: string;
  to: string;
}

export type ActivityCategory =
  | "hiking"
  | "water"
  | "attraction"
  | "party"
  | "other";

export interface ActivityOption {
  category: ActivityCategory;
  customLabel?: string;
}

export interface NewTripForm {
  name: string;
  votingDeadline: string;
  members: string[];
  emailInvites: string[];
  locations: LocationOption[];
  dates: DateOption[];
  activities: ActivityOption[];
}
