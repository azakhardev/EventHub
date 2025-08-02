import type { User } from "../../types/user.tsx";
import { Star, Trash2 } from "lucide-react";
import { useUserStore } from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main.tsx";
import { pinFriend, removeFriend } from "../../api/users.ts";
import { toast, ToastContainer } from "react-toastify";

interface FriendCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

export default function FriendCard({ user, ...props }: FriendCardProps) {
  const { token, userId } = useUserStore();

  const { mutate: pinFriendMutation } = useMutation<User>({
    mutationFn: () => pinFriend(user.id, !user.pinned, userId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  function handlePinFriend() {
    pinFriendMutation();
  }

  const { mutate: removeFriendMutation } = useMutation({
    mutationFn: () => removeFriend(userId, token, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
    onError: (error) => {
      toast.error("Failed to remove friend: " + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    },
  });

  function handleRemoveFriend() {
    removeFriendMutation();
  }

  return (
    <div
      className="w-full flex flex-row items-center justify-between gap-2"
      {...props}
    >
      <div className="flex-1 flex flex-row items-center gap-2">
        <div>
          <img
            src={user.profilePictureUrl}
            alt={user.nickname}
            className="w-14 h-14 rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <div className="font-bold font-[20px]">{user.nickname}</div>
          <div className="text-[16px] font-bold text-text-muted">
            {user.proffesion}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Star
          onClick={handlePinFriend}
          fill={user.pinned ? "yellow" : "none"}
          stroke={user.pinned ? "gray" : "black"}
          size={28}
          className="cursor-pointer hover:text-yellow-500"
        />
        <Trash2
          onClick={handleRemoveFriend}
          size={28}
          className="cursor-pointer hover:text-red-500"
        />
      </div>
      <ToastContainer />
    </div>
  );
}
