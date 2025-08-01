import { useMutation, useQuery } from "@tanstack/react-query";
import Dialog from "./Dialog";
import { useUserStore } from "../../../store/store";
import { BounceLoader } from "../loaders/BounceLoader";
import type { User } from "../../../types/user";
import EmptyArray from "../alerts/EmptyArray";
import Input from "../forms/Input";
import { useRef, useState } from "react";
import { Plus, Send, X } from "lucide-react";
import { SyncLoader } from "../loaders/SyncLoader";
import Button from "../forms/Button";
import ErrorAlert from "../alerts/ErrorAlert";
import type { Page } from "../../../types/page";
import { getFriends, getParticipants } from "../../../api/users";
import { inviteFriends } from "../../../api/events";

interface ParticipantsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  eventId: number;
}

function ParticipantCard({
  invitable,
  isSelected,
  onClick,
  user,
}: {
  invitable: boolean;
  isSelected: boolean;
  onClick: () => void;
  user: User;
}) {
  return (
    <div className="flex items-center gap-2 p-2 bg-primary-light border rounded justify-between py-2">
      <div className="flex items-center gap-2">
        <img
          src={user.profilePictureUrl}
          alt="profile_picture"
          className="w-8 h-8 rounded-full"
        />
        <span>{user.username}</span>
      </div>

      {invitable && (
        <div>
          {isSelected ? (
            <X
              size={24}
              color="red"
              className="cursor-pointer"
              onClick={onClick}
            />
          ) : (
            <Send
              size={24}
              className="cursor-pointer text-primary"
              onClick={onClick}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default function ParticipantsDialog({
  isOpen,
  setIsOpen,
  eventId,
}: ParticipantsDialogProps) {
  const { token, userId } = useUserStore();

  const [expression, setExpression] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [selectedFriends, setSelectedFriends] = useState<User[]>([]);

  const friendsQuery = useQuery<Page<User>>({
    queryKey: ["friends", userId, expression],
    queryFn: () => getFriends(userId, token, expression),
    enabled: !!token && !!userId && expression !== "",
    staleTime: 5 * 60 * 1000,
  });

  const participantsQuery = useQuery<Page<User>>({
    queryKey: ["participants", eventId],
    queryFn: () => getParticipants(token, eventId),
    enabled: !!eventId && !!token && expression === "",
    staleTime: 5 * 60 * 1000,
  });

  const { mutate: inviteFriendsMutation } = useMutation({
    mutationFn: () => inviteFriends(token, eventId, selectedFriends),
    onSuccess: () => {
      setSelectedFriends([]);
      setExpression("");
      setIsOpen(false);
    },
  });

  function handleInvite(user: User) {
    if (selectedFriends.some((u) => u.id === user.id)) {
      setSelectedFriends(selectedFriends.filter((u) => u !== user));
    } else {
      setSelectedFriends([...selectedFriends, user]);
    }
  }

  return (
    <Dialog
      title="Participants"
      description="Event participants"
      isOpen={isOpen}
      setIsOpen={() => {
        setExpression("");
        setIsOpen(false);
      }}
      width="w-1/4"
    >
      <div className="flex flex-col gap-2 w-full px-8 py-4 text-text max-h-50%">
        <Input
          placeholder="Invite a friend"
          ref={searchRef}
          onChange={() => {
            setExpression(searchRef.current?.value ?? "");
          }}
          icon={<Plus size={24} />}
        />
        <div className="overflow-y-scroll max-h-[18vh] scrollbar-hide">
          {participantsQuery.isLoading && <BounceLoader />}
          {participantsQuery.error && (
            <ErrorAlert error={participantsQuery.error.message} />
          )}
          {participantsQuery.isSuccess && (
            <div>
              {expression === "" && (
                <div className="flex flex-col gap-2">
                  {Array.isArray(participantsQuery.data?.data) &&
                    participantsQuery.data.data.map((participant: User) => (
                      <ParticipantCard
                        key={participant.id}
                        invitable={false}
                        isSelected={false}
                        onClick={() => {}}
                        user={participant}
                      />
                    ))}
                  {participantsQuery.isSuccess &&
                    participantsQuery.data.pageInfo.totalElements === 0 && (
                      <EmptyArray />
                    )}
                </div>
              )}
              {expression !== "" && (
                <div className="flex flex-col gap-2">
                  {friendsQuery.isLoading && <BounceLoader />}
                  {friendsQuery.error && (
                    <ErrorAlert error={friendsQuery.error.message} />
                  )}
                  {friendsQuery.isSuccess &&
                    friendsQuery.data.data
                      .filter(
                        (friend: User) =>
                          !participantsQuery.data.data.some(
                            (participant: User) => participant.id === friend.id
                          )
                      )
                      .map((friend: User) => (
                        <ParticipantCard
                          key={friend.id}
                          invitable={true}
                          isSelected={selectedFriends.some(
                            (selectedFriend: User) =>
                              selectedFriend.id === friend.id
                          )}
                          onClick={() => handleInvite(friend)}
                          user={friend}
                        />
                      ))}
                </div>
              )}
            </div>
          )}
        </div>
        <hr className="border-text" />
        <div className="flex flex-col gap-2 max-h-[10vh] overflow-y-scroll scrollbar-hide">
          {selectedFriends.length > 0 ? (
            selectedFriends.map((friend) => (
              <ParticipantCard
                key={friend.id}
                invitable={true}
                isSelected={true}
                onClick={() => handleInvite(friend)}
                user={friend}
              />
            ))
          ) : (
            <p className="text-text-muted">Select friends to invite</p>
          )}
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => inviteFriendsMutation()}
            disabled={selectedFriends.length === 0}
            className="w-2/3"
          >
            Invite
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
