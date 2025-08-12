import UserCard from "../ui/UeserCard.tsx";
import { usePageStore, useUserStore } from "../../store/store";
import { Search } from "lucide-react";
import Input from "../ui/forms/Input";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { User } from "../../types/user.tsx";
import { SyncLoader } from "../ui/loaders/SyncLoader.tsx";
import EmptyArray from "../ui/alerts/EmptyArray.tsx";
import { useEffect, useRef, useState } from "react";
import ErrorAlert from "../ui/alerts/ErrorAlert.tsx";
import NotificationsButton from "../buttons/NotificationsButton.tsx";
import AddFriendButton from "../buttons/AddFriendButton.tsx";
import type { Page } from "../../types/page.ts";
import { useInView } from "react-intersection-observer";
import { getFriends } from "../../api/users.ts";
import FriendDetailDialog from "../ui/dialogs/FriendDetailDialog.tsx";
import Tooltip from "../ui/Tooltip.tsx";

export default function FriendsListSection() {
  const { selectedPage } = usePageStore();
  const { token, userId } = useUserStore();
  const [expression, setExpression] = useState("");
  const [friend, setFriend] = useState<User | undefined>(undefined);

  const searchRef = useRef<HTMLInputElement>(null);
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isSuccess,
    error,
  } = useInfiniteQuery<Page<User>>({
    queryKey: ["friends", userId, expression],
    queryFn: ({ pageParam = 1 }) =>
      getFriends(userId, token, expression, pageParam as number),
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.page < lastPage.pageInfo.totalPages
        ? lastPage.pageInfo.page + 1
        : undefined,
    initialPageParam: 1,
    enabled: !!token && !!userId,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <>
      {selectedPage !== "friends" && (
        <div className="flex flex-col gap-2 items-center border-l-2 max-h-[100vh] overflow-y-scroll scrollbar-hide">
          <div className="flex flex-row items-center justify-between w-full pr-2 px-4 mt-10">
            <h3 className="text-text-on-light">Friends</h3>
            <div className="flex flex-row gap-2">
              <Tooltip text="Add friend">
                <AddFriendButton />
              </Tooltip>
              <Tooltip text="Notifications">
                <NotificationsButton />
              </Tooltip>
            </div>
          </div>
          <div className="w-full px-1 lg:w-2/3 lg:px-4 my-2">
            <Input
              placeholder="Search for a friend"
              icon={<Search size={24} />}
              ref={searchRef}
              onChange={() => {
                setExpression(searchRef.current?.value ?? "");
              }}
            />
          </div>

          <div className="flex flex-col gap-4 w-full px-4">
            <>
              {isSuccess &&
                data?.pages
                  .flatMap((page) => page.data)
                  .sort((a: User, b: User) => {
                    if (a.pinned === b.pinned) return 0;
                    return a.pinned ? -1 : 1;
                  })
                  .map((user: User) => (
                    <UserCard
                      type="following"
                      key={user.id}
                      user={user}
                      onClick={() => setFriend(user)}
                    />
                  ))}
              <div ref={ref}></div>
            </>
            {isFetching && (
              <div className="mb-2">
                <SyncLoader />
              </div>
            )}
            {error && <ErrorAlert error={error.message} />}
            {data?.pages.flatMap((page) => page.data).length === 0 && (
              <EmptyArray />
            )}
          </div>
        </div>
      )}
      <FriendDetailDialog friend={friend} setFriend={setFriend} />
    </>
  );
}
