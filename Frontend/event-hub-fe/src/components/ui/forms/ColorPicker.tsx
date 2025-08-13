import { useState } from "react";
import { Field } from "@headlessui/react";

interface ColorPickerFieldProps {
  defaultColor?: string;
  onChange?: (color: string) => void;
}

export default function ColorPickerField({
  defaultColor = "#ff0000",
  onChange,
}: ColorPickerFieldProps) {
  const [color, setColor] = useState(defaultColor);

  return (
    <Field className="flex flex-col gap-1">
      <div className="relative flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
          style={{ backgroundColor: color }}
        />
        <input
          id="color"
          name="color"
          type="color"
          value={color}
          onChange={(e) => {
            const newColor = e.target.value;
            setColor(newColor);
            onChange?.(newColor);
          }}
          className="w-full h-10 p-0 border-none bg-transparent cursor-pointer"
          style={{ appearance: "none" }}
        />
      </div>
    </Field>
  );
}
