import { useState } from 'react';
import { ColorSchemeSelector } from './components/ColorSchemeSelector';
import { motion } from 'motion/react';
import { Sparkles, Palette } from 'lucide-react';

export default function ColorPreview() {
  const [showSelector, setShowSelector] = useState(true);

  const handleSelect = (scheme: any) => {
    console.log('Selected scheme:', scheme);
    alert(`You selected: ${scheme.name}\n\nI'll now apply this color scheme to your entire website!`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(236, 72, 153, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(236, 72, 153, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-purple-500/30 mb-6">
            <Palette className="w-5 h-5 text-pink-400" />
            <span className="text-gray-300">Color Scheme Options</span>
          </div>
        </motion.div>

        <motion.h1
          className="mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Pick Your Perfect Vibe 🎨
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Choose from 8 hand-crafted Gen-Z color schemes
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {[
            { name: 'Pink Paradise', gradient: 'from-pink-400 via-purple-400 to-indigo-400', desc: 'Current' },
            { name: 'Cyber Ocean', gradient: 'from-cyan-400 via-blue-400 to-indigo-400', desc: 'Professional' },
            { name: 'Sunset Vibes', gradient: 'from-orange-400 via-pink-400 to-purple-400', desc: 'Energetic' },
            { name: 'Matrix Green', gradient: 'from-lime-400 via-green-400 to-emerald-400', desc: 'Tech' },
            { name: 'Synthwave', gradient: 'from-fuchsia-400 via-purple-400 to-cyan-400', desc: 'Retro' },
            { name: 'Neon Mint', gradient: 'from-emerald-400 via-teal-400 to-cyan-400', desc: 'Fresh' },
            { name: 'Fire Blaze', gradient: 'from-red-400 via-orange-400 to-yellow-400', desc: 'Bold' },
            { name: 'Moonlight', gradient: 'from-blue-400 via-indigo-400 to-purple-400', desc: 'Calm' },
          ].map((scheme, idx) => (
            <motion.div
              key={scheme.name}
              className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`h-20 rounded-xl bg-gradient-to-r ${scheme.gradient} mb-3`} />
              <p className={`mb-1 bg-gradient-to-r ${scheme.gradient} bg-clip-text text-transparent`} style={{ fontWeight: 600 }}>
                {scheme.name}
              </p>
              <p className="text-xs text-gray-400">{scheme.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {!showSelector && (
          <motion.button
            onClick={() => setShowSelector(true)}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all inline-flex items-center gap-2"
            style={{ fontWeight: 600 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Sparkles className="w-5 h-5" />
            Open Color Selector
          </motion.button>
        )}
      </div>

      {/* Color Selector Modal */}
      {showSelector && (
        <ColorSchemeSelector
          onSelect={handleSelect}
          onClose={() => setShowSelector(false)}
        />
      )}

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-60 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
