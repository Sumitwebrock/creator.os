import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const baseClasses = `${sizeClasses[size]} rounded-2xl transition-all duration-300 relative overflow-hidden group ${className}`;

  if (variant === 'primary') {
    return (
      <motion.button
        className={`${baseClasses} bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </motion.button>
    );
  }

  if (variant === 'outline') {
    return (
      <motion.button
        className={`${baseClasses} border-2 border-transparent bg-clip-padding`}
        style={{
          background: 'linear-gradient(#0a0a0f, #0a0a0f) padding-box, linear-gradient(to right, #ec4899, #a855f7, #6366f1) border-box',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        <span className="bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">
          {children}
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        />
      </motion.button>
    );
  }

  // ghost variant
  return (
    <motion.button
      className={`${baseClasses} text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
