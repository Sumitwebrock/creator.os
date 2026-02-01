import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Palette, 
  Shield, 
  CreditCard, 
  Zap,
  Mail,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Globe,
  Database,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState<'account' | 'notifications' | 'appearance' | 'privacy' | 'billing'>('account');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showEmail, setShowEmail] = useState(false);

  if (!isOpen) return null;

  const sections = [
    { id: 'account' as const, label: 'Account', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'privacy' as const, label: 'Privacy', icon: Shield },
    { id: 'billing' as const, label: 'Billing', icon: CreditCard },
  ];

  const handleSave = () => {
    toast.success('Settings saved successfully! ✨');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-5xl max-h-[85vh] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/10 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10">
          <div className="flex items-center justify-between">
            <h2 className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[calc(85vh-140px)]">
          {/* Sidebar */}
          <div className="w-64 border-r border-white/10 bg-white/5 p-4 overflow-y-auto">
            <div className="space-y-2">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <section.icon className="w-5 h-5" />
                  <span>{section.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {activeSection === 'account' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-gray-300 mb-4">Account Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Creator Pro"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Email</label>
                      <div className="relative">
                        <input
                          type={showEmail ? "email" : "password"}
                          defaultValue="creator@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                        />
                        <button
                          onClick={() => setShowEmail(!showEmail)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          {showEmail ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Username</label>
                      <input
                        type="text"
                        defaultValue="@creatorpro"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Bio</label>
                      <textarea
                        rows={3}
                        defaultValue="AI-powered creator building the future of content 🚀"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-gray-300 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <input
                      type="password"
                      placeholder="Current password"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-gray-300 mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="text-white">Email Notifications</p>
                          <p className="text-sm text-gray-400">Receive updates via email</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setEmailNotifications(!emailNotifications)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          emailNotifications ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full shadow-lg"
                          animate={{ x: emailNotifications ? 24 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-pink-400" />
                        <div>
                          <p className="text-white">Push Notifications</p>
                          <p className="text-sm text-gray-400">Get notified about important updates</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPushNotifications(!pushNotifications)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          pushNotifications ? 'bg-pink-500' : 'bg-gray-600'
                        }`}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full shadow-lg"
                          animate={{ x: pushNotifications ? 24 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center gap-3">
                        {soundEnabled ? <Volume2 className="w-5 h-5 text-indigo-400" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
                        <div>
                          <p className="text-white">Sound Effects</p>
                          <p className="text-sm text-gray-400">Play sounds for notifications</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          soundEnabled ? 'bg-indigo-500' : 'bg-gray-600'
                        }`}
                      >
                        <motion.div
                          className="w-5 h-5 bg-white rounded-full shadow-lg"
                          animate={{ x: soundEnabled ? 24 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-gray-300 mb-4">Notify me about...</h3>
                  <div className="space-y-3">
                    {[
                      'New sponsorship opportunities',
                      'AI content suggestions',
                      'Engagement milestones',
                      'Network activity',
                      'Platform updates',
                      'Weekly growth reports'
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          defaultChecked={idx < 4}
                          className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-gradient-to-r checked:from-pink-500 checked:to-purple-500 checked:border-purple-500 transition-all"
                        />
                        <span className="text-gray-400 group-hover:text-white transition-colors">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'appearance' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-gray-300 mb-4">Theme</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setDarkMode(true)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        darkMode
                          ? 'border-purple-500 bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Moon className="w-6 h-6 text-purple-400" />
                        {darkMode && <Check className="w-5 h-5 text-purple-400" />}
                      </div>
                      <p className="text-white">Dark Mode</p>
                      <p className="text-sm text-gray-400 mt-1">Easy on the eyes</p>
                    </button>

                    <button
                      onClick={() => {
                        setDarkMode(false);
                        toast.info('Light mode coming soon! ☀️');
                      }}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        !darkMode
                          ? 'border-purple-500 bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Sun className="w-6 h-6 text-yellow-400" />
                        {!darkMode && <Check className="w-5 h-5 text-purple-400" />}
                      </div>
                      <p className="text-white">Light Mode</p>
                      <p className="text-sm text-gray-400 mt-1">Coming soon</p>
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-gray-300 mb-4">Accent Color</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { name: 'Purple', gradient: 'from-pink-500 via-purple-500 to-indigo-500' },
                      { name: 'Blue', gradient: 'from-blue-500 via-cyan-500 to-teal-500' },
                      { name: 'Green', gradient: 'from-green-500 via-emerald-500 to-teal-500' },
                      { name: 'Orange', gradient: 'from-orange-500 via-red-500 to-pink-500' },
                    ].map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => toast.info(`${color.name} theme coming soon! 🎨`)}
                        className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                      >
                        <div className={`h-16 rounded-lg bg-gradient-to-r ${color.gradient} mb-2 group-hover:scale-105 transition-transform`} />
                        <p className="text-sm text-gray-400">{color.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-gray-300 mb-4">Display</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Language</label>
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                        <Globe className="w-5 h-5 text-purple-400" />
                        <select className="flex-1 bg-transparent focus:outline-none text-white">
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-gray-300 mb-4">Privacy Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-green-400 mt-1" />
                        <div className="flex-1">
                          <p className="text-white mb-1">Profile Visibility</p>
                          <p className="text-sm text-gray-400 mb-3">Control who can see your profile</p>
                          <select className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none text-white">
                            <option>Public</option>
                            <option>CreatorOS Network Only</option>
                            <option>Private</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <Database className="w-5 h-5 text-blue-400 mt-1" />
                        <div className="flex-1">
                          <p className="text-white mb-1">Data Collection</p>
                          <p className="text-sm text-gray-400 mb-3">Help us improve by sharing usage data</p>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="w-5 h-5 rounded border-2 border-white/20 bg-white/5 checked:bg-gradient-to-r checked:from-pink-500 checked:to-purple-500 checked:border-purple-500"
                            />
                            <span className="text-gray-400">Share anonymous analytics</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 text-purple-400 mt-1" />
                        <div className="flex-1">
                          <p className="text-white mb-1">Export Data</p>
                          <p className="text-sm text-gray-400 mb-3">Download all your CreatorOS data</p>
                          <button
                            onClick={() => toast.success('Data export started! Check your email. 📧')}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg transition-all"
                          >
                            Request Export
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-gray-300 mb-4">Danger Zone</h3>
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    <div className="flex items-start gap-3">
                      <Trash2 className="w-5 h-5 text-red-400 mt-1" />
                      <div className="flex-1">
                        <p className="text-white mb-1">Delete Account</p>
                        <p className="text-sm text-gray-400 mb-3">Permanently delete your account and all data</p>
                        <button
                          onClick={() => toast.error('Account deletion requires email confirmation')}
                          className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'billing' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-gray-300 mb-4">Current Plan</h3>
                  
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-purple-500/30">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-500/50 mb-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm">Pro Plan</span>
                        </div>
                        <p className="text-sm text-gray-400">Free Trial - 14 days remaining</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl">$49</p>
                        <p className="text-sm text-gray-400">/month</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {[
                        'Unlimited AI Growth Strategies',
                        'Advanced Persona Engine',
                        'Priority Sponsorship Matching',
                        'Local Creator Network Access',
                        '24/7 AI Support'
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <Check className="w-4 h-4 text-green-400" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => toast.success('Upgraded to Pro! 🎉')}
                      className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all"
                    >
                      Upgrade Now
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-gray-300 mb-4">Payment Method</h3>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-white">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-400">Expires 12/25</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toast.info('Update payment method coming soon!')}
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Update
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-gray-300 mb-4">Billing History</h3>
                  <div className="space-y-3">
                    {[
                      { date: 'Dec 1, 2024', amount: '$49.00', status: 'Paid' },
                      { date: 'Nov 1, 2024', amount: '$49.00', status: 'Paid' },
                      { date: 'Oct 1, 2024', amount: '$49.00', status: 'Paid' },
                    ].map((invoice, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-white">{invoice.date}</p>
                          <p className="text-sm text-gray-400">{invoice.amount}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-green-400">{invoice.status}</span>
                          <button
                            onClick={() => toast.success('Invoice downloaded! 📄')}
                            className="text-purple-400 hover:text-purple-300"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}
