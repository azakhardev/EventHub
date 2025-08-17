import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";

export default function ReminderContainer({
  reminders,
  onRemove,
}: {
  reminders: string[];
  onRemove: (index: number) => void;
}) {
  return (
    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[800px] h-[100px] z-50">
      <AnimatePresence>
        {reminders.slice(-2).map((msg, i) => {
          const index = reminders.indexOf(msg);
          return (
            <motion.div
              key={msg + i}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: i * 10, x: -i * 5 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute left-0 w-full text-text bg-primary-light text-center border border-gray-400 px-5 py-2.5 rounded-lg shadow-md flex items-center"
            >
              <Info />
              <span className="flex-1">{msg}</span>
              <button onClick={() => onRemove(index)} className="ml-2">
                <X />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
