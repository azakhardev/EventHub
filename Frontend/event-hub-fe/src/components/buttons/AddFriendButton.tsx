import { CirclePlus, Plus, Search, UserPlus } from "lucide-react";
import Dialog from "../ui/dialogs/Dialog";
import { useRef, useState } from "react";
import Input from "../ui/forms/Input";
import Button from "../ui/forms/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../store/store";
import type { User } from "../../types/user";
import { ToastContainer, toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";
import { apiRequest, api } from "../../utils/api";

export default function AddFriendButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { userId, token } = useUserStore();
  const [search, setSearch] = useState("");

  const tokenInputRef = useRef<HTMLInputElement>(null);

  const addFriendMutation = useMutation({
    mutationFn: async () => {
      return apiRequest(`${api}/users/${userId}/add-friend`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          followToken: tokenInputRef.current?.value,
          followedUserId: selectedUser?.id,
        }),
      });
    },
    onSuccess: () => {
      setSelectedUser(null);
      setIsOpen(false);
      toast.success("Friend added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    },
    onError: (error) => {
      toast.error("Failed to add friend: " + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    },
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery<User[]>({
    queryKey: ["search-users", search],
    queryFn: async () => {
      return apiRequest(`${api}/users/by-name/${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    enabled: isOpen && !!search,
  });

  return (
    <>
      <div
        className="rounded-full bg-primary p-2 cursor-pointer hover:bg-button-hover"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <UserPlus size={28} className="text-onSurface" />
      </div>
      <Dialog
        title="Add Friend"
        description="Find a user and use his link token to add him as a friend"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttons={
          <Button
            disabled={!selectedUser}
            onClick={() => {
              addFriendMutation.mutate();
            }}
          >
            <CirclePlus size={24} />
          </Button>
        }
      >
        {!selectedUser && (
          <div className="w-full my-2 flex flex-col items-center justify-center">
            <Input
              placeholder="Enter user's username"
              icon={<Search size={24} />}
              className="w-2/3"
              onChange={(e) => setSearch(e.target.value)}
            />
            {isLoadingUsers ? (
              <SyncLoader />
            ) : (
              users?.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className="cursor-pointer"
                >
                  {user.username}
                </div>
              ))
            )}
          </div>
        )}
        {selectedUser && (
          <Input
            placeholder="Enter friend's link token"
            icon={<Plus size={24} />}
            className="w-full my-2"
            ref={tokenInputRef}
          />
        )}
      </Dialog>
      <ToastContainer />
    </>
  );
}
