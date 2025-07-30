import { useQuery } from "@tanstack/react-query";
import Button from "../ui/forms/Button";
import Line from "../ui/Line";
import { useUserStore } from "../../store/store";
import EventCard from "../ui/EventCard";
import type { Event } from "../../types/event.tsx";
import { SyncLoader } from "../ui/loaders/SyncLoader.tsx";
import EmptyArray from "../ui/alerts/EmptyArray.tsx";
import { useState } from "react";
import EventDialog from "../ui/dialogs/EventDialog.tsx";

const api = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const { token, userId } = useUserStore();

  const [event, setEvent] = useState<Event | null>(null);

  console.log(event);

  const { data, isLoading, error } = useQuery<Event[]>({
    queryKey: ["events", userId],
    queryFn: () =>
      fetch(`${api}/users/${userId}/my-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    enabled: !!token && !!userId,
  });

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-text-on-light">Upcoming Events</h3>
        <div className="flex flex-row items-center gap-2">
          <Button>Add Event</Button>
        </div>
      </div>
      <Line />
      {isLoading && <SyncLoader />}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div className="flex flex-col gap-2">
          {data.map((event) => (
            <EventCard
              event={event}
              key={event.id}
              onClick={() => setEvent(event)}
            />
          ))}
        </div>
      )}
      {data && data.length === 0 && <EmptyArray />}
      <EventDialog isOpen={event !== null} setEvent={setEvent} event={event} />
    </div>
  );
}
