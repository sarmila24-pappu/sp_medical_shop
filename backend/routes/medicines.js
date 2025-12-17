const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');


// list
router.get('/', async (req, res) => {
const meds = await Medicine.find();
res.json(meds);
});


// get single
router.get('/:id', async (req, res) => {
const m = await Medicine.findById(req.params.id);
res.json(m);
});


// add (admin)
router.post('/', async (req, res) => {
const doc = new Medicine(req.body);
await doc.save();
res.json(doc);
});


module.exports = router;