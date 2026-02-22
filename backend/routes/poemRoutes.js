const express = require('express');
const router = express.Router();

// Import the logic from our controller
const { 
    createPoem, 
    getPoems, 
    deletePoem 
} = require('../controllers/poemController');

// Import the security guard (middleware)
const { protect } = require('../middleware/authMiddleware');

/**
 * All routes below are prefixed with /api/poems in server.js
 */

// @route   POST /api/poems
// @desc    Save a new poem to the database
// @access  Private (Requires Token)
router.post('/', protect, createPoem);

// @route   GET /api/poems
// @desc    Get all poems belonging to the logged-in user
// @access  Private (Requires Token)
router.get('/', protect, getPoems);

// @route   DELETE /api/poems/:id
// @desc    Remove a specific poem using its unique ID
// @access  Private (Requires Token)
router.delete('/:id', protect, deletePoem);

module.exports = router;