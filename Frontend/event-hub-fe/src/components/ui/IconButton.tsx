import { combineString } from "../../utils/utils";

interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  onClick: () => void;
}

export default function IconButton({
  icon,
  onClick,
  ...props
}: IconButtonProps) {
  return (
    <div
      onClick={onClick}
      className={combineString([
        "border-2 p-2 rounded-md cursor-pointer hover:cursor-pointer",
        props.className ?? "",
      ])}
    >
      {icon}
    </div>
  );
}
