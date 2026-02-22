import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Book, Moon, Sun, Trash2, LogOut, Heart, Cloud, Download } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [poem, setPoem] = useState({ title: '', content: '', mood: 'Peaceful' });
  const [myPoems, setMyPoems] = useState([]);
  const [message, setMessage] = useState('');

  // --- THE MISSING FUNCTION IS HERE ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // THEME MAP
  const themes = {
    Peaceful: {
      bg: "from-pink-50 via-white to-purple-100",
      card: "bg-white/60",
      accent: "text-rose-400",
      btn: "bg-rose-400 hover:bg-rose-500",
      icon: <Cloud className="w-10 h-10 opacity-20" />,
      blob: "bg-rose-200"
    },
    Romantic: {
      bg: "from-red-50 via-rose-50 to-pink-100",
      card: "bg-white/70",
      accent: "text-red-400",
      btn: "bg-red-400 hover:bg-red-500",
      icon: <Heart className="w-10 h-10 opacity-20" />,
      blob: "bg-red-200"
    },
    Melancholy: {
      bg: "from-slate-100 via-indigo-50 to-blue-100",
      card: "bg-white/50",
      accent: "text-indigo-400",
      btn: "bg-indigo-400 hover:bg-indigo-500",
      icon: <Moon className="w-10 h-10 opacity-20" />,
      blob: "bg-indigo-200"
    },
    Joyful: {
      bg: "from-orange-50 via-yellow-50 to-amber-100",
      card: "bg-white/80",
      accent: "text-amber-500",
      btn: "bg-amber-400 hover:bg-amber-500",
      icon: <Sun className="w-10 h-10 opacity-20" />,
      blob: "bg-amber-200"
    }
  };

  const currentTheme = themes[poem.mood];

  const fetchPoems = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/poems', {
        headers: { Authorization: token }
      });
      setMyPoems(response.data);
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
    }
  };

  useEffect(() => { fetchPoems(); }, []);

  const handleSavePoem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/poems', poem, {
        headers: { Authorization: token }
      });
      setMessage("Verse archived.");
      setPoem({ ...poem, title: '', content: '' });
      fetchPoems();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) { alert("Error saving verse."); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this verse?")) {
      await axios.delete(`http://localhost:5000/api/poems/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      fetchPoems();
    }
  };

  const downloadPoem = (p) => {
    const element = document.createElement("a");
    const file = new Blob([`Title: ${p.title}\nMood: ${p.mood}\n\n${p.content}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${p.title}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 bg-gradient-to-br ${currentTheme.bg} p-4 md:p-8 relative overflow-hidden font-sans text-slate-800`}>
      
      {/* DECORATIVE FLOATING ICONS */}
      <motion.div animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="fixed top-20 left-10 text-slate-400/10 pointer-events-none">
        <PenTool size={120} />
      </motion.div>
      <motion.div animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 8 }} className="fixed bottom-20 right-10 text-slate-400/10 pointer-events-none">
        <Book size={150} />
      </motion.div>

      {/* BACKGROUND BLOBS */}
      <div className={`fixed -top-20 -left-20 w-96 h-96 rounded-full blur-[120px] transition-colors duration-1000 ${currentTheme.blob} opacity-30`}></div>
      <div className={`fixed -bottom-20 -right-20 w-96 h-96 rounded-full blur-[120px] transition-colors duration-1000 ${currentTheme.blob} opacity-30`}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="flex justify-between items-center mb-12 px-4">
          <div className="flex items-center gap-4">
            <img src="/icon.png" alt="VerseVault Logo" className="w-12 h-12 drop-shadow-lg" />
            <div>
              <h1 className="text-4xl font-serif font-black text-slate-800 tracking-tight italic">VerseVault</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-bold">The Poet's Sanctuary</p>
            </div>
          </div>
          <button onClick={handleLogout} className="p-3 bg-white/40 backdrop-blur-md rounded-full hover:bg-red-50 hover:text-red-500 transition-all shadow-sm border border-white/50">
            <LogOut size={20} />
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <motion.div layout className="lg:col-span-5">
            <div className={`backdrop-blur-2xl border border-white/60 p-8 md:p-10 rounded-[3rem] shadow-2xl ${currentTheme.card} transition-all duration-1000 sticky top-10`}>
              
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif font-bold text-slate-700 italic">Compose</h2>
                {currentTheme.icon}
              </div>

              <div className="flex gap-2 mb-8 bg-white/20 p-1.5 rounded-full w-fit overflow-x-auto">
                {Object.keys(themes).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPoem({ ...poem, mood: m })}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${
                      poem.mood === m ? 'bg-white text-slate-800 shadow-md' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSavePoem} className="space-y-6">
                <input 
                  type="text" 
                  placeholder="The Title..." 
                  className="w-full bg-transparent border-b border-slate-200 py-2 outline-none font-serif text-2xl placeholder:text-slate-300 focus:border-rose-300 transition-colors"
                  value={poem.title}
                  onChange={(e) => setPoem({ ...poem, title: e.target.value })}
                  required
                />
                <textarea 
                  placeholder="Where do your words want to go?" 
                  rows="10" 
                  className="w-full bg-transparent outline-none font-serif text-lg leading-relaxed resize-none placeholder:text-slate-300"
                  value={poem.content}
                  onChange={(e) => setPoem({ ...poem, content: e.target.value })}
                  required
                />
                <div className="flex justify-between items-center pt-4">
                  <span className="text-xs italic text-rose-400">{message}</span>
                  <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    type="submit" 
                    className={`px-10 py-4 rounded-2xl text-white font-bold shadow-xl transition-all ${currentTheme.btn}`}
                  >
                    Seal Verse
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-8 px-4">Mood Archive</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {myPoems.map((p, index) => (
                  <motion.div
                    key={p._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-8 rounded-[2.5rem] border border-white/60 shadow-sm relative group hover:shadow-xl transition-all ${themes[p.mood]?.card || 'bg-white/60'}`}
                  >
                    <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => downloadPoem(p)} className="p-2 text-slate-400 hover:text-indigo-500 transition-colors">
                        <Download size={18} />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <span className={`text-[9px] font-bold uppercase tracking-widest mb-3 block ${themes[p.mood]?.accent}`}>
                      {p.mood}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-slate-800 mb-4">{p.title}</h3>
                    <p className="text-slate-600 font-serif leading-relaxed italic border-l-2 border-slate-100 pl-4 mb-4 whitespace-pre-wrap">
                      "{p.content}"
                    </p>
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">
                      {new Date(p.date).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;