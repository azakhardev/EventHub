import { SyncLoader as SyncLoaderComponent } from "react-spinners";
import { useEffect, useState } from "react";

export function SyncLoader() {
  const [spinnerColor, setSpinnerColor] = useState("#000");

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const color = root.getPropertyValue("--color-primary").trim();
    setSpinnerColor(color);
  }, []);

  return (
    <div className="flex justify-center items-center">
      <SyncLoaderComponent color={spinnerColor} />
    </div>
  );
}
