const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');


router.get('/', async (req, res) => res.json(await Patient.find().populate('bills')));
router.post('/', async (req, res) => { const p = new Patient(req.body); await p.save(); res.json(p); });
module.exports = router;