import Dialog from "./Dialog";
import type { Event } from "../../../types/event";
import Description from "../Description";
import { Calendar, Clock, Eye, MapPin, Repeat, Share2 } from "lucide-react";
import Button from "../forms/Button";
import { useState } from "react";
import ParticipantsDialog from "./ParticipantsDialog";
import Tooltip from "../Tooltip";

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
        setIsOpen={() => setEvent(null)}
        upperStrip={
          <div
            className="absolute top-[-2px] left-0 w-full h-2"
            style={{ backgroundColor: event?.color }}
          ></div>
        }
      >
        <div className="flex flex-col gap-2 w-full px-8 py-4 text-text">
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-2">
              <Calendar size={32} className="text-primary" />
              <p>
                {new Date(event?.startTime ?? "").toLocaleDateString()}
                {new Date(event?.endTime ?? "").getDate() !==
                  new Date(event?.startTime ?? "").getDate() &&
                  " - " + new Date(event?.endTime ?? "").toLocaleDateString()}
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
                event?.owner.profilePictureUrl ??
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="profile_picture"
              className="w-8 h-8 rounded-full"
            />
            <p className="font-bold">{event?.owner.nickname}</p>
          </div>
          <Description text={event?.body ?? ""} />
          <div className="flex flex-row items-center gap-2 justify-between mx-[5%]">
            <div className="flex flex-row items-center gap-2">
              <Eye size={32} className="text-primary" />
              <p>{event?.public ? "Public" : "Private"}</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Repeat size={32} className="text-primary" />
              <p className="capitalize">{event?.recurrence}</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-end gap-2 mb-2 mt-6 ">
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
            {!event?.participates && (
              <Button onClick={() => alert("PLEASE ENTER TOKEN")}>Join</Button>
            )}
          </div>
        </div>
      </Dialog>
      <ParticipantsDialog
        isOpen={showParticipants}
        setIsOpen={setShowParticipants}
        eventId={event?.id ?? 0}
      />
    </>
  );
}
