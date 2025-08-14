import type { Event } from "./event";

export type Notification = {
  id: number;
  evnet: Event;
  type: string;
  message: string;
  isRead: boolean;
  timestamp: string;
};
