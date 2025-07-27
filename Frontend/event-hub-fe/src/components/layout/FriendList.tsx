import FriendCard from "../ui/FriendCard";
import { usePageStore } from "../../store/store";
import { Bell, Search, UserPlus } from "lucide-react";
import Input from "../ui/forms/Input";

export default function FriendList() {
  const { selectedPage } = usePageStore();
  return (
    <>
      {selectedPage !== "friends" && (
        <div className="flex flex-col gap-2 items-center mt-6 border-l-2 h-auto">
          <div className="flex flex-row items-center justify-between w-full pr-2 pl-4">
            <h2 className="text-2xl font-bold">Friends</h2>
            <div className="flex flex-row gap-2">
              <div className="rounded-full bg-primary p-2 cursor-pointer hover:bg-button-hover">
                <UserPlus size={28} className="text-onSurface" />
              </div>
              <div className="rounded-full bg-primary p-2 cursor-pointer hover:bg-button-hover">
                <Bell size={28} className="text-onSurface" />
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 px-4 my-2">
            <Input
              placeholder="Search for a friend"
              icon={<Search size={24} />}
            />
          </div>
          <div className="flex flex-col gap-2">
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
              <FriendCard
                key={index}
                user={{
                  id: index,
                  username: "John Doe",
                  email: "john.doe@example.com",
                  follow_token: "1234567890",
                  profile_picture_url:
                    "https://i.pinimg.com/1200x/bd/af/6d/bdaf6d8fe7871aa0a0fdf89f0587fd69.jpg",
                  proffesion: "Software Engineer",
                  about: "I am a software engineer",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
