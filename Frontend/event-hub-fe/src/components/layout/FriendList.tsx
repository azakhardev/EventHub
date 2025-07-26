import FriendCard from "../ui/FriendCard";

export default function FriendList() {
  return (
    <div className="flex flex-col gap-2 items-center mt-6 border-l-2 h-auto">
      <h2 className="text-2xl font-bold">Friends</h2>
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
  );
}
