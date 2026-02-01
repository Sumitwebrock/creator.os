import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { Sparkles } from 'lucide-react';

interface AIRecommendationBubbleProps {
  children: ReactNode;
}

export function AIRecommendationBubble({ children }: AIRecommendationBubbleProps) {
  return (
    <motion.div
      className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-purple-500/30 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-indigo-500/10"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <div className="relative z-10 flex items-start gap-3">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-5 h-5 text-pink-400 flex-shrink-0" />
        </motion.div>
        <div>
          <div className="text-purple-400 mb-1">AI Recommendation</div>
          <p className="text-white">{children}</p>
        </div>
      </div>
    </motion.div>
  );
}
