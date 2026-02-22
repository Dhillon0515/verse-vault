import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending data to the backend
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      console.log("Success:", response.data);
      alert("Welcome to VerseVault! Your account is created.");
      
      // Automatically redirect to the Login page
      navigate('/login');

    } catch (error) {
      // Handling errors (like user already exists)
      console.error("Registration Error:", error.response?.data?.message);
      alert(error.response?.data?.message || "Something went wrong during registration");
    }
  };

  // Aesthetic static image for the poetic theme
  const bgImage = "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        
        {/* LEFT COLUMN: The Image (Visible on all screens with height adjustment) */}
        <div 
          className="h-48 md:h-auto md:w-1/2 bg-cover bg-center block" 
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Subtle overlay to blend with the pastel theme */}
          <div className="h-full w-full bg-indigo-900 bg-opacity-5"></div>
        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-2 tracking-wider font-serif">VerseVault</h2>
          <p className="text-indigo-400 text-center mb-8 italic">Begin your poetic journey.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Username</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-purple-50 border border-purple-100 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all" 
                placeholder="poet_name"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-1">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
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
                value={formData.password}
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
              Create My Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account? 
            <button 
              onClick={() => navigate('/login')} 
              className="text-indigo-500 hover:text-indigo-600 font-semibold ml-1 cursor-pointer"
            >
              Log in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;