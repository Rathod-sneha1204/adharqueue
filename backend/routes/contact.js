// backend/routes/contact.js
const express = require('express');
const router = express.Router();

router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    res.status(200).json({ success: true, msg: 'Message received' });
  });
module.exports = router;