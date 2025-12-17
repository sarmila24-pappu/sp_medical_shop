const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');


router.get('/', async (req, res) => res.json(await Doctor.find()));
router.post('/', async (req, res) => {
const d = new Doctor(req.body); await d.save(); res.json(d);
});
module.exports = router;