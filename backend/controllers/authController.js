const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); // <-- New: We need this to make the digital ID card

// 1. Function to Register a New User (You already built this!)
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// 2. NEW: Function to Login a User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by their email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the password matches the encrypted one in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Create the Digital ID Card (JWT Token)
        const token = jwt.sign(
            { id: user._id }, // We pack their database ID inside the token
            process.env.JWT_SECRET, // We sign it with our secret key
            { expiresIn: '7d' } // The token expires in 7 days
        );

        // Send the token and user info back to the frontend
        res.status(200).json({
            message: "Login successful!",
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

// Export both functions now
module.exports = { registerUser, loginUser };