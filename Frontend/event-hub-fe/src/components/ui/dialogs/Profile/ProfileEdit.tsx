import Input from "../../forms/Input";
import type { User } from "../../../../types/user";
import Textarea from "../../forms/Textarea";
import Button from "../../forms/Button";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { editProfile } from "../../../../api/users";
import { useUserStore } from "../../../../store/store";

import { queryClient } from "../../../../main";

interface ProfileEditProps {
  user: User;
}

export default function ProfileEdit({ user }: ProfileEditProps) {
  const { token, userId } = useUserStore();

  const editProfileMutation = useMutation({
    mutationFn: (user: User) => editProfile(userId, token, user),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const user = Object.fromEntries(formData);
    editProfileMutation.mutate(user as unknown as User);
  };

  return (
    <div className="flex justify-center p-4">
      <form className="flex flex-col gap-2 w-1/2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username</label>
          <Input
            name="username"
            placeholder="Enter your username"
            defaultValue={user.username}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="nickname">Nickname</label>
          <Input
            name="nickname"
            placeholder="Enter your nickname"
            defaultValue={user.nickname}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <Input
            name="email"
            placeholder="Enter your email"
            defaultValue={user.email}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="proffesion">Proffesion</label>
          <Input
            name="proffesion"
            placeholder="Enter your proffesion"
            defaultValue={user.proffesion}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="proffesion">Profile Picture</label>
          <Input
            name="profilePictureUrl"
            placeholder="Enter profile picture URL"
            defaultValue={user.profilePictureUrl}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="about">About</label>
          <Textarea
            name="about"
            placeholder="Enter your about"
            defaultValue={user.about}
            rows={4}
          />
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
