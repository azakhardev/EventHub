import { BounceLoader as BounceLoaderComponent } from "react-spinners";
import { useEffect, useState } from "react";
import { useThemeStore } from "../../../store/store";

export function BounceLoader() {
  const [loaderColor, setLoaderColor] = useState("#000");
  const { theme } = useThemeStore();
  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const color = root.getPropertyValue("--color-primary").trim();
    setLoaderColor(color);
  }, [theme]);

  return (
    <div className="w-full flex justify-center items-center">
      <BounceLoaderComponent color={loaderColor} />
    </div>
  );
}
