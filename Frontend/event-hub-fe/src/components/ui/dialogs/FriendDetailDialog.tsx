import Dialog from "./Dialog";
import type { User } from "../../../types/user";
import Description from "../Description";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getForeignEvents } from "../../../api/events";
import { useUserStore } from "../../../store/store";
import type { Page } from "../../../types/page";
import type { Event } from "../../../types/event";
import { BounceLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import EmptyArray from "../alerts/EmptyArray";
import EventCard from "../EventCard";
import EventDialog from "./EventDialog";

interface FriendDetailDialogProps {
  friend?: User;
  setFriend: (friend: User | undefined) => void;
}

export default function FriendDetailDialog({
  friend,
  setFriend,
}: FriendDetailDialogProps) {
  const { token, userId } = useUserStore();
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: false });

  const [event, setEvent] = useState<Event | null>(null);

  const foreignEventsQuery = useInfiniteQuery<Page<Event>>({
    queryKey: ["events", "foreign-events", friend?.id],
    queryFn: ({ pageParam = 1 }) =>
      getForeignEvents(token, friend?.id ?? 0, pageParam as number, userId),
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.page < lastPage.pageInfo.totalPages
        ? lastPage.pageInfo.page + 1
        : undefined,
    initialPageParam: 1,
    enabled: !!token && !!friend?.id,
  });

  useEffect(() => {
    if (
      inView &&
      foreignEventsQuery.hasNextPage &&
      !foreignEventsQuery.isFetchingNextPage
    ) {
      foreignEventsQuery.fetchNextPage();
    }
  }, [
    inView,
    foreignEventsQuery.hasNextPage,
    foreignEventsQuery.isFetchingNextPage,
    foreignEventsQuery.fetchNextPage,
  ]);

  return (
    <Dialog
      title="Friend Detail"
      description="Detail information about a friend"
      isOpen={!!friend}
      setIsOpen={() => setFriend(undefined)}
      width="w-2/3"
    >
      {friend && (
        <div className="flex flex-row gap-2 h-[85%]">
          <div className="flex flex-col gap-2 px-12 mt-4 flex-[3] justify-center">
            <div className="flex flex-row gap-2 w-full">
              <div className="flex-[2] flex flex-col items-center justify-center">
                <div className="flex-1 w-36 h-36 flex items-center justify-center">
                  <img
                    src={
                      friend.profilePictureUrl ??
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="profile_picture"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex-[3] flex flex-col justify-center gap-1">
                <h4>
                  Username:{" "}
                  <span className="font-normal">{friend.username}</span>
                </h4>
                <h4>
                  Displayed:{" "}
                  <span className="font-normal">{friend.nickname}</span>
                </h4>
                <h4>
                  Email: <span className="font-normal">{friend.email}</span>
                </h4>
                <h4>
                  Proffesion:{" "}
                  <span className="font-normal">{friend.proffesion}</span>
                </h4>
              </div>
            </div>
            <div className="mt-2">
              <Description text={friend.about ?? ""} />
            </div>
          </div>
          <div className="flex-[2] flex flex-col gap-4 ">
            <h3 className="text-center">Participates in:</h3>
            <div className="flex flex-col gap-2 max-h-[28vh] overflow-y-scroll scrollbar-hide">
              {!foreignEventsQuery.isFetchingNextPage &&
                foreignEventsQuery.data?.pages
                  .flatMap((page) => page.data)
                  .map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => setEvent(event)}
                      className="min-h-[150px]"
                    />
                  ))}
              <div className="h-4" ref={ref}></div>
              {foreignEventsQuery.isFetchingNextPage && <BounceLoader />}
              {!foreignEventsQuery.isFetchingNextPage &&
                foreignEventsQuery.data?.pages.flatMap((page) => page.data)
                  .length === 0 && <EmptyArray />}
            </div>
          </div>
        </div>
      )}
      <EventDialog isOpen={!!event} setEvent={setEvent} event={event} />
    </Dialog>
  );
}
