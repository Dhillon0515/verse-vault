import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Mail, Lock, PenTool, Sparkles } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // REPLACE THIS with your actual Render URL
  const API_URL = "https://verse-vault-tjxk.onrender.com/api/auth/register";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(API_URL, formData);
      // If registration is successful, send them to login
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-100 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-40"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full backdrop-blur-xl bg-white/60 border border-white/80 p-10 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-4">
             <img src="/favicon.png" alt="Logo" className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">Join VerseVault</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium italic">Begin your poetic journey</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-500 text-xs font-bold rounded-2xl border border-red-100 text-center uppercase tracking-wider">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* USERNAME */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white rounded-2xl outline-none focus:ring-2 focus:ring-rose-200 transition-all font-medium placeholder:text-slate-300"
              onChange={handleChange}
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white rounded-2xl outline-none focus:ring-2 focus:ring-rose-200 transition-all font-medium placeholder:text-slate-300"
              onChange={handleChange}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white rounded-2xl outline-none focus:ring-2 focus:ring-rose-200 transition-all font-medium placeholder:text-slate-300"
              onChange={handleChange}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-rose-400 text-white font-bold rounded-2xl shadow-lg shadow-rose-200 hover:bg-rose-500 transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Creating Vault..." : (
              <>
                <Sparkles size={18} /> Create Account
              </>
            )}
          </motion.button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-sm font-medium">
          Already have a sanctuary?{' '}
          <Link to="/login" className="text-rose-500 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
      
      {/* DECORATIVE FLOATING ELEMENT */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 4 }}
        className="fixed top-10 right-10 text-rose-300/20"
      >
        <PenTool size={100} />
      </motion.div>
    </div>
  );
};

export default Register;