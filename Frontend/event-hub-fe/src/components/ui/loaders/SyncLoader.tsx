import { SyncLoader as SyncLoaderComponent } from "react-spinners";
import { useEffect, useState } from "react";
import { useThemeStore } from "../../../store/store";

export function SyncLoader() {
  const [loaderColor, setLoaderColor] = useState("#000");
  const { theme } = useThemeStore();
  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const color = root.getPropertyValue("--color-primary").trim();
    setLoaderColor(color);
  }, [theme]);

  return (
    <div className="flex justify-center items-center mt-2">
      <SyncLoaderComponent color={loaderColor} />
    </div>
  );
}
