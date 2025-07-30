import { Input as HeadlessInput } from "@headlessui/react";
import { combineString } from "../../../utils/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div
        className={combineString([
          "flex flex-row bg-input rounded-lg ",
          className,
        ])}
      >
        {icon && (
          <div className="p-2 bg-primary text-onSurface rounded-l">{icon}</div>
        )}
        <HeadlessInput
          className="p-2 w-full data-[invalid]:text-red-500 data-[disabled]:text-text-muted"
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
