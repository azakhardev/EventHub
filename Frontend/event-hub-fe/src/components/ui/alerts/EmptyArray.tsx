interface EmptyArrayProps {
  message?: string;
  align?: "middle" | "left";
}

export default function EmptyArray({
  message,
  align = "middle",
}: EmptyArrayProps) {
  return (
    <div
      className={`flex flex-row items-center ${
        align === "middle" ? "justify-center" : "justify-start"
      }`}
    >
      <div className="p-3 border border-gray-500 bg-gray-200 rounded-md w-2/3">
        <h4 className="text-text-on-light">No items found</h4>
        <p>{message ?? "There is no data to display"}</p>
      </div>
    </div>
  );
}
