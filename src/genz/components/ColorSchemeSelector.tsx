import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Sparkles, Zap, Flame, Leaf, Moon, Sun, Waves } from 'lucide-react';

interface ColorScheme {
  id: string;
  name: string;
  description: string;
  icon: any;
  gradient: string;
  colors: {
    from: string;
    via: string;
    to: string;
  };
  preview: {
    bg: string;
    text: string;
    card: string;
    border: string;
    glow: string;
  };
}

const colorSchemes: ColorScheme[] = [
  {
    id: 'pink-purple',
    name: 'Pink Paradise',
    description: 'Current • Playful & Creative',
    icon: Sparkles,
    gradient: 'from-pink-400 via-purple-400 to-indigo-400',
    colors: { from: 'pink-500', via: 'purple-500', to: 'indigo-500' },
    preview: {
      bg: '#0a0a0f',
      text: 'from-pink-400 via-purple-400 to-indigo-400',
      card: 'from-pink-500/10 via-purple-500/10 to-indigo-500/10',
      border: 'border-pink-500/20',
      glow: 'shadow-[0_0_60px_rgba(236,72,153,0.3)]'
    }
  },
  {
    id: 'cyber-blue',
    name: 'Cyber Ocean',
    description: 'Tech & Professional',
    icon: Waves,
    gradient: 'from-cyan-400 via-blue-400 to-indigo-400',
    colors: { from: 'cyan-500', via: 'blue-500', to: 'indigo-500' },
    preview: {
      bg: '#0a0f1a',
      text: 'from-cyan-400 via-blue-400 to-indigo-400',
      card: 'from-cyan-500/10 via-blue-500/10 to-indigo-500/10',
      border: 'border-cyan-500/20',
      glow: 'shadow-[0_0_60px_rgba(6,182,212,0.3)]'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    description: 'Warm & Energetic',
    icon: Sun,
    gradient: 'from-orange-400 via-pink-400 to-purple-400',
    colors: { from: 'orange-500', via: 'pink-500', to: 'purple-500' },
    preview: {
      bg: '#0f0a0a',
      text: 'from-orange-400 via-pink-400 to-purple-400',
      card: 'from-orange-500/10 via-pink-500/10 to-purple-500/10',
      border: 'border-orange-500/20',
      glow: 'shadow-[0_0_60px_rgba(249,115,22,0.3)]'
    }
  },
  {
    id: 'matrix',
    name: 'Matrix Green',
    description: 'Hacker & Tech',
    icon: Zap,
    gradient: 'from-lime-400 via-green-400 to-emerald-400',
    colors: { from: 'lime-500', via: 'green-500', to: 'emerald-500' },
    preview: {
      bg: '#0a0f0a',
      text: 'from-lime-400 via-green-400 to-emerald-400',
      card: 'from-lime-500/10 via-green-500/10 to-emerald-500/10',
      border: 'border-lime-500/20',
      glow: 'shadow-[0_0_60px_rgba(132,204,22,0.3)]'
    }
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    description: 'Retro-Futuristic 80s',
    icon: Sparkles,
    gradient: 'from-fuchsia-400 via-purple-400 to-cyan-400',
    colors: { from: 'fuchsia-500', via: 'purple-500', to: 'cyan-500' },
    preview: {
      bg: '#0a0a0f',
      text: 'from-fuchsia-400 via-purple-400 to-cyan-400',
      card: 'from-fuchsia-500/10 via-purple-500/10 to-cyan-500/10',
      border: 'border-fuchsia-500/20',
      glow: 'shadow-[0_0_60px_rgba(217,70,239,0.3)]'
    }
  },
  {
    id: 'mint',
    name: 'Neon Mint',
    description: 'Fresh & Modern',
    icon: Leaf,
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    colors: { from: 'emerald-500', via: 'teal-500', to: 'cyan-500' },
    preview: {
      bg: '#0a0f0f',
      text: 'from-emerald-400 via-teal-400 to-cyan-400',
      card: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10',
      border: 'border-emerald-500/20',
      glow: 'shadow-[0_0_60px_rgba(16,185,129,0.3)]'
    }
  },
  {
    id: 'fire',
    name: 'Fire Blaze',
    description: 'Bold & Powerful',
    icon: Flame,
    gradient: 'from-red-400 via-orange-400 to-yellow-400',
    colors: { from: 'red-500', via: 'orange-500', to: 'yellow-500' },
    preview: {
      bg: '#0f0a0a',
      text: 'from-red-400 via-orange-400 to-yellow-400',
      card: 'from-red-500/10 via-orange-500/10 to-yellow-500/10',
      border: 'border-red-500/20',
      glow: 'shadow-[0_0_60px_rgba(239,68,68,0.3)]'
    }
  },
  {
    id: 'moonlight',
    name: 'Moonlight',
    description: 'Calm & Sophisticated',
    icon: Moon,
    gradient: 'from-blue-400 via-indigo-400 to-purple-400',
    colors: { from: 'blue-500', via: 'indigo-500', to: 'purple-500' },
    preview: {
      bg: '#0a0a0f',
      text: 'from-blue-400 via-indigo-400 to-purple-400',
      card: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
      border: 'border-blue-500/20',
      glow: 'shadow-[0_0_60px_rgba(59,130,246,0.3)]'
    }
  }
];

interface ColorSchemeSelectorProps {
  onSelect: (scheme: ColorScheme) => void;
  onClose: () => void;
}

export function ColorSchemeSelector({ onSelect, onClose }: ColorSchemeSelectorProps) {
  const [selectedScheme, setSelectedScheme] = useState<string>('pink-purple');

  const handleSelect = (scheme: ColorScheme) => {
    setSelectedScheme(scheme.id);
    onSelect(scheme);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-[#0a0a0f] rounded-3xl border border-white/10 p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="mb-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Choose Your Color Vibe
          </h2>
          <p className="text-gray-400">
            Pick a color scheme that matches your brand personality
          </p>
        </div>

        {/* Color Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {colorSchemes.map((scheme, index) => {
            const Icon = scheme.icon;
            return (
              <motion.button
                key={scheme.id}
                onClick={() => handleSelect(scheme)}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`relative p-6 rounded-2xl backdrop-blur-xl border-2 transition-all ${
                    selectedScheme === scheme.id
                      ? `${scheme.preview.border} ${scheme.preview.glow}`
                      : 'border-white/10 hover:border-white/20'
                  }`}
                  style={{ background: scheme.preview.bg }}
                >
                  {/* Selected Check */}
                  {selectedScheme === scheme.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r ${scheme.gradient} flex items-center justify-center`}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${scheme.gradient} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Name */}
                  <h3 className={`mb-1 bg-gradient-to-r ${scheme.gradient} bg-clip-text text-transparent`}>
                    {scheme.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4">
                    {scheme.description}
                  </p>

                  {/* Gradient Preview */}
                  <div className="space-y-2">
                    <div className={`h-2 rounded-full bg-gradient-to-r ${scheme.gradient}`} />
                    <div className="grid grid-cols-3 gap-2">
                      <div className={`h-8 rounded-lg bg-${scheme.colors.from}/20 border border-${scheme.colors.from}/30`} />
                      <div className={`h-8 rounded-lg bg-${scheme.colors.via}/20 border border-${scheme.colors.via}/30`} />
                      <div className={`h-8 rounded-lg bg-${scheme.colors.to}/20 border border-${scheme.colors.to}/30`} />
                    </div>
                  </div>

                  {/* Sample Text */}
                  <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className={`text-xs bg-gradient-to-r ${scheme.gradient} bg-clip-text text-transparent`}>
                      Sample Text Preview
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={() => {
              const scheme = colorSchemes.find(s => s.id === selectedScheme);
              if (scheme) {
                onSelect(scheme);
                onClose();
              }
            }}
            className={`px-6 py-3 rounded-xl bg-gradient-to-r ${
              colorSchemes.find(s => s.id === selectedScheme)?.gradient || 'from-pink-500 via-purple-500 to-indigo-500'
            } hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all`}
            style={{ fontWeight: 600 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Color Scheme
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
