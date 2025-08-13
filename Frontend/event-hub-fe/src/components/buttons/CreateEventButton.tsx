import { useState } from "react";
import Button from "../ui/forms/Button";
import EventFormDialog from "../ui/dialogs/EventFormDialog";

export default function CreateEventButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <Button onClick={() => setIsOpen(true)}>Create Event</Button>
      </div>
      <EventFormDialog
        isOpen={isOpen}
        setIsOpened={() => setIsOpen(false)}
        submitMethod="POST"
        event={null}
      />
    </>
  );
}
