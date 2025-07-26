import type { User } from "../../types/User";

interface FriendCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

export default function FriendCard({ user, ...props }: FriendCardProps) {
  return (
    <div className="w-full flex flex-row items-center gap-2" {...props}>
      <div>
        <img
          src={user.profile_picture_url}
          alt={user.username}
          className="w-14 h-14 rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <div className="font-bold font-[20px]">{user.username}</div>
        <div className="text-[16px] font-bold text-text-muted">
          {user.proffesion}
        </div>
      </div>
    </div>
  );
}
