import { useQuery } from "@tanstack/react-query";
import { getUpcomingEvents } from "../../api/events";
import type { Event } from "../../types/event";
import { useUserStore } from "../../store/store";
import { useEffect } from "react";
import type { Interval, Reminder } from "../../types/helpers";
import { useState } from "react";
import ReminderContainer from "../ui/ReminderContainer";

export default function ReminderProvider() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | []>([]);
  const { token, userId } = useUserStore();

  const [remindAbout, setRemindAbout] = useState<string[]>([]);

  const [storedReminders, setStoredReminders] = useState<Reminder[]>(
    JSON.parse(localStorage.getItem("reminders") ?? "[]")
  );

  const intervals: Interval[] = JSON.parse(
    localStorage.getItem("reminders-interval") ?? "[]"
  );

  useEffect(() => {
    const sortedIntervals = intervals.sort((a, b) => a.id - b.id);

    const intervalId = setInterval(() => {
      setStoredReminders((prevReminders) => {
        const now = new Date();
        const updatedReminders = prevReminders.map((reminder) => {
          let remindMsg: string | null = null;

          sortedIntervals.forEach((interval) => {
            const start = new Date(reminder.startTime);
            const remindBefore = new Date(start.getTime() - interval.interval);

            if (
              remindBefore <= now &&
              remindBefore > new Date(reminder.lastTriggered) &&
              start > now
            ) {
              const event = upcomingEvents.find(
                (e) => e.id! === reminder.eventId
              );
              if (event) {
                remindMsg = `Upcoming event: ${event.title} in less than ${interval.value}`;
                reminder.lastTriggered = now;
              }
            }
          });

          if (remindMsg) {
            setRemindAbout((old) => [...old, remindMsg!]);
          }

          return reminder;
        });

        localStorage.setItem("reminders", JSON.stringify(updatedReminders));
        return updatedReminders;
      });
    }, 1000 * 60);

    return () => clearInterval(intervalId);
  }, [intervals, upcomingEvents]);

  const { isSuccess, data } = useQuery<Event[]>({
    queryKey: ["events", "upcoming"],
    queryFn: async () => await getUpcomingEvents(token, userId),
    refetchInterval: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setUpcomingEvents(data);

      const now = new Date(0);
      const newReminders = data
        .filter((d) => !storedReminders.some((r) => r.eventId === d.id))
        .map((d) => ({
          eventId: d.id!,
          startTime: new Date(d.startTime),
          lastTriggered: now,
        }));

      const stillValidReminders = storedReminders.filter((r) =>
        data.some((d) => d.id === r.eventId)
      );

      const updatedReminders = [...stillValidReminders, ...newReminders];

      setStoredReminders(updatedReminders);
      localStorage.setItem("reminders", JSON.stringify(updatedReminders));
    }
  }, [data, isSuccess]);

  return (
    remindAbout.length !== 0 && (
      <ReminderContainer
        reminders={remindAbout}
        onRemove={(i) =>
          setRemindAbout((old) => old.filter((_, index) => index !== i))
        }
      />
    )
  );
}
