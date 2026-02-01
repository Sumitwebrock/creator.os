import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { MapPin, Star } from 'lucide-react';
import { toast } from 'sonner';

interface CreatorCardProps {
  name: string;
  skill: string;
  distance: string;
  rating: number;
  projects: number;
}

export function CreatorCard({ name, skill, distance, rating, projects }: CreatorCardProps) {
  const handleConnect = () => {
    toast.success(`Connecting with ${name}...`, {
      description: `${skill} • ${distance} away`,
    });
  };

  return (
    <GlassCard className="p-4">
      <div className="flex items-start gap-4">
        <motion.div
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="text-xl">{name.charAt(0)}</span>
        </motion.div>
        
        <div className="flex-1">
          <h4 className="mb-1">{name}</h4>
          <p className="text-gray-400 mb-2">{skill}</p>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{distance}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-gray-300">{rating}</span>
            </div>
            
            <span className="text-gray-400">{projects} projects</span>
          </div>
        </div>
        
        <motion.button
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConnect}
        >
          Connect
        </motion.button>
      </div>
    </GlassCard>
  );
}