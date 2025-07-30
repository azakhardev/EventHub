import Dialog from "./Dialog";
import type { Event } from "../../../types/event";
import Description from "../Description";
import { Calendar, Clock, Eye, Pin, Repeat } from "lucide-react";

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
  return (
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
        <Description text={event?.body ?? ""} />
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="flex flex-row items-center gap-2">
            <Calendar size={32} />
            <p>
              {new Date(event?.startTime ?? "").toLocaleDateString()} -{" "}
              {new Date(event?.endTime ?? "").toLocaleDateString()}
            </p>
          </div>
          <div>
            <div className="bg-surface text-onSurface rounded-full px-2 py-1 capitalize">
              {event?.category}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Clock size={32} />
          <p>
            {new Date(event?.startTime ?? "").toLocaleTimeString()} -{" "}
            {new Date(event?.endTime ?? "").toLocaleTimeString()}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Pin size={32} />
          <p>{event?.place}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <img
            src={event?.owner.profile_picture_url}
            alt="profile_picture"
            className="w-8 h-8 rounded-full"
          />
          <p>{event?.owner.username}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Eye size={32} />
          <p>{event?.public ? "Public" : "Private"}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Repeat size={32} />
          <p className="capitalize">{event?.recurrence}</p>
        </div>
      </div>
    </Dialog>
  );
}
