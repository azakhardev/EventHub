import { useUserStore } from "../../../../store/store";
import { BounceLoader } from "../../loaders/BounceLoader";
import UserCard from "../../UeserCard";
import Description from "../../Description";
import ErrorAlert from "../../alerts/ErrorAlert";
import { SyncLoader } from "../../loaders/SyncLoader";
import { useInView } from "react-intersection-observer";
import EmptyArray from "../../alerts/EmptyArray";
import { useEffect } from "react";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { generateFollowToken, getFollowers } from "../../../../api/users";
import type { Page } from "../../../../types/page";
import type { User } from "../../../../types/user";
import { toast } from "react-toastify";
import { queryClient } from "../../../../main";

import Tooltip from "../../Tooltip";
import { RefreshCcw } from "lucide-react";

interface ProfileViewProps {
  user: User;
  isLoading: boolean;
  error: Error | null;
}

export default function ProfileView({
  user,
  isLoading,
  error,
}: ProfileViewProps) {
  const { token, userId } = useUserStore();

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const followersQuery = useInfiniteQuery<Page<User>>({
    queryKey: ["followers", userId],
    queryFn: async ({ pageParam = 1 }) =>
      getFollowers(userId, token, "", pageParam as number),
    enabled: !!token && !!userId,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.totalPages > lastPage.pageInfo.page
        ? lastPage.pageInfo.page + 1
        : undefined,
    initialPageParam: 1,
  });

  const { mutate: mutateToken } = useMutation({
    mutationFn: () => generateFollowToken(userId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (e) => {
      toast.error("Failed to generate new token: " + e.message);
    },
  });

  useEffect(() => {
    if (
      inView &&
      followersQuery.hasNextPage &&
      !followersQuery.isFetchingNextPage
    ) {
      followersQuery.fetchNextPage();
    }
  }, [inView, followersQuery.hasNextPage, followersQuery.isFetchingNextPage]);

  return (
    <>
      {isLoading && <BounceLoader />}
      {error && <ErrorAlert error={error.message} />}
      {user && (
        <div className="flex flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 px-12 mt-4 flex-[3]">
            <div className="flex flex-row gap-2 w-full">
              <div className="flex-[2] flex flex-col items-center justify-center">
                <div className="flex-1 w-36 h-36 flex items-center justify-center">
                  <img
                    src={
                      user.profilePictureUrl ??
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="profile_picture"
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex-[3] flex flex-col justify-center gap-1">
                <h4>
                  Username: <span className="font-normal">{user.username}</span>
                </h4>
                <h4>
                  Nickname: <span className="font-normal">{user.nickname}</span>
                </h4>
                <h4>
                  Email: <span className="font-normal">{user.email}</span>
                </h4>
                <h4>
                  Proffesion:{" "}
                  <span className="font-normal">{user.proffesion}</span>
                </h4>
              </div>
            </div>
            <div className="mt-2">
              <Description text={user.about ?? ""} />
            </div>
            <div className="flex flex-row gap-2">
              <h4>Your follow token:</h4>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(user.followToken!);
                  alert("Follow token copied to clipboard");
                }}
                className="flex-1 cursor-pointer p-1 bg-white rounded-md border-2 border-transparent hover:border-primary"
              >
                {user.followToken}
              </div>
              <Tooltip text="Generate new token">
                <RefreshCcw
                  className="text-primary hover:scale-110 cursor-pointer"
                  onClick={() => mutateToken()}
                />
              </Tooltip>
            </div>
          </div>
          <div className="flex-[2] flex flex-col gap-4">
            <h3 className="text-center">Your followers</h3>
            <div className="flex flex-col gap-2 max-h-[28vh] overflow-y-scroll scrollbar-hide p-2">
              {followersQuery.isSuccess &&
                followersQuery.data?.pages.map((page) =>
                  page.data.map((user) => (
                    <UserCard key={user.id} user={user} type="follower" />
                  ))
                )}
              {!followersQuery.isFetching &&
                followersQuery.data?.pages.flatMap((page) => page.data)
                  .length === 0 && (
                  <EmptyArray message="You don't have any followers yet" />
                )}
              {followersQuery.isError && (
                <ErrorAlert error={followersQuery.error.message} />
              )}
              {followersQuery.isFetching && <SyncLoader />}
              <div className="min-h-[10px]" ref={ref}></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
