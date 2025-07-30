import {
  Description,
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import Button from "../forms/Button";

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
      className="fixed inset-0 flex w-screen items-center justify-center data-closed:opacity-0"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50">
        <DialogPanel className="w-1/3 border p-8 bg-dialog rounded-lg">
          <DialogTitle className="font-bold text-3xl">{title}</DialogTitle>
          <Description className="text-text-muted">{description}</Description>
          {children}
          <div className="flex gap-4 justify-end">
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
}
