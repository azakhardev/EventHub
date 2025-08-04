import type { User } from "../../types/user.tsx";
import { Star, Trash2 } from "lucide-react";
import { useDeleteStore, useUserStore } from "../../store/store";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main.tsx";
import { pinFriend, removeFollower, removeFriend } from "../../api/users.ts";

interface FriendCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
  type: "follower" | "following";
  onClick?: () => void;
}

export default function FriendCard({
  user,
  type,
  onClick,
  ...props
}: FriendCardProps) {
  const { token, userId } = useUserStore();
  const {
    setIsOpen,
    setOnDelete,
    setDialogQuestion: setDeletedItem,
  } = useDeleteStore();

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
  });

  const { mutate: removeFollowerMutation } = useMutation({
    mutationFn: () => removeFollower(userId, token, user.id),
  });

  const onDelete = async () => {
    return new Promise<void>((resolve, reject) => {
      if (type === "following") {
        removeFriendMutation(undefined, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["friends"],
              exact: false,
            });
            resolve();
          },
          onError: (error) => {
            console.error("Failed to remove friend:", error);
            reject(error);
          },
        });
      } else {
        removeFollowerMutation(undefined, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["followers"],
              exact: false,
            });
            resolve();
          },
          onError: (error) => {
            console.error("Failed to remove follower:", error);
            reject(error);
          },
        });
      }
    });
  };

  return (
    <div
      className="w-full flex flex-row items-center justify-between gap-2"
      {...props}
    >
      <div
        className="flex-1 flex flex-row items-center gap-2 cursor-pointer group"
        onClick={onClick}
      >
        <div className="group-hover:scale-[1.1]">
          <img
            src={user.profilePictureUrl}
            alt={user.nickname}
            className="w-14 h-14 rounded-full"
          />
        </div>
        <div className="flex flex-col group-hover:text-highlight">
          <div className="font-bold font-[20px]">{user.nickname}</div>
          <div className="text-[16px] font-bold text-text-muted">
            {user.proffesion}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        {type === "following" && (
          <Star
            onClick={handlePinFriend}
            fill={user.pinned ? "yellow" : "none"}
            stroke={user.pinned ? "gray" : "black"}
            size={28}
            className="cursor-pointer hover:text-yellow-500"
          />
        )}
        <Trash2
          onClick={() => {
            setIsOpen(true);
            setOnDelete(onDelete);
            setDeletedItem(
              "Are you sure you want to remove friend " + user.nickname + "?"
            );
          }}
          size={28}
          className="cursor-pointer hover:text-red-500"
        />
      </div>
    </div>
  );
}
