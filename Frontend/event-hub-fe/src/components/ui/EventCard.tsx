import type { Event } from "../../types/Event";
import { combineString } from "../../utils/utils";

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

export default function EventCard({ event, ...props }: EventCardProps) {
  return (
    <div className={combineString(["", props.className ?? ""])}>
      {event.title}
    </div>
  );
}
