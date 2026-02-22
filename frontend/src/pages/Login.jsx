import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // This helps us switch pages automatically

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Send Login request to Backend
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // 2. Save the Token (Digital ID) in your browser's "Local Storage"
      // This keeps the user logged in even if they refresh the page!
      localStorage.setItem('token', response.data.token);
      
      alert("Login successful! Welcome back.");
      
      // 3. Send them to the Home/Dashboard page (we'll build this next!)
      navigate('/dashboard'); 

    } catch (error) {
      console.error("Login Error:", error.response?.data?.message);
      alert(error.response?.data?.message || "Invalid Email or Password");
    }
  };

  // Matching static image
  const bgImage = "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        
        {/* LEFT COLUMN: Image Section */}
        <div 
          className="h-64 md:h-auto md:w-1/2 bg-cover bg-center block" 
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="h-full w-full bg-indigo-900 bg-opacity-10"></div>
        </div>

        {/* RIGHT COLUMN: The Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-2 tracking-wider font-serif">VerseVault</h2>
          <p className="text-indigo-400 text-center mb-8 italic">Welcome back, poet.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border border-purple-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all" 
                placeholder="you@example.com"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
              <input 
                type="password" 
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border border-purple-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all" 
                placeholder="••••••••"
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-indigo-400 hover:bg-indigo-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-1"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? 
            <a href="/register" className="text-indigo-500 hover:text-indigo-600 font-semibold ml-1">Sign up here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;