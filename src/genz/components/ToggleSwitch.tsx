import { motion } from 'motion/react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {label && (
        <span className="text-gray-300">{label}</span>
      )}
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
          checked
            ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
            : 'bg-gray-700'
        }`}
      >
        <motion.div
          className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg"
          animate={{
            x: checked ? 32 : 0,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
        {checked && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
        )}
      </button>
      {checked && (
        <motion.span
          className="text-purple-400"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Active
        </motion.span>
      )}
    </div>
  );
}
