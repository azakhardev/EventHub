import { useQuery } from "@tanstack/react-query";
import Dialog from "./Dialog";
import { useUserStore } from "../../../store/store";
import { BounceLoader } from "react-spinners";
import type { User } from "../../../types/user";

const api = import.meta.env.VITE_API_URL;

interface ProfileDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ProfileDialog({
  isOpen,
  setIsOpen,
}: ProfileDialogProps) {
  const { token, userId } = useUserStore();

  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["profile"],
    queryFn: () =>
      fetch(`${api}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json()),
    enabled: !!token && !!userId,
  });

  return (
    <div>
      <Dialog
        title={data?.username ?? "Profile"}
        description={data?.proffesion ?? "Your profile information"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {isLoading && <BounceLoader className="bg-primary" />}
        {error && <div>Error: {error.message}</div>}
        {data && (
          <div className="flex flex-row gap-[15%] px-12 ">
            <div className="flex-1 min-w-16 min-h-16 flex items-center justify-center">
              <img
                src={data.profile_picture_url}
                alt="profile_picture"
                className="rounded-full"
              />
            </div>
            <div className="flex-[3] flex flex-col gap-2">
              <div className="mt-2 mb-6">
                <h4>
                  Email: <span className="font-normal">{data.email}</span>
                </h4>
                <div className="mt-2">
                  <h4>About:</h4>
                  <div className="w-auto p-1 bg-white rounded-md border border-black">
                    {data.about ? data.about : ""}
                  </div>
                </div>
                <h4>Your follow token:</h4>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(data.followToken);
                    alert("Follow token copied to clipboard");
                  }}
                  className="w-auto cursor-pointer p-1 bg-white rounded-md border-2 border-transparent hover:border-primary"
                >
                  {data.followToken}
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
