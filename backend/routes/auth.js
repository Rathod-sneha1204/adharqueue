const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');


const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // You can add filters/fields
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Signup
router.post('/signup', async (req, res) => {
    const { contactNumber, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ contactNumber, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Signin (✅ Fixed Route & Contact Number)
router.post('/signin', async (req, res) => {
    try {
        const { contactNumber, password } = req.body;
        const user = await User.findOne({ contactNumber }).lean();
        if (!user) return res.status(400).json({ error: 'User not found' });

        if (password !== user.password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Profile Routes
router.get('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

router.put('/profile', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { contactNumber } = req.body;
        await User.findByIdAndUpdate(decoded.id, { contactNumber });
        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

// backend/routes/slots.js
router.delete('/:id', async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);
        if (!slot) return res.status(404).json({ message: 'Slot not found' });

        await slot.remove();
        res.json({ message: 'Slot cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error cancelling slot' });
    }
});

router.post('/update', async (req, res) => {
    const { userId, kycDetails } = req.body;

    try {
        // Assume KYC model stores the KYC details for the user
        const kyc = new KYC({ userId, kycDetails });
        await kyc.save();
        res.json({ message: 'KYC details updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update KYC' });
    }
});

module.exports = router;
