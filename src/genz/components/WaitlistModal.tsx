import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';

interface WaitlistModalContentProps {
  onClose: () => void;
}

export function WaitlistModalContent({ onClose }: WaitlistModalContentProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setEmail('');
    }, 2000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-10 h-10" />
        </div>
        <h4 className="mb-2">You're on the list! 🚀</h4>
        <p className="text-gray-400">We'll notify you when we launch.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-gray-300">
        Join the waitlist to get early access to CreatorOS and exclusive launch benefits.
      </p>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <p className="text-sm text-gray-300 mb-3">Early access benefits:</p>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• 50% off lifetime discount</li>
          <li>• Priority support</li>
          <li>• Exclusive features</li>
        </ul>
      </div>

      <motion.button
        type="submit"
        className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all duration-300 flex items-center justify-center gap-2"
        style={{ fontWeight: 600 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Join Waitlist
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </form>
  );
}
