import { motion } from "framer-motion";

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      initial={{ scale: 0.8, rotate: -10 }}
      animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="shanghai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="card-glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Card shape */}
      <motion.rect
        x="3"
        y="1"
        width="26"
        height="30"
        rx="4"
        fill="url(#shanghai-gradient)"
        fillOpacity="0.15"
        stroke="url(#shanghai-gradient)"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Diamond suit — center */}
      <motion.path
        d="M16 8 L21 16 L16 24 L11 16 Z"
        fill="url(#shanghai-gradient)"
        filter="url(#card-glow)"
        animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "16px 16px" }}
      />

      {/* Corner rank dots */}
      <circle cx="7" cy="6" r="1.2" fill="url(#shanghai-gradient)" fillOpacity="0.7" />
      <circle cx="25" cy="26" r="1.2" fill="url(#shanghai-gradient)" fillOpacity="0.7" />
    </motion.svg>
  );
}

export function LogoWithText() {
  return (
    <div className="flex items-center space-x-2">
      <Logo className="h-9 w-9" />
      <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        Shanghai
      </span>
    </div>
  );
}
