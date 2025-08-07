import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export default function Tooltip({ children, text }: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute top-[-100%] -translate-x-1/2 rounded bg-gray-800 px-3 py-1 text-sm text-white shadow-lg z-10"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className="hover:cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
    </div>
  );
}
