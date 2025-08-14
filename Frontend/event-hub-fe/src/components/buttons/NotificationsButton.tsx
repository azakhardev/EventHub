import { useInfiniteQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { getNotifications } from "../../api/users";
import { useUserStore } from "../../store/store";
import type { Page } from "../../types/page";
import type { Notification } from "../../types/notification";
import { useState } from "react";

export default function NotificationsButton() {
  const { token, userId } = useUserStore();
  const [opened, setIsOpened] = useState(false);

  useInfiniteQuery<Page<Notification>>({
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

  return (
    <div
      className="rounded-full bg-primary p-2 cursor-pointer hover:bg-button-hover"
      onClick={() => setIsOpened(true)}
    >
      <Bell size={28} className="text-onSurface" />
    </div>
  );
}
