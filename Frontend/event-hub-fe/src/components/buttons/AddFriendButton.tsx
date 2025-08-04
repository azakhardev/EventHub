import { CirclePlus, Plus, Search, UserPlus } from "lucide-react";
import Dialog from "../ui/dialogs/Dialog";
import { useEffect, useRef, useState } from "react";
import Input from "../ui/forms/Input";
import Button from "../ui/forms/Button";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../store/store";
import type { User } from "../../types/user";
import { ToastContainer, toast } from "react-toastify";
import { SyncLoader } from "../ui/loaders/SyncLoader";
import { api } from "../../utils/api";
import { addFriend } from "../../api/users";
import EmptyArray from "../ui/alerts/EmptyArray";
import type { Page } from "../../types/page";
import { useInView } from "react-intersection-observer";

export default function AddFriendButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { userId, token } = useUserStore();
  const [search, setSearch] = useState("");
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

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
      toast.error("Failed : " + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    },
  });

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading: isLoadingUsers,
  } = useInfiniteQuery<Page<User>>({
    queryKey: ["search-users", search],
    queryFn: ({ pageParam = 1 }) =>
      fetch(
        `${api}/users/by-name?name=${search}&page=${pageParam}&pageSize=5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json()),
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.page < lastPage.pageInfo.totalPages
        ? lastPage.pageInfo.page + 1
        : undefined,
    initialPageParam: 1,
    enabled: isOpen && !!search,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

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
        height="h-auto"
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
              <div className="flex w-full flex-col items-center gap-2 mt-4">
                {(data?.pages.flatMap((page) => page.data).length ?? 0) > 0 && (
                  <div className="flex flex-col w-2/3 items-center border-2 border-black rounded-md p-2 gap-2 overflow-y-scroll scrollbar-hide max-h-[20vh]">
                    {data?.pages
                      .flatMap((page) => page.data)
                      .map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-start gap-2 w-full p-2 bg-primary-light rounded-md cursor-pointer hover:scale-[1.01]"
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
                    {hasNextPage && <div ref={ref}></div>}
                  </div>
                )}
              </div>
            )}
            {data?.pages.flatMap((page) => page.data).length === 0 && (
              <EmptyArray />
            )}
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
