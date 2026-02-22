const mongoose = require('mongoose');

const poemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    mood: { type: String, default: 'Peaceful' }, // <-- Add this line
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poem', poemSchema);