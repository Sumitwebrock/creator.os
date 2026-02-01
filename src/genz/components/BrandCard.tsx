import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { Building2, TrendingUp, DollarSign, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface BrandCardProps {
  brandName: string;
  matchScore: number;
  category: string;
  budget: string;
  escrowStatus: 'Active' | 'Pending' | 'Completed';
}

export function BrandCard({ brandName, matchScore, category, budget, escrowStatus }: BrandCardProps) {
  const statusColors = {
    Active: 'bg-green-500/20 text-green-400 border-green-500/30',
    Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  const handleViewDetails = () => {
    toast.success(`Opening ${brandName} details...`, {
      description: `${matchScore}% match • ${category}`,
    });
  };

  const handleContract = () => {
    toast.info('Generating AI contract...', {
      description: 'Your smart contract will be ready in moments.',
    });
  };

  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="mb-1">{brandName}</h3>
            <p className="text-gray-400">{category}</p>
          </div>
        </div>
        
        <motion.div
          className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-pink-400" />
            <span className="text-pink-400">{matchScore}% Match</span>
          </div>
        </motion.div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-gray-300">Budget: {budget}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400">Escrow Status:</span>
          <span className={`px-2 py-1 rounded-full border ${statusColors[escrowStatus]}`}>
            {escrowStatus}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
        <motion.button
          className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleViewDetails}
        >
          View Details
        </motion.button>
        <motion.button
          className="px-4 py-2 rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContract}
        >
          Contract
        </motion.button>
      </div>
    </GlassCard>
  );
}