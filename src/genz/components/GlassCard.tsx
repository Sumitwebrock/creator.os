import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  const baseClasses = `rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 ${className}`;

  if (hover) {
    return (
      <motion.div
        className={baseClasses}
        whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}
