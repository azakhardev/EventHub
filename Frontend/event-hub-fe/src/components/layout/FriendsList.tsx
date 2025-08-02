import { useQuery } from "@tanstack/react-query";
import Input from "../ui/forms/Input";
import { Search } from "lucide-react";
import { useRef } from "react";
import { useUserStore } from "../../store/store";
import { useState } from "react";
import type { User } from "../../types/user";
import FriendCard from "../ui/FriendCard";
import { SyncLoader } from "../ui/loaders/SyncLoader";
import EmptyArray from "../ui/alerts/EmptyArray";
import type { Page } from "../../types/page";

const api = import.meta.env.VITE_API_URL;

export default function FriendsList() {
  const { token, userId } = useUserStore();

  const [expression, setExpression] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, error, isSuccess } = useQuery<Page<User>>({
    queryKey: ["friends", userId, expression],
    queryFn: () =>
      fetch(`${api}/users/${userId}/following?expression=${expression}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    enabled: !!token && !!userId,
  });
  return (
    <>
      <h1>THIS IS FRIEND LIST COMPONENT</h1>
      <div className="w-full md:w-2/3 md:px-4 my-2">
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
          data.data
            .sort((a, b) => {
              if (a.pinned === b.pinned) return 0;
              return a.pinned ? -1 : 1;
            })
            .map((user: User) => <FriendCard key={user.id} user={user} />)}
        {isLoading && <SyncLoader />}
        {error && <div>Error: {error.message}</div>}
        {data && data.pageInfo.totalElements === 0 && <EmptyArray />}
      </div>
    </>
  );
}
