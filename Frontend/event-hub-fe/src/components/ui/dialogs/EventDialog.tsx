import Dialog from "./Dialog";
import type { Event } from "../../../types/event";
import Description from "../Description";
import {
  Calendar,
  CirclePlus,
  Clock,
  Eye,
  LockKeyhole,
  MapPin,
  Plus,
  Repeat,
  Share2,
} from "lucide-react";
import Button from "../forms/Button";
import { useRef, useState } from "react";
import ParticipantsDialog from "./ParticipantsDialog";
import Tooltip from "../Tooltip";
import Input from "../forms/Input";
import { useMutation } from "@tanstack/react-query";
import { joinEvent, toggleImportant } from "../../../api/events";
import { useUserStore } from "../../../store/store";
import { toast } from "react-toastify";
import { queryClient } from "../../../main.tsx";

interface EventDialogProps {
  isOpen: boolean;
  setEvent: (event: Event | null) => void;
  event: Event | null;
}

export default function EventDialog({
  isOpen,
  setEvent,
  event,
}: EventDialogProps) {
  const [showParticipants, setShowParticipants] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [important, setImportant] = useState(event?.important);
  const tokenInputRef = useRef<HTMLInputElement>(null);
  const { token, userId } = useUserStore();

  const { mutate: imoprtantMutation } = useMutation({
    mutationFn: async () =>
      await toggleImportant(token, event!.id!, {
        userId,
        important: !important,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("State changed successfuly");
      setImportant((old) => !old);
    },
    onError: (error) => {
      toast.error("Failed to change state: " + error.message);
    },
  });

  const { mutate: joinMutation } = useMutation({
    mutationFn: async () =>
      await joinEvent(token, userId, event!.id!, tokenInputRef?.current?.value),
    onSuccess: () => {
      setShowTokenInput(false);
      setEvent(null);
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Joined successfully");
    },
    onError: (error) => {
      toast.error("Failed to join : " + error.message);
    },
  });

  return (
    <>
      <Dialog
        title={event?.title ?? "Event"}
        description={
          event?.startTime
            ? new Date(event.startTime).toLocaleDateString()
            : "Event details"
        }
        isOpen={isOpen}
        setIsOpen={() => {
          setEvent(null);
          setShowTokenInput(false);
        }}
        upperStrip={
          <div
            className="absolute top-[-2px] left-0 w-full h-2"
            style={{ backgroundColor: event?.color }}
          ></div>
        }
        buttons={
          showTokenInput && (
            <Button
              onClick={() => {
                joinMutation();
              }}
            >
              <CirclePlus size={24} />
            </Button>
          )
        }
        height="h-auto"
      >
        {!showTokenInput && (
          <div className="flex flex-col gap-2 w-full px-8 py-4 text-text">
            {event?.participates || event?.public ? (
              <>
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <Calendar size={32} className="text-primary" />
                    <p>
                      {new Date(event?.startTime ?? "").toLocaleDateString()}
                      {new Date(event?.endTime ?? "").getDate() !==
                        new Date(event?.startTime ?? "").getDate() &&
                        " - " +
                          new Date(event?.endTime ?? "").toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <div className="bg-surface text-onSurface rounded-full px-2 py-1 capitalize">
                      {event?.category}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Clock size={32} className="text-primary" />
                  <p>
                    {new Date(event?.startTime ?? "").toLocaleTimeString()} -{" "}
                    {new Date(event?.endTime ?? "").toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <MapPin size={32} className="text-primary" />
                  <p>{event?.place}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={
                      event?.owner!.profilePictureUrl ??
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    alt="profile_picture"
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="font-bold">{event?.owner!.nickname}</p>
                </div>
                <Description text={event?.body ?? ""} />
                <div className="flex flex-row items-center gap-2 justify-between mx-[5%]">
                  <div className="flex flex-row items-center gap-2">
                    <Eye size={32} className="text-primary" />
                    <p>{event?.public ? "Public" : "Private"}</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <Repeat size={32} className="text-primary" />
                    <p className="capitalize">
                      {event?.recurrence}{" "}
                      {event.recurrence != "once" &&
                        ` - until ${new Date(
                          event.recurrenceEndDate!
                        ).toDateString()}`}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <LockKeyhole size={128} className="text-primary" />
              </div>
            )}
            <div className="flex flex-row items-center justify-end gap-2 mb-2 mt-6 ">
              {(event?.participates || event?.public) && (
                <>
                  {event.participates && (
                    <Button
                      onClick={() => {
                        imoprtantMutation();
                      }}
                    >
                      {important ? "Important" : "Unimportant"}{" "}
                    </Button>
                  )}
                  <Tooltip text="Copy event token">
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(event?.linkToken ?? "");
                        alert("Event token copied to clipboard");
                      }}
                    >
                      <Share2 size={24} />
                    </Button>
                  </Tooltip>
                  <Button onClick={() => setShowParticipants(true)}>
                    Participants
                  </Button>
                </>
              )}
              {!event?.participates && (
                <Button
                  onClick={() => {
                    event?.public ? joinMutation() : setShowTokenInput(true);
                  }}
                >
                  Join
                </Button>
              )}
            </div>
          </div>
        )}
        {showTokenInput && (
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
      <ParticipantsDialog
        isOpen={showParticipants}
        setIsOpen={setShowParticipants}
        eventId={event?.id ?? 0}
      />
    </>
  );
}
