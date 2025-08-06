import { combineString } from "../../utils/utils.ts";

import type { Event } from "../../types/event.ts";
import { Clock, MapPin } from "lucide-react";

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

export default function EventCard({ event, ...props }: EventCardProps) {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);

  return (
    <div
      className={combineString([
        "flex-[4] cursor-pointer relative rounded-lg border-2 flex flex-row bg-card pr-4 overflow-hidden hover:shadow-b-md hover:shadow-md whitespace-nowrap text-ellipsis",
        props.className,
      ])}
      {...props}
    >
      <div
        className="absolute top-[0] left-[100%] w-[150px] h-[150px] rotate-45 origin-top-right opacity-50"
        style={{ backgroundColor: event.color }}
      />
      <div
        style={{ backgroundColor: event.color }}
        className="min-w-[30px] min-h-[100%] mr-4 opacity-50"
      ></div>
      <div className="flex flex-col gap-2 w-full pr-[10%] py-2">
        <div className="flex flex-row items-center justify-between">
          <h4 className="text-text-on-light">
            {event.important && "❗"}
            {event.title}
          </h4>
          <div>{startTime.toLocaleDateString()}</div>
        </div>
        <hr />
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <div>
              <MapPin size={16} />
            </div>
            <div>{event.place}</div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div>
              <Clock size={16} />
            </div>
            <div>{`${startTime
              .getHours()
              .toString()
              .padStart(2, "0")}:${startTime
              .getMinutes()
              .toString()
              .padStart(2, "0")} - ${endTime
              .getHours()
              .toString()
              .padStart(2, "0")}:${endTime
              .getMinutes()
              .toString()
              .padStart(2, "0")}`}</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end">
          <div className="relative top-[-15px] font-bold right-[-10%]">
            {event.owner.nickname}
          </div>
        </div>
      </div>
    </div>
  );
}
