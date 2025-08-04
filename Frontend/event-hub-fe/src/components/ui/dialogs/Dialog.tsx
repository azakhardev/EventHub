import {
  Description,
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { AnimatePresence, motion } from "framer-motion";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  upperStrip?: React.ReactNode;
  buttons?: React.ReactNode;
  width?: string;
  height?: string;
  onClose?: () => void;
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
  height = "h-[55vh]",
  onClose,
}: DialogProps) {
  return (
    <AnimatePresence>
      <HeadlessDialog
        open={isOpen}
        onClose={onClose ?? (() => setIsOpen(false))}
        className="fixed inset-0 flex w-screen items-center justify-center data-closed:opacity-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 bg-black/30"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50 ">
          <DialogPanel
            className={`${width} border p-8 bg-dialog rounded-lg relative overflow-hidden ${height}`}
            as={motion.div}
            initial={{ position: "relative", top: "-5%", opacity: 0 }}
            animate={{ position: "relative", top: "0%", opacity: 1 }}
          >
            {upperStrip}
            <DialogTitle className="font-bold text-3xl">{title}</DialogTitle>
            <Description className="text-text-muted">{description}</Description>
            {children}
            <div className="flex gap-2 justify-end">{buttons}</div>
          </DialogPanel>
        </div>
      </HeadlessDialog>
    </AnimatePresence>
  );
}
