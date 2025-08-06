import Dialog from "../Dialog";
import ProfileView from "./ProfileView";
import { useState } from "react";
import ProfileEdit from "./ProfileEdit";
import Button from "../../forms/Button";
import type { User } from "../../../../types/user";
import { useUserStore } from "../../../../store/store";
import { apiRequest } from "../../../../utils/api";
import { api } from "../../../../utils/api";
import { useQuery } from "@tanstack/react-query";

interface ProfileDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ProfileDialog({
  isOpen,
  setIsOpen,
}: ProfileDialogProps) {
  const [editing, setEditing] = useState(false);
  const { token, userId } = useUserStore();

  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["profile"],
    queryFn: async () => {
      return apiRequest<User>(`${api}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    enabled: !!token && !!userId,
  });

  return (
    <div>
      <Dialog
        title={"Profile"}
        description={
          editing ? "Edit your profile information" : "Your profile information"
        }
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        height="h-auto"
        width={editing ? "w-1/2" : "w-2/3"}
        buttons={
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => setEditing(false)}
                >
                  Close
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>Edit</Button>
            )}
          </div>
        }
      >
        {editing ? (
          <ProfileEdit user={data as User} />
        ) : (
          <ProfileView
            user={data as User}
            isLoading={isLoading}
            error={error || null}
          />
        )}
      </Dialog>
    </div>
  );
}
