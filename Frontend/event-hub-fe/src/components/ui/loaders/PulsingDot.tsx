import { motion } from "framer-motion";

export default function PulsingDot() {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <motion.span
        className="absolute w-4 h-4 rounded-full bg-primary"
        animate={{ scale: [0.8, 2], opacity: [0.8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <span className="relative w-3 h-3 rounded-full bg-primary" />
    </div>
  );
}
