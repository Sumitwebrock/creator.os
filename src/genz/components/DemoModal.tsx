import { motion } from 'motion/react';
import { Play, CheckCircle2 } from 'lucide-react';

interface DemoModalContentProps {
  onClose: () => void;
}

export function DemoModalContent({ onClose }: DemoModalContentProps) {
  return (
    <div className="space-y-6">
      {/* Video Placeholder */}
      <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 overflow-hidden group cursor-pointer">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-8 h-8 ml-1" />
          </motion.div>
        </div>
        
        {/* Simulated video thumbnail */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-sm">CreatorOS Platform Demo (3:45)</p>
        </div>
      </div>

      {/* Features List */}
      <div className="space-y-3">
        <p className="text-gray-400">What you'll see in this demo:</p>
        <ul className="space-y-2">
          {[
            'AI Growth Strategist in action',
            'Persona Engine customization',
            'Sponsorship matching process',
            'Local creator network',
          ].map((feature, index) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-gray-300"
            >
              <CheckCircle2 className="w-5 h-5 text-purple-400" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <motion.button
        onClick={onClose}
        className="w-full px-6 py-3 rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Close
      </motion.button>
    </div>
  );
}
