import Dialog from "./Dialog";
import type { Event } from "../../../types/event";
import Input from "../forms/Input";
interface EventFormDialogProps {
  event: Event | null;
  submitMethod: "POST" | "PUT";
  opened: boolean;
  setIsOpened: (opened: boolean) => void;
}

export default function EventFormDialog(props: EventFormDialogProps) {
  function handleSubmit() {}

  return (
    <Dialog
      title={props.submitMethod === "POST" ? "Create Event" : "Edit Event"}
      description=""
      isOpen={props.opened}
      setIsOpen={props.setIsOpened}
    >
      <form onSubmit={handleSubmit}>
        <Input />
      </form>
    </Dialog>
  );
}
