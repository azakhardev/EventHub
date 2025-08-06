import type { User } from "./user.tsx";

export type Event = {
  id: number;
  title: string;
  body: string;
  owner: User;
  creationDate: string;
  startTime: string;
  endTime: string;
  place: string;
  category: string;
  color: string;
  public: boolean;
  linkToken: string;
  recurrence: EventRecurrence;
  recurrenceEndDate?: string;
  important?: boolean;
};

export const EventRecurrence = {
  DAILY: "daily",
  WEEKLY: "weekly",
  BI_WEEKLY: "biweekly",
  MONTHLY: "monthly",
  QUARTERLY: "quarterly",
  YEARLY: "yearly",
} as const;

export type EventRecurrence =
  (typeof EventRecurrence)[keyof typeof EventRecurrence];
