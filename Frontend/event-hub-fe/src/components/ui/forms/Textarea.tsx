import {
  Textarea as HeadlessTextarea,
  type TextareaProps,
} from "@headlessui/react";
import { combineString } from "../../../utils/utils";

export default function Textarea({ className, ...props }: TextareaProps) {
  return (
    <HeadlessTextarea
      className={combineString([
        "p-2 w-full data-[invalid]:text-red-500 data-[disabled]:text-text-muted",
        className as string,
      ])}
      {...props}
    />
  );
}
