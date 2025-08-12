import { useInfiniteQuery } from "@tanstack/react-query";
import { useFilterStore, useUserStore } from "../../store/store";
import Filter from "../ui/Filter";
import { getMyEvents } from "../../api/events";
import type { Page } from "../../types/page";
import EventListCard from "../ui/EventListCard";
import type { Event } from "../../types/event";
import { populateWithReccurenceEvents } from "../../types/helpers";
import { SyncLoader } from "../ui/loaders/SyncLoader";
import ErrorAlert from "../ui/alerts/ErrorAlert";
import Line from "../ui/Line";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import EmptyArray from "../ui/alerts/EmptyArray";
import EventDialog from "../ui/dialogs/EventDialog";

export default function CalendarPage() {
  const { token, userId } = useUserStore();
  const { filter } = useFilterStore();
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: false });
  const [event, setEvent] = useState<Event | null>(null);

  const eventsQuery = useInfiniteQuery<Page<Event>>({
    queryKey: ["events", filter],
    queryFn: ({ pageParam = 1 }) =>
      getMyEvents(
        token,
        userId,
        pageParam as number,
        5,
        filter.owned,
        filter.important,
        filter.private,
        filter.from,
        filter.to,
        filter.expression,
        filter.order
      ),
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.page < lastPage.pageInfo.totalPages
        ? lastPage.pageInfo.page + 1
        : undefined,
    initialPageParam: 1,
  });

  const populatedEvents = populateWithReccurenceEvents(
    eventsQuery.data?.pages.flatMap((page) => page.data),
    new Date(filter.from),
    new Date(filter.to)
  );

  useEffect(() => {
    if (inView && eventsQuery.hasNextPage && !eventsQuery.isFetchingNextPage) {
      eventsQuery.fetchNextPage();
    }
  }, [inView, eventsQuery.hasNextPage, eventsQuery.isFetchingNextPage]);

  return (
    <>
      <div className="flex flex-col w-full">
        <Filter />
        <Line />
        <div className="flex flex-col gap-2 mt-4">
          {eventsQuery.isSuccess &&
            populatedEvents.map((event, i) => (
              <EventListCard
                key={`${i}_${event.id}`}
                event={event}
                onClick={() => setEvent(event)}
              />
            ))}
        </div>
        {eventsQuery.isError && (
          <ErrorAlert error={eventsQuery.error.message} />
        )}
        {eventsQuery.isFetching && <SyncLoader />}
        {eventsQuery.isSuccess && populatedEvents.length === 0 && (
          <EmptyArray />
        )}
        <div className="h-6" ref={ref}></div>
      </div>
      <EventDialog event={event} isOpen={event != null} setEvent={setEvent} />
    </>
  );
}
