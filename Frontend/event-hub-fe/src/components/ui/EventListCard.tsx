import type { Event } from "../../types/event.ts";
import Button from "./forms/Button.tsx";
import { Pencil, Trash } from "lucide-react";
import { useDeleteStore, useUserStore } from "../../store/store.tsx";
import { useMutation } from "@tanstack/react-query";
import { deleteEvent } from "../../api/events.ts";
import { queryClient } from "../../main.tsx";
import EventCard from "./EventCard.tsx";

interface EventListCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

export default function EventListCard({ event, onClick }: EventListCardProps) {
  const { token, userId } = useUserStore();
  const {
    setIsOpen,
    setOnDelete,
    setDialogQuestion: setDeletedItem,
  } = useDeleteStore();

  const { mutate: deleteEventMutation } = useMutation({
    mutationFn: async () => await deleteEvent(token, event?.id ?? 0),
  });

  const onDelete = async () => {
    return new Promise<void>((resolve, reject) => {
      deleteEventMutation(undefined, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["events"],
            exact: false,
          });
          resolve();
        },
        onError: (error) => {
          console.error("Failed to delete event:", error);
          reject(error);
        },
      });
    });
  };

  return (
    <div className="flex flex-row items-center w-full">
      <EventCard event={event} onClick={onClick} />
      <div className="flex-1 flex justify-around px-4">
        {event.owner.id === userId && (
          <>
            <Button className="bg-transparent hover:bg-transparent hover:scale-[1.03] px-4 py-6 border-2 border-icon rounded-md">
              <Pencil className="text-primary" size={32} />
            </Button>
            <Button
              className="bg-transparent hover:bg-transparent hover:scale-[1.03] px-4 py-6 border-2 border-red-300 rounded-md"
              onClick={() => {
                setIsOpen(true);
                setDeletedItem(
                  "Are you sure you want to delete event " + event.title + "?"
                );
                setOnDelete(onDelete);
              }}
            >
              <Trash className="text-red-500" size={32} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
