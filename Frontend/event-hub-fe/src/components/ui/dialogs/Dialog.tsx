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
  upperStrip?: React.ReactNode;
  buttons?: React.ReactNode;
  width?: string;
}

export default function Dialog({
  children,
  title,
  description,
  isOpen,
  setIsOpen,
  upperStrip,
  buttons,
  width = "w-1/3",
}: DialogProps) {
  return (
    <HeadlessDialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 flex w-screen items-center justify-center data-closed:opacity-0"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50 ">
        <DialogPanel
          className={`${width} border p-8 bg-dialog rounded-lg relative overflow-hidden`}
        >
          {upperStrip}
          <DialogTitle className="font-bold text-3xl">{title}</DialogTitle>
          <Description className="text-text-muted">{description}</Description>
          {children}
          <div className="flex gap-2 justify-end">
            {buttons}
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
}
