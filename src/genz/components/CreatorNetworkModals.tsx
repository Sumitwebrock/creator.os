import React from 'react';
import { motion } from 'motion/react';
import { X, Users, Star, MapPin, Calendar, DollarSign, Copy, MessageCircle, Briefcase, Award, TrendingUp, CheckCircle, Camera, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { copyToClipboard } from '../utils/clipboard';

// Creator Profile Details Data
const creatorProfileDetails: Record<string, {
  fullBio: string;
  location: string;
  experience: string;
  specializations: string[];
  portfolio: {
    title: string;
    views: string;
    engagement: string;
  }[];
  rates: {
    hourly: string;
    project: string;
    collab: string;
  };
  availability: {
    status: string;
    nextAvailable: string;
    workingHours: string;
  };
  equipment: string[];
  collaborations: string[];
  achievements: string[];
  responseTime: string;
  completionRate: string;
  clientSatisfaction: string;
  testimonials: {
    name: string;
    role: string;
    text: string;
  }[];
}> = {
  "Sarah Chen": {
    fullBio: "Award-winning videographer with 5+ years specializing in cinematic storytelling for creators and brands. Known for stunning color work and emotional narratives. Based in Mumbai, available for local shoots and remote color grading work.",
    location: "Mumbai, Maharashtra",
    experience: "5 years professional",
    specializations: ["Cinematic Videography", "Color Grading", "Documentary Style", "Product Shoots", "Interview Setup"],
    portfolio: [
      { title: "Tech Product Launch Film", views: "450K", engagement: "12.8%" },
      { title: "Creator Documentary Series", views: "380K", engagement: "15.2%" },
      { title: "Brand Story: Sustainable Fashion", views: "290K", engagement: "10.5%" }
    ],
    rates: {
      hourly: "₹2,500/hour",
      project: "₹15,000 - ₹45,000",
      collab: "Revenue share or trade"
    },
    availability: {
      status: "Available",
      nextAvailable: "This week",
      workingHours: "Mon-Fri, 10 AM - 7 PM IST"
    },
    equipment: ["Sony A7IV", "DaVinci Resolve Studio", "Premiere Pro", "DJI Ronin", "Lighting Kit", "Audio Recorder"],
    collaborations: ["Worked with 50+ creators", "15+ brand campaigns", "Featured in Vimeo Staff Picks"],
    achievements: [
      "🏆 Best Cinematography - Creator Awards 2023",
      "⭐ 4.9/5 rating (127 reviews)",
      "🎬 3M+ combined views on portfolio",
      "✅ 98% project completion rate"
    ],
    responseTime: "Under 2 hours",
    completionRate: "98%",
    clientSatisfaction: "4.9/5.0",
    testimonials: [
      {
        name: "Rohan Kumar",
        role: "Tech Creator • 250K subs",
        text: "Sarah transformed my content quality overnight. The cinematography and color grading are next level. Professional, fast, and a pleasure to work with."
      },
      {
        name: "Priya Sharma",
        role: "Lifestyle Brand",
        text: "We've worked with Sarah on 3 campaigns now. Her visual storytelling is unmatched. She understands brand voice and delivers beyond expectations every time."
      }
    ]
  },
  "Mike Johnson": {
    fullBio: "Professional audio engineer specializing in podcast production, voice-over work, and music for content creators. 7 years of studio experience. Expert in making budget recordings sound premium through advanced mixing and mastering techniques.",
    location: "Bangalore, Karnataka",
    experience: "7 years professional",
    specializations: ["Podcast Production", "Audio Mixing", "Voice-Over Recording", "Sound Design", "Music Production"],
    portfolio: [
      { title: "Top 10 Podcast - Full Production", views: "2M+ downloads", engagement: "N/A" },
      { title: "Brand Audio Identity Package", views: "Used by 500K+ creators", engagement: "N/A" },
      { title: "YouTube Audio Enhancement", views: "150+ videos improved", engagement: "Avg +23% retention" }
    ],
    rates: {
      hourly: "₹2,000/hour",
      project: "₹8,000 - ₹30,000",
      collab: "Available for profit share"
    },
    availability: {
      status: "Available",
      nextAvailable: "Next week",
      workingHours: "Tue-Sat, 11 AM - 8 PM IST"
    },
    equipment: ["Shure SM7B", "Universal Audio Interface", "Pro Tools", "Waves Plugins", "Acoustic Treatment Studio", "Multiple Mic Options"],
    collaborations: ["150+ podcast episodes produced", "Audio work featured in Netflix documentary", "Collaborated with top 50 Indian podcasts"],
    achievements: [
      "🎙️ Produced 10+ top-charting podcasts",
      "⭐ 4.8/5 rating (203 reviews)",
      "🎵 Certified Pro Tools Expert",
      "✅ 100% on-time delivery record"
    ],
    responseTime: "Under 3 hours",
    completionRate: "100%",
    clientSatisfaction: "4.8/5.0",
    testimonials: [
      {
        name: "Anika Desai",
        role: "Podcast Host • Top 20 Charts",
        text: "Mike's audio engineering took our podcast from amateur to professional overnight. Our listener retention went up 40% after working with him. Worth every rupee!"
      },
      {
        name: "Dev Malhotra",
        role: "YouTube Creator • 180K subs",
        text: "I sent Mike my raw audio and he worked absolute magic. My videos sound like they were recorded in a pro studio now. Fast turnaround and super affordable."
      }
    ]
  },
  "Alex Rivera": {
    fullBio: "Elite video editor known for viral-style editing and motion graphics. Specializes in YouTube content optimization, fast-paced edits, and eye-catching animations. Has edited videos with 50M+ combined views. Booked 3 months in advance but available for select projects.",
    location: "Delhi NCR",
    experience: "8 years professional",
    specializations: ["Viral Video Editing", "Motion Graphics", "YouTube Optimization", "Fast-Paced Edits", "Thumbnail Design"],
    portfolio: [
      { title: "MrBeast-Style Challenge Edit", views: "5.2M", engagement: "18.4%" },
      { title: "Tech Review with Motion Graphics", views: "3.8M", engagement: "14.7%" },
      { title: "Documentary Edit: Startup Story", views: "2.1M", engagement: "22.1%" }
    ],
    rates: {
      hourly: "₹4,000/hour",
      project: "₹25,000 - ₹80,000",
      collab: "Only for exceptional projects"
    },
    availability: {
      status: "Booked (Waitlist available)",
      nextAvailable: "Mid February 2025",
      workingHours: "Project-based, flexible hours"
    },
    equipment: ["Final Cut Pro X", "After Effects CC", "DaVinci Resolve", "Cinema 4D", "Mac Studio Ultra", "Multiple monitors"],
    collaborations: ["Edited for creators with 100M+ combined reach", "Agency partnerships with 5+ top brands", "Featured editor on YouTube Creator Insider"],
    achievements: [
      "🏆 Editor of the Year - Creator Awards 2023",
      "⭐ 5.0/5 perfect rating (89 reviews)",
      "📈 Videos edited: 50M+ combined views",
      "🎬 100+ viral videos (1M+ views each)"
    ],
    responseTime: "Under 12 hours",
    completionRate: "100%",
    clientSatisfaction: "5.0/5.0",
    testimonials: [
      {
        name: "Kabir Mehta",
        role: "Gaming Creator • 2M subs",
        text: "Alex is THE best. My channel grew 500% after we started working together. The edits are so addictive people can't stop watching. Expensive but worth it 100%."
      },
      {
        name: "Tech Brand Inc",
        role: "Fortune 500 Company",
        text: "We've worked with agencies charging 10x more and Alex delivers better results. The motion graphics and pacing are world-class. Our launch video hit 5M views in a week."
      }
    ]
  }
};

// Creator Profile Detail Modal
export function CreatorProfileModal({ 
  name,
  skill,
  followers,
  rating,
  skills,
  available,
  onClose 
}: { 
  name: string;
  skill: string;
  followers: string;
  rating: number;
  skills: string[];
  available: boolean;
  onClose: () => void;
}) {
  const details = creatorProfileDetails[name];

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div
        className="relative w-full max-w-4xl max-h-[85vh] bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-transparent backdrop-blur-2xl border border-violet-500/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(139,92,246,0.4)]"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-violet-500/20 to-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                {name.charAt(0)}
              </div>
              <div>
                <h3 className="text-2xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                  {name}
                </h3>
                <p className="text-gray-400 mt-1">{skill}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span className="text-sm">{rating}</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center gap-1 text-purple-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{followers}</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {available ? 'Available' : 'Booked'}
                  </span>
                </div>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-220px)] custom-scrollbar space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl text-violet-400 mb-1">{details?.responseTime}</p>
              <p className="text-xs text-gray-400">Response Time</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl text-purple-400 mb-1">{details?.completionRate}</p>
              <p className="text-xs text-gray-400">Completion Rate</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-2xl text-pink-400 mb-1">{details?.clientSatisfaction}</p>
              <p className="text-xs text-gray-400">Client Rating</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-violet-400" />
              <p className="text-violet-400 text-sm">About</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-200 leading-relaxed">{details?.fullBio}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {details?.location}
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  {details?.experience}
                </div>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-purple-400" />
              <p className="text-purple-400 text-sm">Specializations</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {details?.specializations.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 text-sm text-purple-300"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio Highlights */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-pink-400" />
              <p className="text-pink-400 text-sm">Portfolio Highlights</p>
            </div>
            <div className="space-y-3">
              {details?.portfolio.map((project, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                  <p className="text-gray-200 mb-2">{project.title}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-pink-400">
                      <TrendingUp className="w-3 h-3" />
                      {project.views} views
                    </div>
                    {project.engagement !== "N/A" && (
                      <>
                        <span className="text-gray-500">•</span>
                        <div className="text-purple-400">
                          {project.engagement} engagement
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rates */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-green-400" />
              <p className="text-green-400 text-sm">Rates & Pricing</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center">
                <p className="text-xs text-gray-400 mb-2">Hourly</p>
                <p className="text-lg text-green-400">{details?.rates.hourly}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center">
                <p className="text-xs text-gray-400 mb-2">Project</p>
                <p className="text-sm text-green-400">{details?.rates.project}</p>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 text-center">
                <p className="text-xs text-gray-400 mb-2">Collab</p>
                <p className="text-sm text-purple-400">{details?.rates.collab}</p>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-blue-400" />
              <p className="text-blue-400 text-sm">Availability</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Status</p>
                  <p className="text-sm text-gray-200">{details?.availability.status}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Next Available</p>
                  <p className="text-sm text-gray-200">{details?.availability.nextAvailable}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-400 mb-1">Working Hours</p>
                  <p className="text-sm text-gray-200">{details?.availability.workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-indigo-400" />
              <p className="text-indigo-400 text-sm">Equipment & Tools</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {details?.equipment.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-yellow-400" />
              <p className="text-yellow-400 text-sm">Achievements & Recognition</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {details?.achievements.map((achievement, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                  <p className="text-gray-200 text-sm">{achievement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-pink-400" />
              <p className="text-pink-400 text-sm">Client Testimonials</p>
            </div>
            <div className="space-y-3">
              {details?.testimonials.map((testimonial, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-gray-200 text-sm italic mb-3">"{testimonial.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xs">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm text-white">{testimonial.name}</p>
                      <p className="text-xs text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-white/10 bg-gradient-to-r from-violet-500/10 to-purple-500/10 flex gap-3">
          <button
            onClick={() => {
              const profileInfo = `${name} - ${skill}\n\n${details?.fullBio}\n\nRates:\n• Hourly: ${details?.rates.hourly}\n• Project: ${details?.rates.project}\n• Collab: ${details?.rates.collab}\n\nContact for: ${details?.availability.status}`;
              copyToClipboard(profileInfo);
              toast.success('📋 Profile details copied!');
            }}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={() => {
              toast.success(`💬 Chat opened with ${name}!`);
              onClose();
            }}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Send Message
          </button>
          <button
            onClick={() => {
              if (!available) {
                toast.error('This creator is currently booked. Join the waitlist?');
              } else {
                toast.success(`🤝 Collaboration request sent to ${name}!`);
                onClose();
              }
            }}
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            disabled={!available}
          >
            {available ? 'Request Collab' : 'Join Waitlist'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
