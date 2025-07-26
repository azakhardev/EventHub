export type Event = {
  id: number;
  title: string;
  body: string;
  owner_id: number;
  creation_date: Date;
  start_time: Date;
  end_time: Date;
  place: string;
  category: string;
  color: string;
  public: boolean;
  link_token: string;
  recurrence: EventRecurrence;
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
