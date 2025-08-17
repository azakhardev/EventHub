export type SELECTED_PAGE = "home" | "calendar" | "friends";

export type THEME = "blue" | "purple" | "black" | "green";

export type Interval = {
  id: number;
  value: string;
  interval: number;
};

export type LoginResponse = {
  token: string;
  userId: number;
};

export type Reminder = {
  eventId: number;
  lastTriggered: Date;
  startTime: Date;
};
