import type { Event } from "../../types/event.tsx";
import { combineString } from "../../utils/utils";
import { Clock, MapPin } from "lucide-react";
import Button from "./forms/Button";
import { Pencil, Trash } from "lucide-react";

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

export default function EventCard({ event, ...props }: EventCardProps) {
  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  return (
    <div className="flex flex-row items-center w-full">
      <div
        className={combineString([
          "flex-[4] cursor-pointer relative rounded-lg border-2 flex flex-row bg-card pr-4 overflow-hidden hover:shadow-b-md hover:scale-[1.008]",
          props.className,
        ])}
        {...props}
      >
        <div
          className="absolute top-[0] left-[100%] w-[150px] h-[150px] rotate-45 origin-top-right"
          style={{ backgroundColor: event.color }}
        />
        <div
          style={{ backgroundColor: event.color }}
          className="min-w-[30px] min-h-[100%] mr-4"
        ></div>
        <div className="flex flex-col gap-2 w-full pr-[10%] py-2">
          <div className="flex flex-row items-center justify-between">
            <h4 className="text-text-on-light">{event.title}</h4>
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
              {event.owner.username}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-around px-4">
        <Button className="bg-transparent hover:bg-transparent hover:scale-[1.03] px-4 py-6 border-2 border-icon rounded-md">
          <Pencil className="text-primary" size={32} />
        </Button>
        <Button className="bg-transparent hover:bg-transparent hover:scale-[1.03] px-4 py-6 border-2 border-red-300 rounded-md">
          <Trash className="text-red-500" size={32} />
        </Button>
      </div>
    </div>
  );
}
