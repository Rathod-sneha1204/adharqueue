const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

// Get available slots for a specific date
router.get('/available', async (req, res) => {
    const { date } = req.query;

    try {
        if (!date) return res.status(400).json({ message: 'Date is required' });

        // Fetch available slots for that date (only those not booked)
        const slots = await Slot.find({ date, booked: false });
        if (slots.length === 0) return res.status(404).json({ message: 'No available slots for this date' });

        res.json(slots);
    } catch (error) {
        console.error('Error fetching slots:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create slots for a specific date (time slots: 09:00, 10:00, etc.)
router.post('/create', async (req, res) => {
    const { date } = req.body;
    const times = ['09:00', '10:00', '11:00', '12:00', '14:00']; // Add more times as needed

    try {
        const existing = await Slot.find({ date });
        if (existing.length > 0) return res.status(400).json({ message: 'Slots already exist for this date' });

        // Create slots for the specified date
        const slots = times.map(time => ({ date, time, booked: false }));
        await Slot.insertMany(slots);

        res.status(201).json({ message: 'Slots created', slots });
    } catch (error) {
        console.error('Error creating slots:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Book a slot (mark the slot as booked)
router.post('/book', async (req, res) => {
    const { userId, slotId, date, time } = req.body;

    try {
        const slot = await Slot.findById(slotId);
        if (!slot) return res.status(404).json({ message: 'Slot not found' });
        if (slot.booked) return res.status(400).json({ message: 'Slot already booked' });

        // Mark the slot as booked
        slot.booked = true;
        slot.userId = userId; // Store the user who booked the slot
        await slot.save();

        res.status(200).json({ message: 'Slot booked', date: slot.date, time: slot.time });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: 'Booking failed' });
    }
});

// Cancel a slot (mark the slot as available again)
router.delete('/:id', async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);
        if (!slot) return res.status(404).json({ message: 'Slot not found' });

        // Cancel the slot (set it as not booked)
        slot.booked = false;
        slot.userId = null;
        await slot.save();

        res.json({ message: 'Slot cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error cancelling slot' });
    }
});

module.exports = router;
