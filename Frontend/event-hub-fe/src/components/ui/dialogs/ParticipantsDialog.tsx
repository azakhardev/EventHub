import { useMutation, useQuery } from "@tanstack/react-query";
import Dialog from "./Dialog";
import { useUserStore } from "../../../store/store";
import { BounceLoader } from "../loaders/BounceLoader";
import type { User } from "../../../types/user";
import EmptyArray from "../alerts/EmptyArray";
import Input from "../forms/Input";
import { useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { SyncLoader } from "../loaders/SyncLoader";
import Button from "../forms/Button";

const api = import.meta.env.VITE_API_URL;

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
          src={user.profile_picture_url}
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

  const friendsQuery = useQuery({
    queryKey: ["friends", userId, expression],
    queryFn: () =>
      fetch(`${api}/users/${userId}/following?expression=${expression}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    enabled: !!token && !!userId && expression !== "",
    staleTime: 5 * 60 * 1000,
  });

  const participantsQuery = useQuery({
    queryKey: ["participants", eventId],
    queryFn: () =>
      fetch(`${api}/events/${eventId}/participants`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    enabled: !!eventId && !!token && expression === "",
    staleTime: 5 * 60 * 1000,
  });

  const { mutate: inviteFriends } = useMutation({
    mutationFn: () =>
      fetch(`${api}/events/${eventId}/invite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedFriends.map((friend) => friend.id)),
      }).then((res) => res.json()),
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
      <div className="flex flex-col gap-2 w-full px-8 py-4 text-text">
        {participantsQuery.isLoading && <BounceLoader />}
        {participantsQuery.error && (
          <div>Error: {participantsQuery.error.message}</div>
        )}
        {participantsQuery.isSuccess && (
          <>
            <Input
              placeholder="Invite a friend"
              ref={searchRef}
              onChange={() => {
                setExpression(searchRef.current?.value ?? "");
              }}
            />
            {expression === "" && (
              <div className="flex flex-col gap-2">
                {participantsQuery.data.map((participant: User) => (
                  <ParticipantCard
                    key={participant.id}
                    invitable={false}
                    isSelected={false}
                    onClick={() => {}}
                    user={participant}
                  />
                ))}
                {participantsQuery.isSuccess &&
                  participantsQuery.data.length === 0 && <EmptyArray />}
              </div>
            )}
            {expression !== "" && (
              <div className="flex flex-col gap-2">
                {friendsQuery.isSuccess &&
                  friendsQuery.data
                    .filter(
                      (friend: User) =>
                        !participantsQuery.data.some(
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
                {friendsQuery.isLoading && <SyncLoader />}
                {friendsQuery.isSuccess && friendsQuery.data.length === 0 && (
                  <EmptyArray />
                )}
              </div>
            )}
            {selectedFriends.length > 0 && (
              <>
                <hr className="border-text" />
                <div className="flex flex-col gap-2">
                  {selectedFriends.map((friend) => (
                    <ParticipantCard
                      key={friend.id}
                      invitable={true}
                      isSelected={true}
                      onClick={() => handleInvite(friend)}
                      user={friend}
                    />
                  ))}
                </div>
                <Button onClick={() => inviteFriends()}>Invite</Button>
              </>
            )}
          </>
        )}
      </div>
    </Dialog>
  );
}
