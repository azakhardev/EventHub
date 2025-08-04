import { useQuery } from "@tanstack/react-query";
import Button from "../ui/forms/Button";
import Line from "../ui/Line";
import { useUserStore } from "../../store/store";
import EventListCard from "../ui/EventListCard.tsx";
import type { Event } from "../../types/event.tsx";
import { SyncLoader } from "../ui/loaders/SyncLoader.tsx";
import EmptyArray from "../ui/alerts/EmptyArray.tsx";
import { useState } from "react";
import EventDialog from "../ui/dialogs/EventDialog.tsx";
import ErrorAlert from "../ui/alerts/ErrorAlert.tsx";
import type { Page } from "../../types/page.ts";

const api = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const { token, userId } = useUserStore();

  const [event, setEvent] = useState<Event | null>(null);

  console.log(event);

  const { data, isLoading, error } = useQuery<Page<Event>>({
    queryKey: ["events", userId],
    queryFn: () =>
      fetch(`${api}/users/${userId}/my-events?page=1&pageSize=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    enabled: !!token && !!userId,
    staleTime: 0,
    refetchOnMount: true,
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
      {error && <ErrorAlert error={error.message} />}
      {data && (
        <div className="flex flex-col gap-2">
          {data.data.map((event) => (
            <EventListCard
              event={event}
              key={event.id}
              onClick={() => setEvent(event)}
            />
          ))}
        </div>
      )}
      {data && data.pageInfo.totalElements === 0 && <EmptyArray />}
      <EventDialog isOpen={event !== null} setEvent={setEvent} event={event} />
    </div>
  );
}
