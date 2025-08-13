import { Checkbox as HeadlessCheckbox, Label, Field } from "@headlessui/react";
import { Dot } from "lucide-react";

interface CheckboxProps {
  text: string;
  checked: boolean;
  onCheck: (checked: boolean) => void;
  name?: string;
}

export default function Checkbox(props: CheckboxProps) {
  return (
    <Field className="flex items-center gap-2">
      <HeadlessCheckbox
        name={props.name}
        checked={props.checked}
        onChange={props.onCheck}
        className="group block size-6 rounded border bg-white data-[checked]:bg-primary-light cursor-pointer"
      >
        <div className="flex w-full h-full overflow-hidden justify-center items-center">
          <Dot className="hidden fill-black group-data-[checked]:block" />
        </div>
      </HeadlessCheckbox>
      <Label> {props.text}</Label>
    </Field>
  );
}
