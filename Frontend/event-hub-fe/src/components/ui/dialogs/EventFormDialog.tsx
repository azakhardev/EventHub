import Dialog from "./Dialog";
import type { Event } from "../../../types/event";
import Input from "../forms/Input";
import { useMutation } from "@tanstack/react-query";
import { createEvent, editEvent } from "../../../api/events";
import { useUserStore } from "../../../store/store";
import { toast } from "react-toastify";
import Textarea from "../forms/Textarea";
import { Field, Label, Select } from "@headlessui/react";
import { EventRecurrence } from "../../../types/event";
import Checkbox from "../forms/Checkbox";
import Button from "../forms/Button";
import ColorPickerField from "../forms/ColorPicker";
import { useState } from "react";
import { queryClient } from "../../../main.tsx";

interface EventFormDialogProps {
  event: Event | null;
  submitMethod: "POST" | "PUT";
  isOpen: boolean;
  setIsOpened: (opened: boolean) => void;
}

export default function EventFormDialog(props: EventFormDialogProps) {
  const event = props.event;

  const { token, userId } = useUserStore();
  const [isPublic, setIsPublic] = useState(event?.public ?? true);
  const [selectedRecurrence, setSelectedRecurrence] = useState<EventRecurrence>(
    event?.recurrence || "once"
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { mutate } = useMutation({
    mutationFn: async (eventData: Event) => {
      if (props.submitMethod === "POST") {
        return await createEvent(token, userId, eventData);
      } else {
        return await editEvent(token, userId, eventData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(
        props.submitMethod === "POST"
          ? "Event created successfully"
          : "Event edited successfully"
      );
    },
    onError: (error: any) => {
      if (typeof error === "object" && error !== null) {
        setFieldErrors(error);
      } else {
        toast.error(String(error));
      }
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const newEvent: Event = {
      id: event?.id ?? 0,
      title: data.title as string,
      body: (data.body as string) || undefined,
      startTime: new Date(data.startTime as string).toISOString(),
      endTime: new Date(data.endTime as string).toISOString(),
      place: (data.place as string) || undefined,
      category: (data.category as string) || undefined,
      color: (data.color as string) || "#000000",
      public: data.public === "on",
      recurrence: data.recurrence as Event["recurrence"],
      recurrenceEndDate: data.recurrenceEndDate
        ? new Date(data.recurrenceEndDate as string).toISOString()
        : undefined,
    };

    mutate(newEvent);
  }

  return (
    <Dialog
      title={props.submitMethod === "POST" ? "Create Event" : "Edit Event"}
      description="Specify information about the event"
      isOpen={props.isOpen}
      setIsOpen={props.setIsOpened}
      height="h-auto"
      width="lg:min-w-[70vw] xl:min-w-[50vw]"
    >
      <div className="flex justify-center p-4">
        <form className="flex flex-col gap-2 w-2/3" onSubmit={handleSubmit}>
          <Field className="flex flex-col gap-1">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              placeholder="Enter event title"
              defaultValue={event?.title}
              error={fieldErrors.title}
            />
          </Field>
          <Field className="flex flex-col gap-1">
            <Label htmlFor="body">Body</Label>
            <Textarea
              name="body"
              placeholder="Enter event body"
              defaultValue={event?.body}
              rows={4}
            />
          </Field>
          <div className="flex flex-row gap-4">
            <Field className="flex-1 flex flex-col gap-1">
              <Label htmlFor="place">Place</Label>
              <Input
                name="place"
                placeholder="Enter event place"
                defaultValue={event?.place}
              />
            </Field>
            <Field className="flex-1 flex flex-col gap-1">
              <Label htmlFor="place">Category</Label>
              <Input
                name="category"
                placeholder="Enter event category"
                defaultValue={event?.category}
              />
            </Field>
          </div>
          <div className="flex flex-row gap-4">
            <Field className="flex-1 flex flex-col gap-1">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                name="startTime"
                defaultValue={event?.startTime}
                type="datetime-local"
                error={fieldErrors.startTime}
              />
            </Field>
            <Field className="flex-1 flex flex-col gap-1">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                name="endTime"
                defaultValue={event?.endTime}
                type="datetime-local"
                error={fieldErrors.endTime}
              />
            </Field>
          </div>
          <label htmlFor="recurrence">Recurrence</label>
          <Field className="flex flex-row gap-4">
            <Select
              name="recurrence"
              aria-label="Event recurrence"
              className="w-auto p-2 rounded-md cursor-pointer border capitalize"
              value={selectedRecurrence}
              onChange={(e) =>
                setSelectedRecurrence(e.target.value as EventRecurrence)
              }
            >
              {Object.entries(EventRecurrence).map(([key, value]) => (
                <option className="capitalize" key={key} value={value}>
                  {value}
                </option>
              ))}
            </Select>
            <div className="flex-1 flex flex-row">
              <Input
                name="recurrenceEndDate"
                defaultValue={event?.recurrenceEndDate}
                type="date"
                className="flex-1"
                error={fieldErrors.recurrenceEndDate}
                disabled={selectedRecurrence === "once"}
              />
            </div>
          </Field>
          <div className="flex flex-row gap-4">
            <Checkbox
              text="Public"
              checked={isPublic}
              onCheck={() => {
                setIsPublic((old) => !old);
              }}
              name="public"
            />

            <Field className="flex-1 flex flex-col gap-1">
              <ColorPickerField defaultColor={event?.color} />
            </Field>
          </div>
          <div className="flex items-center justify-center">
            <Button className="w-2/3" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
