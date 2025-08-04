import { useQuery } from "@tanstack/react-query";
import Dialog from "./Dialog";
import { useUserStore } from "../../../store/store";
import { BounceLoader } from "../loaders/BounceLoader";
import type { User } from "../../../types/user";
import Description from "../Description";
import ErrorAlert from "../alerts/ErrorAlert";
import { apiRequest, api } from "../../../utils/api";

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
        description={"Your profile information"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        height="h-auto"
        width="w-2/3"
      >
        {isLoading && <BounceLoader />}
        {error && <ErrorAlert error={error.message} />}
        {data && (
          <div className="flex flex-row gap-2 w-full">
            <div className="flex flex-col gap-2 px-12 mt-4 flex-[3]">
              <div className="flex flex-row gap-2 w-full">
                <div className="flex-[2] flex flex-col items-center justify-center">
                  <div className="flex-1 w-36 h-36 flex items-center justify-center">
                    <img
                      src={data.profilePictureUrl}
                      alt="profile_picture"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="flex-[3] flex flex-col justify-center gap-1">
                  <h4>
                    Username:{" "}
                    <span className="font-normal">{data.username}</span>
                  </h4>
                  <h4>
                    Displayed:{" "}
                    <span className="font-normal">{data.nickname}</span>
                  </h4>
                  <h4>
                    Email: <span className="font-normal">{data.email}</span>
                  </h4>
                  <h4>
                    Proffesion:{" "}
                    <span className="font-normal">{data.proffesion}</span>
                  </h4>
                </div>
              </div>
              <div className="mt-2">
                <Description text={data.about ?? ""} />
              </div>
              <div className="flex flex-row gap-2">
                <h4>Your follow token:</h4>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(data.followToken!);
                    alert("Follow token copied to clipboard");
                  }}
                  className="flex-1 cursor-pointer p-1 bg-white rounded-md border-2 border-transparent hover:border-primary"
                >
                  {data.followToken}
                </div>
              </div>
            </div>
            <div className="flex-[2] flex flex-col gap-4">
              <h3 className="text-center">Your followers</h3>
              <div className="flex flex-col gap-2 max-h-[28vh] overflow-y-scroll scrollbar-hide"></div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
