const express = require('express');
const router = express.Router();
const User = require('../models/User');

// init - create a default manager if not exists (seed handles too)

// login (simple)
router.post('/login', async (req, res) => {
const { username, password } = req.body;
const u = await User.findOne({ username });
if (!u || u.password !== password) return res.status(401).json({ ok: false });
res.json({ ok: true, user: { username: u.username, role: u.role } });
});


// change password (admin only) - for simplicity require current password
router.post('/change-password', async (req, res) => {
const { username, currentPassword, newPassword } = req.body;
const u = await User.findOne({ username });
if (!u || u.password !== currentPassword) return res.status(400).json({ ok: false, msg: 'wrong current' });
u.password = newPassword; await u.save();
res.json({ ok: true });
});

module.exports = router;