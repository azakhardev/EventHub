import { CirclePlus, Plus, Search, UserPlus } from "lucide-react";
import Dialog from "../ui/dialogs/Dialog";
import { useRef, useState } from "react";
import Input from "../ui/forms/Input";
import Button from "../ui/forms/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../store/store";
import type { User } from "../../types/user";
import { ToastContainer, toast } from "react-toastify";
import { SyncLoader } from "../ui/loaders/SyncLoader";
import { apiRequest, api } from "../../utils/api";
import { addFriend } from "../../api/friends";
import EmptyArray from "../ui/alerts/EmptyArray";

export default function AddFriendButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { userId, token } = useUserStore();
  const [search, setSearch] = useState("");

  const tokenInputRef = useRef<HTMLInputElement>(null);

  const addFriendMutation = useMutation({
    mutationFn: () =>
      addFriend(
        userId,
        token,
        tokenInputRef.current?.value ?? "",
        selectedUser?.id ?? 0
      ),
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
        onClose={() => {
          setSelectedUser(null);
          setSearch("");
          setIsOpen(false);
        }}
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
          <div className="w-full my-2 flex flex-col items-center ">
            <Input
              placeholder="Enter user's username"
              icon={<Search size={24} />}
              className="w-2/3"
              onChange={(e) => setSearch(e.target.value)}
            />
            {isLoadingUsers ? (
              <SyncLoader />
            ) : (
              <div className="flex w-full flex-col items-center gap-2 mt-4 max-h-[20vh] overflow-y-scroll scrollbar-hide">
                <div className="flex flex-col w-full items-center gap-2">
                  {users?.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-start gap-2 w-2/3 p-2 bg-primary-light rounded-md cursor-pointer hover:scale-[1.01]"
                      onClick={() => setSelectedUser(user)}
                    >
                      <img
                        src={user.profilePictureUrl}
                        alt="profile_picture"
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{user.username}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {users?.length === 0 && <EmptyArray />}
          </div>
        )}
        {selectedUser && (
          <Input
            placeholder="Enter friend's link token (36 characters)"
            icon={<Plus size={24} />}
            className="w-full my-2"
            ref={tokenInputRef}
            required={true}
            minLength={36}
            maxLength={36}
            onChange={(e) => {
              if (e.target.value.length > 36) {
                e.target.value = e.target.value.slice(0, 36);
              }
            }}
          />
        )}
      </Dialog>
      <ToastContainer />
    </>
  );
}
