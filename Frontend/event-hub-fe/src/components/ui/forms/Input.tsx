import { Input as HeadlessInput } from "@headlessui/react";
import { combineString } from "../../../utils/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
  return (
    <HeadlessInput
      className={combineString([
        "bg-input rounded-lg p-2 data-[invalid]:text-red-500 data-[disabled]:text-text-muted",
        className,
      ])}
      {...props}
    />
  );
}
