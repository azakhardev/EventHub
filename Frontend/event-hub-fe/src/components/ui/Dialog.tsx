import {
  Description,
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Dialog({
  children,
  title,
  description,
  isOpen,
  setIsOpen,
}: DialogProps) {
  return (
    <HeadlessDialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border p-12">
          <DialogTitle className="font-bold">{title}</DialogTitle>
          <Description>{description}</Description>
          {children}
          <div className="flex gap-4">
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
}
