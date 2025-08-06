import Dialog from "./Dialog";
import Button from "../forms/Button";
import { useDeleteStore } from "../../../store/store";
import { toast } from "react-toastify";

export default function DeleteDialog() {
  const { onDelete, setIsOpen, isOpen, dialogQuestion } = useDeleteStore();

  const buttons = (
    <div className="flex gap-4 py-2">
      <Button
        className="bg-red-500 text-white"
        onClick={() => {
          onDelete()
            .then(() => {
              toast.success("Deleted successfully");
              setIsOpen(false);
            })
            .catch((error) => {
              toast.error("Failed : " + error.message);
            });
        }}
      >
        Delete
      </Button>
      <Button onClick={() => setIsOpen(false)}>Cancel</Button>
    </div>
  );

  return (
    <>
      <Dialog
        title={"Delete item"}
        description={""}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttons={buttons}
        height="h-auto"
      >
        <p className="text-2xl text-center py-2 text-text">{dialogQuestion}</p>
      </Dialog>
    </>
  );
}
