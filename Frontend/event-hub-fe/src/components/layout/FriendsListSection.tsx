import FriendCard from "../ui/FriendCard";
import { usePageStore, useUserStore } from "../../store/store";
import { Bell, Search, UserPlus } from "lucide-react";
import Input from "../ui/forms/Input";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../../types/user.tsx";
import { SyncLoader } from "../ui/loaders/SyncLoader.tsx";
import EmptyArray from "../ui/alerts/EmptyArray.tsx";
import { useRef, useState } from "react";
import ErrorAlert from "../ui/alerts/ErrorAlert.tsx";
import NotificationsButton from "../buttons/NotificationsButton.tsx";
import AddFriendButton from "../buttons/AddFriendButton.tsx";

const api = import.meta.env.VITE_API_URL;

export default function FriendsListSection() {
  const { selectedPage } = usePageStore();
  const { token, userId } = useUserStore();
  const [expression, setExpression] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["friends", userId, expression],
    queryFn: () =>
      fetch(`${api}/users/${userId}/following?expression=${expression}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    enabled: !!token && !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <>
      {selectedPage !== "friends" && (
        <div className="flex flex-col gap-2 items-center mt-6 border-l-2 max-h-[calc(100vh-1.5rem)] overflow-y-scroll">
          <div className="flex flex-row items-center justify-between w-full pr-2 pl-4">
            <h3 className="text-text-on-light">Friends</h3>
            <div className="flex flex-row gap-2">
              <AddFriendButton />
              <NotificationsButton />
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

          <div className="flex flex-col gap-2">
            {isSuccess &&
              data
                ?.slice()
                .sort((a: User, b: User) => {
                  if (a.pinned === b.pinned) return 0;
                  return a.pinned ? -1 : 1;
                })
                .map((user: User) => <FriendCard key={user.id} user={user} />)}
            {isLoading && <SyncLoader />}
            {error && <ErrorAlert error={error.message} />}
            {data && data.length === 0 && <EmptyArray />}
          </div>
        </div>
      )}
    </>
  );
}
