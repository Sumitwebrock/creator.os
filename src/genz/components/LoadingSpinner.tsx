import { motion } from 'motion/react';
import { Loader2, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse' | 'sparkle';
  text?: string;
}

export function LoadingSpinner({ size = 'md', variant = 'spinner', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (variant === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className={`${sizeClasses[size]} text-purple-400`} />
        </motion.div>
        {text && <p className="text-sm text-gray-400">{text}</p>}
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              animate={{
                y: [0, -10, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
        {text && <p className="text-sm text-gray-400">{text}</p>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <motion.div
          className={`${sizeClasses[size]} rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {text && <p className="text-sm text-gray-400">{text}</p>}
      </div>
    );
  }

  if (variant === 'sparkle') {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Sparkles className={`${sizeClasses[size]} text-purple-400`} />
        </motion.div>
        {text && <p className="text-sm text-gray-400">{text}</p>}
      </div>
    );
  }

  return null;
}

export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`bg-white/5 rounded-xl ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#0a0a0f] flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h2
          className="text-2xl mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading CreatorOS
        </motion.h2>
        
        <motion.div
          className="flex gap-2 justify-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-purple-500"
              animate={{
                y: [0, -10, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function CardLoader() {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="space-y-4">
        <SkeletonLoader className="h-8 w-3/4" />
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-5/6" />
        <SkeletonLoader className="h-10 w-full mt-6" />
      </div>
    </div>
  );
}
