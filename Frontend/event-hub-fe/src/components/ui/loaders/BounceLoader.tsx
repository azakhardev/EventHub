import { BounceLoader as BounceLoaderComponent } from "react-spinners";
import { useEffect, useState } from "react";

export function BounceLoader() {
  const [spinnerColor, setSpinnerColor] = useState("#000");

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const color = root.getPropertyValue("--color-primary").trim();
    setSpinnerColor(color);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <BounceLoaderComponent color={spinnerColor} />
    </div>
  );
}
