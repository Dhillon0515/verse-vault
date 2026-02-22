const Poem = require('../models/Poem');

// Create a new poem
const createPoem = async (req, res) => {
    try {
        const { title, content ,mood} = req.body;
        const newPoem = new Poem({
            user: req.user, // Got this from the middleware!
            title,
            content,
            mood
        });
        const savedPoem = await newPoem.save();
        res.status(201).json(savedPoem);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all poems for the logged-in user
const getPoems = async (req, res) => {
    try {
        const poems = await Poem.find({ user: req.user }).sort({ date: -1 });
        res.status(200).json(poems);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// Delete a specific poem
const deletePoem = async (req, res) => {
    try {
        const poem = await Poem.findById(req.params.id);

        if (!poem) {
            return res.status(404).json({ message: "Poem not found" });
        }

        // Check if the poem belongs to the user trying to delete it
        if (poem.user.toString() !== req.user) {
            return res.status(401).json({ message: "Not authorized to delete this verse" });
        }

        await poem.deleteOne();
        res.status(200).json({ message: "Verse removed from vault" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
module.exports = { createPoem, getPoems, deletePoem };