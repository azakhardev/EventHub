import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../../../api/users";
import { useUserStore } from "../../../../store/store";
import Dialog from "../../dialogs/Dialog";
import { toast } from "react-toastify";
import Input from "../../forms/Input";
import Button from "../../forms/Button";

interface PasswordDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export default function PasswordDialog({
  isOpen,
  setIsOpen,
}: PasswordDialogProps) {
  const { userId, token } = useUserStore();

  const changePasswordMutation = useMutation({
    mutationFn: ({
      currentPassword,
      newPassword,
    }: {
      currentPassword: string;
      newPassword: string;
    }) => changePassword(userId, token, currentPassword, newPassword),
    onSuccess: () => {
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { currentPassword, newPassword, newPasswordConfirm } =
      Object.fromEntries(formData);

    if (newPassword !== newPasswordConfirm) {
      toast.error("Passwords do not match");
      return;
    }

    changePasswordMutation.mutate({
      currentPassword: currentPassword as string,
      newPassword: newPassword as string,
    });
  }

  return (
    <Dialog
      title="Change Password"
      description="Change your password"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      height="h-auto"
    >
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center"
      >
        <div className="flex flex-col gap-2 w-1/2">
          <Input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
          />
          <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
          />
          <Input
            type="password"
            name="newPasswordConfirm"
            placeholder="Confirm New Password"
          />
          <Button type="submit">Change Password</Button>
        </div>
      </form>
    </Dialog>
  );
}
