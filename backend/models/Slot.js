// models/Slot.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    date: { type: String, required: true }, // e.g., "2025-04-21"
    time: { type: String, required: true }, // e.g., "09:00"
    booked: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
