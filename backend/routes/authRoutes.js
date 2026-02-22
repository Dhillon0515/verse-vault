const express = require('express');
const router = express.Router();
// Import BOTH functions from the controller
const { registerUser, loginUser } = require('../controllers/authController');

// The Registration Door
router.post('/register', registerUser);

// NEW: The Login Door
router.post('/login', loginUser);

module.exports = router;