import { useState } from 'react';
import { X, Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    toast.success(isSignup ? 'Welcome to CreatorOS! 🎉 Your free trial has started.' : 'Welcome back! 🎉');
  };

  const handleGoogleLogin = async () => {
    try {
      if (!supabase) {
        toast.error('Supabase is not configured for Google login.');
        return;
      }

      const redirectTo = typeof window !== 'undefined'
        ? `${window.location.origin}/dashboard`
        : undefined;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
        },
      });

      if (error) {
        toast.error(`Google sign-in failed: ${error.message}`);
        return;
      }

      // Supabase will handle the redirect; we just show a quick message.
      toast.success('Redirecting to Google to sign you in...');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong during Google sign-in.';
      toast.error(message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glassmorphic Card */}
              <div className="relative bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-indigo-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-[0_8px_32px_rgba(168,85,247,0.3)]">
                {/* Gradient Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-50" />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center mb-3">
                      <span className="text-xl bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                        CreatorOS
                      </span>
                    </div>
                    <h2 className="mb-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                      {isSignup ? 'Join CreatorOS' : 'Welcome Back'}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {isSignup ? 'Start your free trial today' : 'Continue your growth journey'}
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm mb-1.5 text-gray-300" style={{ fontWeight: 500 }}>
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:bg-white/10 focus:outline-none transition-all text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <label className="block text-sm mb-1.5 text-gray-300" style={{ fontWeight: 500 }}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:bg-white/10 focus:outline-none transition-all text-white placeholder:text-gray-500"
                        />
                      </div>
                    </div>

                    {/* Forgot Password */}
                    {!isSignup && (
                      <div className="text-right">
                        <button
                          type="button"
                          className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="group w-full px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all flex items-center justify-center gap-2"
                      style={{ fontWeight: 600 }}
                    >
                      {isSignup ? 'Start Free Trial' : 'Login'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Toggle Sign Up / Login */}
                    <div className="text-center pt-1">
                      <p className="text-sm text-gray-400">
                        {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                          type="button"
                          onClick={() => setIsSignup(!isSignup)}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                          style={{ fontWeight: 600 }}
                        >
                          {isSignup ? 'Login' : 'Sign up free'}
                        </button>
                      </p>
                    </div>
                  </form>

                  {/* Social Login */}
                  <div className="mt-5 pt-5 border-t border-white/10">
                    <p className="text-xs text-center text-gray-500 mb-3">
                      Or continue with
                    </p>
                    <button
                      type="button"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 text-sm"
                      style={{ fontWeight: 500 }}
                      onClick={handleGoogleLogin}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                  </div>

                  {/* Trial Info */}
                  {isSignup && (
                    <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                      <p className="text-xs text-center text-gray-400">
                        ✨ Start with <span className="text-purple-400" style={{ fontWeight: 600 }}>14 days free</span> • No credit card required
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}