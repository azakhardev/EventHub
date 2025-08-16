import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { getNotifications } from "../../api/users";
import { useUserStore } from "../../store/store";
import type { Page } from "../../types/page";
import type { Notification } from "../../types/notification";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ErrorAlert from "../ui/alerts/ErrorAlert";
import NotificationCard from "../ui/NotificationCard";
import Tooltip from "../ui/Tooltip";
import { queryClient } from "../../main";
import { notificationsCount } from "../../api/notifications";
import { BounceLoader } from "../ui/loaders/BounceLoader";

export default function NotificationsButton() {
  const { token, userId } = useUserStore();
  const [opened, setIsOpened] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0 });
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notificationsQuery = useInfiniteQuery<Page<Notification>>({
    queryKey: ["notifications"],
    queryFn: async ({ pageParam = 1 }) =>
      getNotifications(userId, token, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.page < lastPage.pageInfo.totalPages
        ? lastPage.pageInfo.page + 1
        : undefined,
    enabled: opened,
  });

  const notificationsCountQuery = useQuery<number>({
    queryKey: ["notifications-count"],
    queryFn: () => notificationsCount(token, userId),
  });

  async function handleOnBellClick() {
    setIsOpened(true);
  }

  useEffect(() => {
    if (
      notificationsQuery.hasNextPage &&
      inView &&
      !notificationsQuery.isFetchingNextPage
    ) {
      notificationsQuery.fetchNextPage();
    }
  }, [
    notificationsQuery.hasNextPage,
    inView,
    notificationsQuery.isFetchingNextPage,
  ]);

  return (
    <>
      <Tooltip text="Notifications">
        <div
          className="rounded-full bg-primary p-2 cursor-pointer hover:bg-button-hover"
          onClick={handleOnBellClick}
        >
          <Bell size={28} className="text-onSurface" />
          {notificationsCountQuery.isSuccess &&
            notificationsCountQuery.data !== 0 && (
              <div className="absolute bg-red-600 rounded-full w-5 h-5 top-0 right-[-5px] flex items-center justify-center text-white">
                {notificationsCountQuery.data > 99
                  ? "99+"
                  : notificationsCountQuery.data}
              </div>
            )}
        </div>
      </Tooltip>
      {opened && (
        <div
          ref={notificationsRef}
          className="absolute top-[90px] right-[28px] flex flex-col z-50 bg-dialog py-4 px-2 rounded-md border-2 border-primary h-[35vh] overflow-y-scroll scrollbar-hide"
        >
          {notificationsQuery.isSuccess &&
            notificationsQuery.data.pages
              .flatMap((p) => p.data)
              .map((n) => <NotificationCard key={n.id} notification={n} />)}
          {notificationsQuery.isSuccess &&
            notificationsQuery.data.pages.flatMap((p) => p.data).length ===
              0 && (
              <div className="w-full text-bold text-center py-2">
                You don't have any notifications yet.
              </div>
            )}
          {notificationsQuery.isError && (
            <ErrorAlert error={notificationsQuery.error.message} />
          )}
          {notificationsQuery.isFetching && <BounceLoader />}
          <div ref={ref} className="h-4"></div>
        </div>
      )}
    </>
  );
}
