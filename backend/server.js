const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // <-- 1. IMPORT CORS HERE
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes'); 
const poemRoutes = require('./routes/poemRoutes');
dotenv.config();
connectDB();

const app = express();

// <-- 2. TELL THE SERVER TO USE CORS HERE (Put it before the routes!)
app.use(cors({
  origin: "https://verse-vault-seven.vercel.app", // Your Vercel URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes); 
app.use('/api/poems', poemRoutes);
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});