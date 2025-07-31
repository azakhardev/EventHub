import type { User } from "../../types/user.tsx";
import { Star } from "lucide-react";
import { useUserStore } from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main.tsx";
import { pinFriend } from "../../api/friends.ts";

const api = import.meta.env.VITE_API_URL;

interface FriendCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

export default function FriendCard({ user, ...props }: FriendCardProps) {
  const { token, userId } = useUserStore();

  const { mutate } = useMutation<User>({
    mutationFn: () => pinFriend(user.id, !user.pinned, userId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  function handlePinFriend() {
    mutate();
  }

  return (
    <div
      className="w-full flex flex-row items-center justify-between gap-2"
      {...props}
    >
      <div className="flex flex-row items-center gap-2">
        <div>
          <img
            src={user.profilePictureUrl}
            alt={user.username}
            className="w-14 h-14 rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-bold font-[20px]">{user.username}</div>
          <div className="text-[16px] font-bold text-text-muted">
            {user.proffesion}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Star
          onClick={handlePinFriend}
          fill={user.pinned ? "yellow" : "none"}
          stroke={user.pinned ? "gray" : "black"}
          size={32}
          className="cursor-pointer hover:text-yellow-500"
        />
      </div>
    </div>
  );
}
