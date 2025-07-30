import FriendCard from "../ui/FriendCard";
import { usePageStore, useUserStore } from "../../store/store";
import { Bell, Search, UserPlus } from "lucide-react";
import Input from "../ui/forms/Input";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../../types/user.tsx";

const api = import.meta.env.VITE_API_URL;

export default function FriendList() {
  const { selectedPage } = usePageStore();
  const { token, userId } = useUserStore();

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["friends", userId],
    queryFn: () =>
      fetch(`${api}/users/${userId}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    enabled: !!token && !!userId,
  });

  return (
    <>
      {selectedPage !== "friends" && (
        <div className="flex flex-col gap-2 items-center mt-6 border-l-2 max-h-[100vh]">
          <div className="flex flex-row items-center justify-between w-full pr-2 pl-4">
            <h3>Friends</h3>
            <div className="flex flex-row gap-2">
              <div className="rounded-full bg-primary p-2 cursor-pointer hover:bg-button-hover">
                <UserPlus size={28} className="text-onSurface" />
              </div>
              <div className="rounded-full bg-primary p-2 cursor-pointer hover:bg-button-hover">
                <Bell size={28} className="text-onSurface" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 px-4 my-2">
            <Input
              placeholder="Search for a friend"
              icon={<Search size={24} />}
            />
          </div>

          <div className="flex flex-col gap-2">
            {isSuccess &&
              data.map((user: User) => (
                <FriendCard key={user.id} user={user} />
              ))}
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
          </div>
        </div>
      )}
    </>
  );
}
