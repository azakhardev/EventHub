import { Button as HeadlessButton } from "@headlessui/react";
import { combineString } from "../../../utils/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <HeadlessButton
      className={combineString([
        "bg-primary px-6 py-2 rounded-full hover:bg-button-hover text-onSurface text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      ])}
      {...props}
    />
  );
}
