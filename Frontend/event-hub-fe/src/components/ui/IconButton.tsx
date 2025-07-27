import { combineString } from "../../utils/utils";

interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
}

export default function IconButton({
  icon,
  onClick,
  label,
  ...props
}: IconButtonProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-row items-center hover:drop-shadow-glow group"
    >
      <div
        className={combineString([
          "p-2 group-hover:animate-wiggle15",
          props.className ?? "",
        ])}
      >
        {icon}
      </div>
      <p>{label}</p>
    </div>
  );
}
