import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mail, User, ArrowRight } from 'lucide-react';

interface TrialModalContentProps {
  onClose: () => void;
}

export function TrialModalContent({ onClose }: TrialModalContentProps) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setFormData({ name: '', email: '' });
    }, 2000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-10 h-10" />
        </div>
        <h4 className="mb-2">Welcome to CreatorOS! 🎉</h4>
        <p className="text-gray-400">Check your email to get started.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Full Name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            placeholder="Enter your name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20">
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            14-day free trial
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            No credit card required
          </li>
          <li className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            Cancel anytime
          </li>
        </ul>
      </div>

      <motion.button
        type="submit"
        className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
        style={{ fontWeight: 600 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Start Free Trial
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </form>
  );
}
