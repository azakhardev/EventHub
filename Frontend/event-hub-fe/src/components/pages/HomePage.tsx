import { useQuery } from "@tanstack/react-query";
import EventFormDialog from "../ui/dialogs/EventFormDialog.tsx";
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
import CreateEventButton from "../buttons/CreateEventButton.tsx";

const api = import.meta.env.VITE_API_URL;

export default function HomePage() {
  const { token, userId } = useUserStore();

  const [viewedEvent, setViewedEvent] = useState<Event | null>(null);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);

  const upcomingEventsQuery = useQuery<Page<Event>>({
    queryKey: ["events", "upcoming", userId],
    queryFn: () =>
      fetch(
        `${api}/users/${userId}/my-events?page=1&pageSize=100&from=${new Date().toISOString()}&to=${new Date(
          new Date().setDate(new Date().getDate() + 7)
        ).toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json()),
    enabled: !!token && !!userId,
    staleTime: 0,
    refetchOnMount: true,
  });

  const importantEventsQuery = useQuery<Page<Event>>({
    queryKey: ["events", "important", userId],
    queryFn: () =>
      fetch(
        `${api}/users/${userId}/my-events?page=1&pageSize=5&important=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json()),
    enabled: !!token && !!userId,
    staleTime: 0,
    refetchOnMount: true,
  });

  const ownEventsQuery = useQuery<Page<Event>>({
    queryKey: ["events", "own", userId],
    queryFn: () =>
      fetch(`${api}/users/${userId}/my-events?page=1&pageSize=5&owned=true`, {
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
    <div className="flex flex-col w-full py-4">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-text-on-light">Upcoming Events</h3>
        <CreateEventButton />
      </div>
      <Line />
      {upcomingEventsQuery.isLoading && <SyncLoader />}
      {upcomingEventsQuery.error && (
        <ErrorAlert error={upcomingEventsQuery.error.message} />
      )}
      {upcomingEventsQuery.data && (
        <div className="flex flex-col gap-2">
          {upcomingEventsQuery.data.data.map((event) => (
            <EventListCard
              event={event}
              key={event.id}
              onClick={() => setViewedEvent(event)}
              onEditClick={setEditedEvent}
            />
          ))}
        </div>
      )}
      {upcomingEventsQuery.data &&
        upcomingEventsQuery.data.pageInfo.totalElements === 0 && (
          <EmptyArray
            align="left"
            message="You don't have any events this week"
          />
        )}
      <h3 className="text-text-on-light mt-4">ImportantEvents</h3>
      <Line />
      {importantEventsQuery.isLoading && <SyncLoader />}
      {importantEventsQuery.error && (
        <ErrorAlert error={importantEventsQuery.error.message} />
      )}
      {importantEventsQuery.data && (
        <div className="flex flex-col gap-2">
          {importantEventsQuery.data.data.map((event) => (
            <EventListCard
              event={event}
              key={event.id}
              onClick={() => setViewedEvent(event)}
              onEditClick={setEditedEvent}
            />
          ))}
        </div>
      )}
      {importantEventsQuery.data &&
        importantEventsQuery.data.pageInfo.totalElements === 0 && (
          <EmptyArray
            align="left"
            message="You don't have any important events yet"
          />
        )}
      <h3 className="text-text-on-light mt-4">My Events</h3>
      <Line />
      {ownEventsQuery.isLoading && <SyncLoader />}
      {ownEventsQuery.error && (
        <ErrorAlert error={ownEventsQuery.error.message} />
      )}
      {ownEventsQuery.data && (
        <div className="flex flex-col gap-2">
          {ownEventsQuery.data.data.map((event) => (
            <EventListCard
              event={event}
              key={event.id}
              onClick={() => setViewedEvent(event)}
              onEditClick={setEditedEvent}
            />
          ))}
        </div>
      )}
      {ownEventsQuery.data &&
        ownEventsQuery.data.pageInfo.totalElements === 0 && (
          <EmptyArray align="left" message="Create your first event" />
        )}
      <EventDialog
        isOpen={viewedEvent !== null}
        setEvent={setViewedEvent}
        event={viewedEvent}
      />
      <EventFormDialog
        event={editedEvent}
        isOpen={editedEvent != null}
        setIsOpened={() => setEditedEvent(null)}
        submitMethod="PUT"
      />
    </div>
  );
}
