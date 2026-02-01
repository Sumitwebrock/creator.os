import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { GlassCard } from './GlassCard';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

export function FeatureCard({ icon, title, description, gradient, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <GlassCard className="p-6 h-full group cursor-pointer">
        <motion.div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </motion.div>
        <h3 className="mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </GlassCard>
    </motion.div>
  );
}
